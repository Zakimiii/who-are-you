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
import { HeadingUseCase } from '@usecase';
import * as headingActions from './HeadingReducer';

const headingUseCase = new HeadingUseCase();

export const headingWatches = [
    takeLatest(headingActions.CREATE_HEADING, headingUseCase.createHeading),
    takeLatest(headingActions.UPDATE_HEADING, headingUseCase.updateHeading),
    takeLatest(headingActions.DELETE_HEADING, headingUseCase.deleteHeading),
    takeLatest(headingActions.SYNC_HEADING, headingUseCase.syncHeading),
];
