import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class CommunityRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getCommunity({ id }) {
        const data = await super.apiCall('/api/v1/community', {
            id,
        });
        return data && data.community;
    }

    async getHeadings({ id, offset, limit }) {
        const data = await super.apiCall('/api/v1/community/headings', {
            community_id: id,
            username,
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('S'),
        });

        return data && data.headings;
    }
}
