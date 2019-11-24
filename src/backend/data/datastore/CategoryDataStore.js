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
                            order: [['heading_count', 'DESC']],
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
                if (!params.picture) {
                    val.picture = `/pictures/category/${val.id}`
                };
                if (params.communities) {
                    val.Communities = includes[index][0];
                    if (!params.picture) {
                        val.Communities = val.Communities.map(community => {
                            community.picture = `/pictures/community/${community.id}`;
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
            limit: Number(limit || data_config.fetch_data_limit('L')),
            subQuery: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
        const categories = await this.getIndexIncludes(results);
        return categories
            .filter(
                category => !!category.Communities && category.Communities.length != 0
            )
            .map(category => {
                category.Communities = category.Communities.slice(0, data_config.community_index_limit)
                return category;
            })
    }

    async updateCount(value) {
        if (!value) return;
        const category = await models.Category.findOne({
            where: {
                id: Number(value.id),
            },
        });
        if (!category) return;

        const communities = await models.Community.findAll({
            where: {
                category_id: Number(category.id),
            },
            attributes: ['id', 'answer_count', 'heading_count'],
        });

        const result = await category.update({
            count: communities.length,
            heading_count:
                communities.length > 0
                    ? communities
                          .map(val => val.heading_count)
                          .reduce((p, c) => p + c)
                    : 0,
            answer_count:
                communities.length > 0
                    ? communities
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
        const community = await models.Community.findOne({
            where: {
                id: heading.CommunityId
            },
        });
        const result = await this.updateCount({
            id: community.CategoryId,
        })
        return result;
    }

    async updateCountFromHeading(heading) {
        if (!heading || !heading.CommunityId) return;
        const community = await models.Community.findOne({
            where: {
                id: heading.CommunityId
            },
        });
        const result = await this.updateCount({
            id: community.CategoryId,
        })
        return result;
    }
}
