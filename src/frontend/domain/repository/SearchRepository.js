import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class SearchRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async searchHeading({ keyword, limit, offset, user, client_id }) {
        const data = await super.apiCall('/api/v1/heading/search', {
            keyword,
            limit,
            offset,
            user,
            client_id,
        });
        return data && data.contents;
    }

    async searchUser({ keyword, limit, offset, user, client_id }) {
        const data = await super.apiCall('/api/v1/user/search', {
            keyword,
            limit,
            offset,
            user,
            client_id,
        });
        return data && data.users;
    }

    async searchAnswer({ keyword, limit, offset, user, client_id }) {
        const data = await super.apiCall('/api/v1/answer/search', {
            keyword,
            limit,
            offset,
            user,
            client_id,
        });
        return data && data.answers;
    }
}
