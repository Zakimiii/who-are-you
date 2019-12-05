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
import { CommunityAnswerUseCase } from '@usecase';
import * as communityAnswerActions from './CommunityAnswerReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const communityAnswerUseCase = new CommunityAnswerUseCase();

export const communityAnswerWatches = [
    takeEvery(LOCATION_CHANGE, communityAnswerUseCase.initShow),
    takeEvery(LOCATION_CHANGE, communityAnswerUseCase.initNew),
    takeEvery(communityAnswerActions.CREATE_ANSWER, communityAnswerUseCase.createAnswer),
    takeEvery(communityAnswerActions.UPDATE_ANSWER, communityAnswerUseCase.updateAnswer),
    takeEvery(communityAnswerActions.DELETE_ANSWER, communityAnswerUseCase.deleteAnswer),
    takeEvery(communityAnswerActions.SYNC_ANSWER, communityAnswerUseCase.syncAnswer),
    takeEvery(communityAnswerActions.TRASH_ANSWER, communityAnswerUseCase.trashAnswer),
    takeEvery(communityAnswerActions.UNTRASH_ANSWER, communityAnswerUseCase.untrashAnswer),
];
