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
import { translate } from '@ƒinfrastructure/Translator';
import DMCAUserList from '@constants/DMCAUserList';
import { CommunityAnswerUseCase } from '@usecase';
import * as communityAnswerActions from './AnswerReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const communityAnswerUseCase = new CommunityAnswerUseCase();

export const communityAnswerWatches = [
    // takeEvery(LOCATION_CHANGE, communityAnswerUseCase.initShow),
    // takeEvery(LOCATION_CHANGE, communityAnswerUseCase.initNew),
    // takeLatest(communityAnswerActions.CREATE_ANSWER, communityAnswerUseCase.createAnswer),
    // takeLatest(communityAnswerActions.UPDATE_ANSWER, communityAnswerUseCase.updateAnswer),
    // takeLatest(communityAnswerActions.DELETE_ANSWER, communityAnswerUseCase.deleteAnswer),
    // takeLatest(communityAnswerActions.SYNC_ANSWER, communityAnswerUseCase.syncAnswer),
    // takeLatest(communityAnswerActions.TRASH_ANSWER, communityAnswerUseCase.trashAnswer),
    // takeLatest(communityAnswerActions.UNTRASH_ANSWER, communityAnswerUseCase.untrashAnswer),
];
