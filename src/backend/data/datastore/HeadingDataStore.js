import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import Promise from 'bluebird';
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

export default class HeadingDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            user: true,
            answers: false,
            voter: false,
            answer_limit: data_config.answer_index_limit,
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
                    params.user &&
                        models.User.findOne({
                            where: {
                                id: val.UserId,
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
                        models.Answer.findAll({
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
                if (params.user) val.User = includes[index][0];
                if (params.voter) val.Voter = includes[index][1];
                if (params.answers) val.Answers = includes[index][2];
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            user: true,
            voter: true,
            answers: true,
            answer_limit: data_config.answer_index_limit,
        });
    }

    async getShowIncludes(datum) {
        return await this.getIncludes(datum, {
            user: true,
            voter: true,
            answers: false,
            answer_limit: data_config.answer_index_limit,
        });
    }

    async updateCount(value) {
        if (!value) return;
        const heading = await models.Heading.findOne({
            where: {
                id: Number(value.id),
            },
        });
        if (!heading) return;

        const answers = await models.Answer.findAll({
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
        const result = await models.Heading.create(heading);
        return result;
    }

    async update(heading) {
        if (!heading) return;

        const data = await models.Heading.findOne({
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

        const result = await models.Heading.destroy({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        return result;
    }

    async trash(heading) {
        if (!heading) return;

        const data = await models.Heading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const answers = await models.Answer.findAll({
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

        const data = await models.Heading.findOne({
            where: {
                id: Number(heading.id),
            },
            raw: false,
        });

        const answers = await models.Answer.findAll({
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
                return models.Heading.findAll({
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

    async getUserHeadings({ user_id, username, offset, limit, isMyAccount }) {
        const where = isMyAccount
            ? {
                  isHide: false,
              }
            : {
                  isHide: false,
                  isPrivate: false,
              };

        const results = await models.Heading.findAll({
            where,
            include: [
                {
                    model: models.User,
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
                    attributes: ['id'],
                },
            ],
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

    async getUserPostHeadings({
        user_id,
        username,
        offset,
        limit,
        isMyAccount,
    }) {
        const results = await models.Heading.findAll({
            where: {
                isHide: false,
            },
            include: [
                {
                    as: 'Voters',
                    model: models.User,
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
                    attributes: ['id'],
                },
            ],
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

    async getUserPostHeadingAnswers({
        user_id,
        username,
        offset,
        limit,
        isMyAccount,
    }) {
        const answers = await models.Answer.findAll({
            where: {
                isHide: false,
            },
            include: [
                {
                    model: models.User,
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
                    attributes: ['id'],
                },
            ],
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
            answers.map(async val => {
                let heading = await models.Heading.findOne({
                    where: {
                        id: val.HeadingId,
                    },
                    raw: true,
                });

                let user = await models.User.findOne({
                    where: {
                        id: val.UserId,
                    },
                    raw: true,
                });

                // MEMO: TypeError: Converting circular structure to JSON
                // val.Heading = heading;
                val.User = user;

                heading.Answers = [val];
                return heading;
            })
        );

        return await this.getIncludes(results, {
            user: true,
            voter: true,
            answers: false,
        });
    }

    async createBot(user) {
        if (!user) return;
        if (!user.id) return;

        const count = Object.keys(prototype_data.headings).length;
        const finish = await models.Heading.findAll({
            where: {
                user_id: Number(user.id),
                isBot: true,
            },
        });

        if (count == finish.length) return;

        let next = true;
        let n = casual.integer(0, count - 1);

        while (next) {
            n = casual.integer(0, count - 1);

            const exist = await models.Heading.findOne({
                where: {
                    user_id: Number(user.id),
                    isBot: true,
                    body: `${n}`,
                },
            });

            next = !!exist;
        }

        const result = await models.Heading.create({
            UserId: Number(user.id),
            isBot: true,
            body: `${n}`,
        });

        return result;
    }
}
