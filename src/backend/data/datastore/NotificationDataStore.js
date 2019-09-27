import DataStoreImpl from '@datastore/DataStoreImpl';
import UserDataStore from '@datastore/UserDataStore';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import Promise from 'bluebird';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';
import mail from '@network/mail';
import validator from 'validator';
import config from '@constants/config';
import notification_config from '@constants/notification_config';
import Notification from '@network/notification';
import querystring from 'querystring';

const notification = new Notification();

export default class NotificationDataStore extends DataStoreImpl {
    constructor() {
        super();
    }
}
