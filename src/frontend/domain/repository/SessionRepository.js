import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';

export default class SessionRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async findOneIdentityRequest(accessToken, client_id) {
        const data = await super.apiCall('/api/v1/identity', {
            accessToken,
            client_id,
        });
        return data && data.identity;
    }

    async generateAccessToken(accessToken, client_id, isOneTime) {
        const data = await super.apiCall('/api/v1/access_token/create', {
            accessToken,
            client_id,
            isOneTime,
        });

        return data && data.accessToken;
    }
}
