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

export const userWatches = [];