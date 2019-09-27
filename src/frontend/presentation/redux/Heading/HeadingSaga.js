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

export const headingWatches = [];
