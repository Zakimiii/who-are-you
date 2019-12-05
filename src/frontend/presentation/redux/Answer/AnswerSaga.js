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
import { AnswerUseCase } from '@usecase';
import * as answerActions from './AnswerReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const answerUseCase = new AnswerUseCase();

export const answerWatches = [
    takeEvery(LOCATION_CHANGE, answerUseCase.initShow),
    takeEvery(LOCATION_CHANGE, answerUseCase.initNew),
    takeEvery(answerActions.CREATE_ANSWER, answerUseCase.createAnswer),
    takeEvery(answerActions.UPDATE_ANSWER, answerUseCase.updateAnswer),
    takeEvery(answerActions.DELETE_ANSWER, answerUseCase.deleteAnswer),
    takeEvery(answerActions.SYNC_ANSWER, answerUseCase.syncAnswer),
    takeEvery(answerActions.TRASH_ANSWER, answerUseCase.trashAnswer),
    takeEvery(answerActions.UNTRASH_ANSWER, answerUseCase.untrashAnswer),
];
