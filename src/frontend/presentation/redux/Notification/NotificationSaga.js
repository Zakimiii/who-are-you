import { fromJS, Set, List } from 'immutable';
import {
    call,
    put,
    select,
    fork,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { translate } from '@infrastructure/Translator';
import { NotificationUseCase } from '@usecase';
import * as notificationActions from './NotificationReducer';

const notificationUseCase = new NotificationUseCase();

export const notificationWatches = [
    takeEvery(
        notificationActions.CHECK_NOTIFICATION,
        notificationUseCase.checkNotification
    ),
];
