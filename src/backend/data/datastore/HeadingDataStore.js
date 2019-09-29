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

export default class HeadingDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            user: true,
            answers: false,
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
                    params.answers &&
                        models.Answer.findAll({
                            where: {
                                heading_id: val.id,
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
                if (params.user) val.User = includes[index][0];
                if (params.answers) val.Answers = includes[index][1];
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            user: true,
            answers: true,
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

        const result = await data.update({
            isHide: false,
        });
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

        const result = await data.update({
            isHide: true,
        });
        return result;
    }

    async search({ keyword, limit, offset }) {
        let like_results = await Promise.all(
            generateLikeQuery(keyword).map(val => {
                return models.Heading.findAll({
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

        return await this.getIndexIncludes(results);
    }

    async getUserHeadings({ user_id, username, offset, limit, isMyAccount }) {
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

        const results = await models.Heading.findAll({
            where,
            order: [['created_at', 'DESC']],
            raw: true,
            offset: Number(offset || 0),
            limit: Number(limit || data_config.fetch_data_limit('L')),
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
