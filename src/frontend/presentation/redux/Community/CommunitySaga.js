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
import { CommunityUseCase } from '@usecase';
import * as communityActions from './CommunityReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const communityUseCase = new CommunityUseCase();

export const communityWatches = [
    // takeLatest(communityActions.HIDE_ALL_MODAL, communityUseCase.hideAllModal),
];
