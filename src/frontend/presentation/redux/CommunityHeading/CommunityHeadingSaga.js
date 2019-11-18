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
import { CommunityHeadingUseCase } from '@usecase';
import * as communityHeadingActions from './CommunityHeadingReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const communityHeadingUseCase = new CommunityHeadingUseCase();

export const communityHeadingWatches = [
    // takeLatest(communityHeadingActions.CREATE_HEADING, communityHeadingUseCase.createHeading),
    // takeLatest(communityHeadingActions.UPDATE_HEADING, communityHeadingUseCase.updateHeading),
    // takeLatest(communityHeadingActions.DELETE_HEADING, communityHeadingUseCase.deleteHeading),
    // takeLatest(communityHeadingActions.SYNC_HEADING, communityHeadingUseCase.syncHeading),
    // takeLatest(communityHeadingActions.TRASH_HEADING, communityHeadingUseCase.trashHeading),
    // takeLatest(communityHeadingActions.UNTRASH_HEADING, communityHeadingUseCase.untrashHeading),
    // takeEvery(LOCATION_CHANGE, communityHeadingUseCase.initShow),
    // takeEvery(LOCATION_CHANGE, communityHeadingUseCase.initNew),
    // takeEvery(LOCATION_CHANGE, communityHeadingUseCase.initHeadingAnswers),
    // takeEvery(
    //     communityHeadingActions.GET_MORE_HEADING_ANSWER,
    //     communityHeadingUseCase.getMoreHeadingAnswers
    // ),
];
