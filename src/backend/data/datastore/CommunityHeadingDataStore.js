import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';
import {
    generateLikeQuery,
    generateOrQuery,
    generateOrQueries,
} from '@extension/query';
import tt from 'counterpart';
import prototype_data from '@locales/prototype/ja.json';
import casual from 'casual';
import Promise from 'bluebird';

export default class CommunityHeadingDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            community: true,
            answers: false,
            voter: false,
            answer_limit: data_config.answer_index_limit,
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
                    params.community &&
                        models.Community.findOne({
                            where: {
                                id: val.CommunityId,
                            },
                            raw: true,
                        }),
                    params.voter &&
                        models.User.findOne({
                            where: {
                                id: val.VoterId,
                            },
                            raw: true,
                        }),
                    params.answers &&
                        models.CommunityAnswer.findAll({
                            where: {
                                isHide: false,
                                heading_id: val.id,
                            },
                            limit:
                                data_config.answer_index_limit ||
                                data_config.fetch_data_limit('M'),
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
                if (params.community) {
                    val.Community = includes[index][0];
                    val.Community.picture = `/pictures/community/${
                        val.Community.id
                    }`;
                }
                if (params.voter) val.Voter = includes[index][1];
                if (params.answers) {
                    val.Answers = includes[index][2];
                    if (!params.picture) {
                        val.Answers = val.Answers.map(answer => {
                            answer.picture = '';
                            return answer;
                        });
                    }
                }
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            community: true,
            voter: true,
            answers: true,
            picture: false,
            answer_limit: data_config.answer_index_limit,
        });
    }

    async getShowIncludes(datum) {
        return await this.getIncludes(datum, {
            community: true,
            voter: true,
            answers: false,
            picture: false,
            answer_limit: data_config.answer_index_limit,
        });
    }

    async updateCount(value) {
        if (!value) return;
        const heading = await models.CommunityHeading.findOne({
            where: {
                id: Number(value.id),
            },
        });
        if (!heading) return;

        const answers = await models.CommunityAnswer.findAll({
            where: {
                heading_id: Number(heading.id),
            },
            attributes: ['id'],
        });

        const result = await heading.update({
            answer_count: answers.length,
        });

        return result;
    }

    async create(heading) {
        if (!heading) return;
        if (heading.picture) {
            heading.picture = await this.bcomposite_from_base64({
                base64: heading.picture,
                bsrc: this.resolveAssetsPath('images/brands/ogp-back.png'),
                params: {
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                },
            });
        }
        heading.community_id = heading.CommunityId;
        const result = await models.CommunityHeading.create(heading);
        return result;
    }

    async update(heading) {
        if (!heading) return;

        if (heading.picture) {
            heading.picture = await this.bcomposite_from_base64({
                base64: heading.picture,
                bsrc: this.resolveAssetsPath('images/brands/ogp-back.png'),
                params: {
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                },
            });
        }

        const data = await models.CommunityHeading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const result = await data.update({
            body: heading.body,
        });
        return result;
    }

    async delete(heading) {
        if (!heading) return;

        const result = await models.CommunityHeading.destroy({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        return result;
    }

    async trash(heading) {
        if (!heading) return;

        const data = await models.CommunityHeading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const answers = await models.CommunityAnswer.findAll({
            where: {
                heading_id: Number(heading.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: true,
        });

        const results = await Promise.all(
            answers.map(answer =>
                answer.update({
                    isHide: true,
                })
            )
        );

        return result;
    }

    async untrash(heading) {
        if (!heading) return;

        const data = await models.CommunityHeading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const answers = await models.CommunityAnswer.findAll({
            where: {
                heading_id: Number(heading.id),
            },
            raw: false,
        });

        const result = await data.update({
            isHide: false,
        });

        const results = await Promise.all(
            answers.map(answer =>
                answer.update({
                    isHide: false,
                })
            )
        );

        return result;
    }

    async search({ keyword, limit, offset }) {
        let like_results = await Promise.all(
            generateLikeQuery(keyword).map(val => {
                return models.CommunityHeading.findAll({
                    where: {
                        isHide: false,
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

    async getCommunityHeadings({ community_id, offset, limit }) {
        const results = await models.CommunityHeading.findAll({
            where: {
                community_id: Number(community_id),
                isHide: false,
            },
            order: [['created_at', 'DESC']],
            raw: true,
            offset: Number(offset || 0),
            limit: Number(limit || data_config.fetch_data_limit('S')),
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await this.getIndexIncludes(results);
    }

    async getStaticRecommendHeadings({ offset, limit }) {
        const results = await models.CommunityHeading.findAll({
            where: {
                isHide: false,
            },
            order: [['created_at', 'DESC']],
            raw: true,
            offset: Number(offset || 0),
            limit: Number(limit || data_config.fetch_data_limit('S')),
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await this.getIndexIncludes(results);
    }

    async getLatestHeadings({ offset, limit }) {
        const results = await models.CommunityHeading.findAll({
            where: {
                isHide: false,
            },
            order: [['created_at', 'DESC']],
            raw: true,
            offset: Number(offset || 0),
            limit: Number(limit || data_config.fetch_data_limit('S')),
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await this.getIndexIncludes(results);
    }

    async createBot(community) {
        if (!community || !community.id || !community.CategoryId) return;

        const templates = await models.CommunityTemplate.findAll({
            where: {
                category_id: Number(community.CategoryId),
            },
        });

        const headings = await models.CommunityHeading.findAll({
            where: {
                community_id: Number(community.id),
            },
        });

        if (templates.length == 0) return;

        const result = templates.filter(
            template =>
                headings.filter(heading => template.body == heading.body)
                    .length == 0
        )[0];

        if (!result) return;

        const created = await models.CommunityHeading.create({
            community_id: Number(community.id),
            body: `${result.body}`,
        });

        return created;
    }
}
