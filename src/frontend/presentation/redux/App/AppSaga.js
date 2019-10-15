import { fromJS, Set, List } from 'immutable';
import {
    call,
    put,
    select,
    fork,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import { translate } from '@infrastructure/Translator';
import DMCAUserList from '@constants/DMCAUserList';
import { AppUseCase } from '@usecase';
import * as appActions from './AppReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const appUseCase = new AppUseCase();

export const appWatches = [
    takeLatest(appActions.HIDE_ALL_MODAL, appUseCase.hideAllModal),
    takeEvery(LOCATION_CHANGE, appUseCase.detectNotificationId),
];
