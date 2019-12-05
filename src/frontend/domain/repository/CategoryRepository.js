import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';

export default class CategoryRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getCategories({ offset, limit }) {
        const data = await super.apiCall('/api/v1/categories', {
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('L'),
        });

        return data && data.categories;
    }

    async getCategory({ id }) {
        const data = await super.apiCall('/api/v1/category', {
            id,
        });
        return data && data.category;
    }

    async getCommunities({ id, offset, limit }) {
        const data = await super.apiCall('/api/v1/category/communities', {
            category_id: id,
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('S'),
        });

        return data && data.communities;
    }
}
