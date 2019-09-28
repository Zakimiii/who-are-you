import { fromJS, Set, List } from 'immutable';
import { call, put, select, fork, takeLatest } from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import { translate } from '@infrastructure/Translator';
import DMCAUserList from '@constants/DMCAUserList';
import * as sessionActions from '@redux/Session/SessionReducer';
import { SessionUseCase } from '@usecase';

const sessionUseCase = new SessionUseCase();

export const sessionWatches = [
    takeLatest(
        sessionActions.GENERATE_ACCESS_TOKEN,
        sessionUseCase.generateAccessToken
    ),
];
