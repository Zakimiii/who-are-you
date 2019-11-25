import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import { ApiError } from '@extension/Error';
import data_config from '@constants/data_config';
import {
    generateLikeQuery,
    generateOrQuery,
    generateOrQueries,
} from '@extension/query';
import expo from '@extension/object2json';
import * as detection from '@network/detection';
import Promise from 'bluebird';
import Cookies from 'js-cookie';

export default class UserDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            headings: true,
            voter_headings: false,
            answers: true,
            search_histories: true,
            picture: false,
        }
    ) {
        if (!datum) return;
        if (!(datum instanceof Array)) {
            datum = [datum];
        }
        let users = datum.filter(data => !!data);
        const includes = await Promise.map(
            users,
            val => {
                return Promise.all([
                    params.headings &&
                        models.Heading.findAll({
                            where: {
                                user_id: val.id,
                            },
                            raw: true,
                        }),
                    params.answers &&
                        models.Answer.findAll({
                            where: {
                                user_id: val.id,
                            },
                            raw: true,
                        }),
                    params.voter_headings &&
                        models.Heading.findAll({
                            where: {
                                voter_id: val.id,
                            },
                            raw: true,
                        }),
                    // params.search_histories && models.SearchHistory.findAll({
                    //     where: {
                    //         user_id: val.id,
                    //     },
                    //     raw: true,
                    // }),
                ]);
            },
            { concurrency: 10 }
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return await Promise.all(
            users.map(async (val, index) => {
                if (params.headings) {
                    val.Headings = includes[index][0];
                    if (!params.picture) {
                        val.Headings = val.Headings.map(heading => {
                            heading.picture = '';
                            return heading;
                        });
                    }
                }
                if (params.answers) {
                    val.Answers = includes[index][1];
                    if (!params.picture) {
                        val.Answers = val.Answers.map(answer => {
                            answer.picture = '';
                            return answer;
                        });
                    }
                }
                if (params.voter_headings) {
                    val.VoterHeadings = includes[index][2];
                    if (!params.picture) {
                        val.VoterHeadings = val.VoterHeadings.map(
                            voterHeading => {
                                voterHeading.picture = '';
                                return voterHeading;
                            }
                        );
                    }
                }
                return val;
            })
        );
    }

    async updateCount(value) {
        if (!value) return;
        const user = await models.User.findOne({
            where: {
                id: Number(value.id),
            },
        });
        if (!user) return;

        const headings = await models.Heading.findAll({
            where: {
                user_id: Number(user.id),
            },
            attributes: ['id', 'answer_count'],
        });

        const result = await user.update({
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
        const heading = await models.Heading.findOne({
            where: {
                id: Number(answer.HeadingId),
            },
            attributes: ['id', 'UserId'],
        });
        const result = await this.updateCount({
            id: heading.UserId,
        });
        return result;
    }

    async search({ keyword, limit, offset }) {
        let like_results = await Promise.all(
            generateLikeQuery(keyword).map(val => {
                return models.User.findAll({
                    where: {
                        $or: [
                            {
                                username: {
                                    $like: val,
                                },
                            },
                            {
                                nickname: {
                                    $like: val,
                                },
                            },
                            {
                                twitter_username: {
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

    async getStaticRecommendUsers({ limit, offset }) {
        const users = await models.User.findAll({
            order: [['answer_count', 'DESC']],
            limit: Number(limit) || data_config.fetch_data_limit('M'),
            offset: Number(offset || 0),
            raw: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return users;
    }

    async deleteUser({ user }) {
        if (!user) return;

        const withdrawal = await models.Withdrawal.create({
            twitter_username: user.twitter_username,
            twitter_id: user.twitter_id,
            valid: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        const result = await models.User.destroy({
            where: {
                username: user.username,
                id: Number(user.id),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
    }

    async getHeadingsFromCommunityFollow(community_follow) {
        const community = await models.Community.findOne({
            where: {
                id: Number(community_follow.VotedId),
            },
            raw: true,
            attributes: ['id'],
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'invalid_response_from_server',
            });
        });

        if (!community) return [];

        return await models.CommunityHeading.findAll({
            where: {
                community_id: Number(community.id),
                isHide: false,
            },
            order: [['created_at', 'DESC']],
            raw: true,
        });
    }

    async getHeadingsFromFollow(follow) {
        const user = await models.User.findOne({
            where: {
                id: Number(follow.VoteredId),
                verified: true,
            },
            raw: true,
            attributes: ['id'],
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'invalid_response_from_server',
            });
        });

        if (!user) return [];

        return await models.Heading.findAll({
            where: {
                user_id: Number(user.id),
                isHide: false,
            },
            order: [['created_at', 'DESC']],
            raw: true,
        });
    }

    async getHeadingsFromFollower(follow) {
        const user = await models.User.findOne({
            where: {
                id: Number(follow.VoterId),
                verified: true,
            },
            raw: true,
            attributes: ['id'],
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'invalid_response_from_server',
            });
        });

        if (!user) return [];

        return await models.Heading.findAll({
            where: {
                user_id: Number(user.id),
                isHide: false,
            },
            order: [['created_at', 'DESC']],
            raw: true,
        });
    }

    async getUserFeeds({ user, offset, limit }) {

        user.CommunityFollows = await models.CommunityFollow.findAll({
            where: {
                voter_id: user.id
            },
            raw: true,
        });

        //MEMO: this api only follower.
        // user.Follows = await models.Follow.findAll({
        //     where: {
        //         voter_id: user.id
        //     },
        //     raw: true,
        // });

        user.Followers = await models.Follow.findAll({
            where: {
                votered_id: user.id
            },
            raw: true,
        });

        if (
            user.CommunityFollows.length == 0 &&
            user.Followers.length == 0
        ) return [];

        const communityHeadingsPromise = Promise.all(
            user.CommunityFollows.map(follow =>
                this.getHeadingsFromCommunityFollow(follow)
            )
        );

        //MEMO: this api only follower.
        // const headingsPromise = Promise.all(
        //     user.Follows.map(follow =>
        //         this.getHeadingsFromFollow(follow)
        //     )
        // );

        const headingsPromise = Promise.all(
            user.Followers.map(follow =>
                this.getHeadingsFromFollower(follow)
            )
        );

        let datum = await Promise.all([
            communityHeadingsPromise,
            headingsPromise,
        ]);

        datum[0] = Array.prototype.concat.apply([], datum[0]);
        datum[1] = Array.prototype.concat.apply([], datum[1]);

        const befores = datum[0].concat(datum[1])
            .filter(val => !!val)
            .sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1))
            .slice(Number(offset || 0), Number(limit || data_config.fetch_data_limit('M')));

        //TODO: Get associates value!
        return befores;
    }

    async followCommunity(user, target) {
        const results = await Promise.all([
            models.CommunityFollow.findOrCreate({
                where: {
                    voter_id: Number(user.id),
                    voted_id: Number(target.id),
                },
            }),
            models.User.findOne({
                where: {
                    id: Number(user.id),
                },
                raw: false,
            }),
            models.Community.findOne({
                where: {
                    id: Number(target.id),
                },
                raw: false,
            }),
        ]).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return results[0];
    }

    async unfollowCommunity(user, target) {
        const results = await Promise.all([
            models.CommunityFollow.destroy({
                where: {
                    VoterId: Number(user.id),
                    VotedId: Number(target.id),
                },
            }),
            models.User.findOne({
                where: {
                    id: Number(user.id),
                },
                raw: false,
            }),
            models.Community.findOne({
                where: {
                    id: Number(target.id),
                },
                raw: false,
            }),
        ]).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        return results[0];
    }
}
