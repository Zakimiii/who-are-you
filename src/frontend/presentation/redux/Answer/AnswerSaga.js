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
    takeLatest(answerActions.CREATE_ANSWER, answerUseCase.createAnswer),
    takeLatest(answerActions.UPDATE_ANSWER, answerUseCase.updateAnswer),
    takeLatest(answerActions.DELETE_ANSWER, answerUseCase.deleteAnswer),
    takeLatest(answerActions.SYNC_ANSWER, answerUseCase.syncAnswer),
];
