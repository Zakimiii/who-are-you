import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class CategoryRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getHeadings({ offset, limit }) {
        const data = await super.apiCall('/api/v1/categories', {
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('S'),
        });

        return data && data.categories;
    }
}
