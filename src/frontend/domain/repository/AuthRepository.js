import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class AuthRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async syncUser(user) {
        const data = await super.apiCall('/api/v1/user/sync', {
            user: safe2json(user),
        });

        return data;
    }

    async twitter_authenticate(accessToken, client_id) {
        const data = await super.apiCall('/api/v1/identity', {
            accessToken,
            client_id,
        });
        return data && data.user;
    }
}
