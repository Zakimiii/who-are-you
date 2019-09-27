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
            answers: true,
            search_histories: true,
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
                if (params.headings) val.Headings = includes[index][0];
                if (params.answers) val.Answers = includes[index][1];
                return val;
            })
        );
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
}
