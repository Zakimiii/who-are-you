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

export default class CategoryDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async getIncludes(
        datum,
        params = {
            communities: true,
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
                    params.communities &&
                        models.Community.findAll({
                            where: {
                                isHide: false,
                                category_id: val.id,
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
                if (params.communities) {
                    val.Communities = includes[index][2];
                    if (!params.picture) {
                        val.Communities = val.Communities.map(community => {
                            community.picture = '';
                            return community;
                        });
                    }
                }
                return val;
            })
        );
    }

    async getIndexIncludes(datum) {
        return await this.getIncludes(datum, {
            communities: true,
            picture: false,
        });
    }

    async getCategories({ limit, offset }) {
        const results = await models.Category.findAll({
            order: [['heading_count', 'DESC']],
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
