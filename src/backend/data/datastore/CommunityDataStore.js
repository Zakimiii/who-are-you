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

export default class CommunityDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            headings: true,
            category: true,
            picture: false,
            followers: true,
        }
    ) {
        if (!datum) return;
        if (!(datum instanceof Array)) {
            datum = [datum];
        }
        let contents = datum.filter(data => !!data);
        const includes = await Promise.map(
            contents,
            val => {
                return Promise.all([
                    params.headings &&
                        models.CommunityHeading.findAll({
                            where: {
                                isHide: false,
                                community_id: val.id,
                            },
                            raw: true,
                        }),
                    params.category &&
                        models.Category.findOne({
                            where: {
                                id: val.CategoryId,
                            },
                            raw: true,
                        }),
                    params.followers &&
                        models.CommunityFollow.findAll({
                            where: {
                                voted_id: val.id,
                            },
                            raw: true,
                        }),
                ]);
            },
            { concurrency: 10 }
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        const follower_users = params.followers
            ? await Promise.all(
                  includes.map(async data => {
                      let followers = data[2];
                      return await Promise.all(
                          followers.map(follower => {
                              return models.User.findOne({
                                  where: {
                                      id: follower.VoterId,
                                  },
                                  raw: true,
                              });
                          })
                      );
                  })
              ).catch(e => {
                  throw new ApiError({
                      error: e,
                      tt_key: 'errors.invalid_response_from_server',
                  });
              })
            : [];

        return await Promise.all(
            contents.map(async (val, index) => {
                if (!params.picture) {
                    val.picture = `/pictures/community/${val.id}`;
                }
                if (params.headings) {
                    val.Headings = includes[index][0];
                    if (!params.picture) {
                        val.Headings = val.Headings.map(heading => {
                            heading.picture = '';
                            return heading;
                        });
                    }
                }
                if (params.category) {
                    val.Category = includes[index][1];
                    if (!params.picture && val.Category) {
                        val.Category.picture = '';
                    }
                }
                if (params.followers) val.Followers = follower_users[index]; //includes[index][4];
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            headings: false,
            category: true,
            picture: false,
            followers: false,
        });
    }

    async getShowIncludes(datum) {
        return await this.getIncludes(datum, {
            headings: false,
            category: true,
            picture: false,
            followers: true,
        });
    }

    async updateCount(value) {
        if (!value) return;
        const community = await models.Community.findOne({
            where: {
                id: Number(value.id),
            },
        });
        if (!community) return;

        const headings = await models.CommunityHeading.findAll({
            where: {
                community_id: Number(community.id),
            },
            attributes: ['id', 'answer_count'],
        });

        const result = await community.update({
            heading_count: headings.length,
            answer_count:
                headings.length > 0
                    ? headings
                          .map(val => val.answer_count)
                          .reduce((p, c) => p + c)
                    : 0,
        });

        return result;
    }

    async updateCountFromAnswer(answer) {
        if (!answer || !answer.HeadingId) return;
        const heading = await models.CommunityHeading.findOne({
            where: {
                id: Number(answer.HeadingId),
            },
            attributes: ['id', 'CommunityId'],
        });
        const result = await this.updateCount({
            id: heading.CommunityId,
        });
        return result;
    }

    async search({ keyword, limit, offset }) {
        let like_results = await Promise.all(
            generateLikeQuery(keyword).map(val => {
                return models.Community.findAll({
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
                    limit: Number(limit || data_config.fetch_data_limit('M')),
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

        // like_results = await this.getIndexIncludes(like_results);

        return results;
    }

    async getStaticRecommendCommunities({ offset, limit }) {
        const results = await models.Community.findAll({
            order: [['answer_count', 'DESC']],
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

    async getCategoryCommunities({ category_id, offset, limit }) {
        const results = await models.Community.findAll({
            where: {
                category_id,
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

    async getUserFollowCommunities({ user_id, username, offset, limit }) {
        const user = await models.User.findOne({
            where: {
                $or: [
                    {
                        id: Number(user_id) || 0,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        const follows = await models.CommunityFollow.findAll({
            where: {
                voter_id: user.id,
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

        const results = await Promise.all(
            follows.map(follow =>
                models.Community.findOne({
                    where: {
                        id: follow.VotedId,
                    },
                    raw: true,
                })
            )
        );

        return await this.getIndexIncludes(results);
    }

    async review(community) {
        community = await models.Community.create({
            isHide: true,
            valid: false,
            permission: false,
            body: community.body,
            picture: community.picture,
            category_id: community.CategoryId,
        });

        return community;
    }
}
