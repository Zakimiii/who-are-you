import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import Promise from 'bluebird';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';
import {
    generateLikeQuery,
    generateOrQuery,
    generateOrQueries,
} from '@extension/query';

export default class CommunityAnswerDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            user: true,
            heading: true,
            siblings: false,
            picture: false,
        }
    ) {
        if (!datum) return;
        if (!(datum instanceof Array)) {
            datum = [datum];
        }
        let contents = datum.filter(
            data => !!data && !Number.prototype.castBool(data.isHide)
        );

        const includes = await Promise.map(
            contents,
            val => {
                return Promise.all([
                    params.user &&
                        models.User.findOne({
                            where: {
                                id: val.UserId,
                            },
                            raw: true,
                        }),
                    params.heading &&
                        models.CommunityHeading.findOne({
                            where: {
                                isHide: false,
                                id: val.HeadingId,
                            },
                            raw: true,
                        }),
                    params.siblings &&
                        models.CommunityAnswer.findAll({
                            where: {
                                isHide: false,
                                heading_id: val.HeadingId,
                            },
                            raw: true,
                        }),
                ]);
            },
            { concurrency: data_config.concurrency_size('M') }
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await Promise.all(
            contents.map(async (val, index) => {
                if (!params.picture) val.picture = '';
                if (params.user) val.User = includes[index][0];
                if (params.heading) {
                    val.Heading = includes[index][1];
                    val.Heading.Community = await models.Community.findOne({
                        where: {
                            id: val.Heading.CommunityId,
                            isHide: false,
                            permission: true,
                            valid: true,
                        },
                        raw: true,
                    });
                    val.Heading.Community.picture =
                        val.Heading.Community.picture &&
                        val.Heading.Community.picture.toString('base64');
                    val.Heading.Voter = await models.User.findOne({
                        where: {
                            id: val.Heading.VoterId,
                        },
                        raw: true,
                    });
                    if (!params.picture) val.Heading.picture = '';
                }
                if (params.siblings) {
                    val.Sibilings = includes[index][2];
                    if (!params.picture) {
                        val.Sibilings = val.Sibilings.map(sibiling => {
                            sibiling.picture = '';
                            return sibiling;
                        });
                    }
                }
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            user: true,
            heading: true,
            siblings: false,
            picture: false,
        });
    }

    async getShowIncludes(datum) {
        return await this.getIncludes(datum, {
            user: true,
            heading: true,
            siblings: false,
            picture: false,
        });
    }

    async create(answer) {
        if (!answer) return;

        if (answer.picture) {
            answer.picture = await this.bcomposite_from_base64({
                base64: answer.picture,
                bsrc: this.resolveAssetsPath('images/brands/ogp-back_low.png'),
                params: {
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                },
            });
        }

        answer.heading_id = answer.HeadingId;

        const result = await models.CommunityAnswer.create(answer);
        return result;
    }

    async update(answer) {
        if (!answer) return;

        if (answer.picture) {
            answer.picture = await this.bcomposite_from_base64({
                base64: answer.picture,
                bsrc: this.resolveAssetsPath('images/brands/ogp-back_low.png'),
                params: {
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                },
            });
        }

        answer.heading_id = answer.HeadingId;

        const data = await models.CommunityAnswer.findOne({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        const result = await data.update({
            body: answer.body,
        });
        return result;
    }

    async delete(answer) {
        if (!answer) return;

        const result = await models.CommunityAnswer.destroy({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        return result;
    }

    async trash(answer) {
        if (!answer) return;

        const data = await models.CommunityAnswer.findOne({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: true,
        });

        return result;
    }

    async untrash(answer) {
        if (!answer) return;

        const data = await models.CommunityAnswer.findOne({
            where: {
                id: Number(answer.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: false,
        });
        return result;
    }

    async search({ keyword, limit, offset }) {
        let like_results = await Promise.all(
            generateLikeQuery(keyword).map(val => {
                return models.CommunityAnswer.findAll({
                    where: {
                        $or: [
                            {
                                body: {
                                    $like: val,
                                },
                            },
                        ],
                    },
                    offset: Number(offset || 0),
                    limit: Number(limit || data_config.fetch_data_limit('S')),
                    raw: true,
                    // order: [['score', 'DESC']],
                });
            })
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        like_results = Array.prototype.concat.apply([], like_results);

        const results = [];
        const map = new Map();
        for (const item of like_results) {
            if (!map.has(item.id)) {
                map.set(item.id, true);
                results.push(item);
            }
        }

        return await this.getIndexIncludes(results);
    }

    async getUserAnswers({ user_id, username, offset, limit, isMyAccount }) {
        const where = isMyAccount
            ? {
                  $or: [
                      {
                          user_id: Number(user_id) || 0,
                      },
                      {
                          username,
                      },
                  ],
                  isHide: false,
              }
            : {
                  $or: [
                      {
                          user_id: Number(user_id) || 0,
                      },
                      {
                          username,
                      },
                  ],
                  isHide: false,
                  isPrivate: false,
              };

        const results = await models.CommunityAnswer.findAll({
            where,
            order: [['created_at', 'DESC']],
            raw: true,
            offset: Number(offset || 0),
            limit: Number(limit || data_config.fetch_data_limit('S')),
            subQuery: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await this.getIndexIncludes(results);
    }

    async getHeadingAnswers({ heading_id, offset, limit }) {
        const results = await models.CommunityAnswer.findAll({
            where: {
                heading_id,
                isHide: false,
            },
            order: [['created_at', 'DESC']],
            raw: true,
            offset: Number(offset || 0),
            limit: Number(limit || data_config.fetch_data_limit('S')),
            subQuery: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await this.getIndexIncludes(results);
    }
}
