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
import { loginRoute } from '@infrastructure/RouteInitialize';
import { translate } from '@infrastructure/Translator';
import DMCAUserList from '@constants/DMCAUserList';
import * as authActions from './AuthReducer';
import AuthUseCase from '@usecase/AuthUseCase';
import { LOCATION_CHANGE } from 'react-router-redux';

const authUseCase = new AuthUseCase();

export const authWatches = [
    takeEvery(LOCATION_CHANGE, authUseCase.checkClientId),
    takeEvery(LOCATION_CHANGE, authUseCase.twitterLogin),
    takeEvery(LOCATION_CHANGE, authUseCase.twitterConfirmLoginForDelete),
    takeEvery(authActions.SET_CURRENT_USER, authUseCase.setCurrentUser),
    takeEvery(authActions.SYNC_CURRENT_USER, authUseCase.syncCurrentUser),
    takeEvery(
        authActions.SYNC_CURRENT_USER_FORCE,
        authUseCase.syncCurrentUserForce
    ),
    takeEvery(authActions.LOGOUT, authUseCase.logout),
];
