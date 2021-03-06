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
import { CommunityUseCase } from '@usecase';
import * as communityActions from './CommunityReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const communityUseCase = new CommunityUseCase();

export const communityWatches = [
    takeEvery(LOCATION_CHANGE, communityUseCase.initShow),
    takeEvery(LOCATION_CHANGE, communityUseCase.initIndex),
    takeEvery(LOCATION_CHANGE, communityUseCase.initCommunityHeadings),
    takeEvery(
        communityActions.GET_MORE_COMMUNITY_HEADING,
        communityUseCase.getMoreCommunityHeadings
    ),
    takeEvery(communityActions.GET_MORE_HOME, communityUseCase.getMoreIndex),
    takeEvery(communityActions.SYNC_COMMUNITY, communityUseCase.syncCommunity),
    takeLatest(communityActions.FOLLOW, communityUseCase.follow),
    takeLatest(communityActions.UNFOLLOW, communityUseCase.unfollow),
    takeLatest(communityActions.REVIEW, communityUseCase.review),
];
