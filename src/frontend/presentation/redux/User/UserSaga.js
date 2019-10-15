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
import DMCAUserList from '@constants/DMCAUserList';
import * as userActions from './UserReducer';
import AuthUseCase from '@usecase/AuthUseCase';
import AppUseCase from '@usecase/AppUseCase';
import UserUseCase from '@usecase/UserUseCase';

const authUseCase = new AuthUseCase();
const appUseCase = new AppUseCase();
const userUseCase = new UserUseCase();

export const userWatches = [
    takeEvery(LOCATION_CHANGE, userUseCase.initShow),
    takeEvery(LOCATION_CHANGE, userUseCase.initUserPosts),
    takeEvery(LOCATION_CHANGE, userUseCase.initUserNotifications),
    takeEvery(LOCATION_CHANGE, userUseCase.initFollower),
    takeEvery(LOCATION_CHANGE, userUseCase.initUserHeadings),
    takeEvery(
        userActions.GET_MORE_USER_HEADING,
        userUseCase.getMoreUserHeadings
    ),
    takeEvery(
        userActions.GET_MORE_USER_HEADING_ANSWER,
        userUseCase.getMoreUserHeadingAnswers
    ),
    takeEvery(userActions.GET_MORE_USER_POST, userUseCase.getMoreUserPosts),
    takeEvery(
        userActions.GET_MORE_USER_NOTIFICATION,
        userUseCase.getMoreUserNotifications
    ),
    takeLatest(userActions.UPDATE_USER, userUseCase.updateUser),
    takeLatest(userActions.DELETE_USER, userUseCase.deleteUser),
    takeLatest(userActions.SYNC_USER, userUseCase.syncUser),
];
