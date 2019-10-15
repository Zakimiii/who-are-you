import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class NotificationRepository extends RepositoryImpl {
    constructor() {
        super();
    }

    async check(notification) {
        const data = await super.apiCall('/api/v1/notification/check', {
            notification,
        });
        return data && data.notification;
    }
}
