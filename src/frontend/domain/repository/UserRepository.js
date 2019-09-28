import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';

export default class UserRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async getUser({ id, username, isMyAccount = false }) {
        const data = await super.apiCall('/api/v1/user', {
            id,
            username,
            isMyAccount,
        });
        return data && data.user;
    }

    async updateUser(user) {
        // const data = await super.apiCall('/api/v1/user/update', {
        //     user,
        // });
        // return data;
    }

    async deleteUser(user) {
        // const data = await super.apiCall('/api/v1/user/delete', {
        //     user,
        // });
        // return data;
    }

    async getHeadings({ id, username, offset, limit, isMyAccount = false }) {
        const data = await super.apiCall('/api/v1/user/headings', {
            user_id: id,
            username,
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('L'),
            isMyAccount,
        });

        return data && data.headings;
    }

    async getAnswers({ id, username, offset, limit, isMyAccount = false }) {
        const data = await super.apiCall('/api/v1/user/answers', {
            user_id: id,
            username,
            offset: Number(offset || 0),
            limit: limit || data_config.fetch_data_limit('L'),
            isMyAccount,
        });

        return data && data.answers;
    }

    async syncNotificationId({ notification_id, current_user }) {
        const data = await super.apiCall('/api/v1/user/notification_id/sync', {
            notification_id,
            user: safe2json(current_user),
        });
        return data && data.user;
    }
}
