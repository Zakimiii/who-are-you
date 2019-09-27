import { fromJS, Set, List } from 'immutable';
import { call, put, select, fork, takeLatest } from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import { translate } from '@infrastructure/Translator';
import DMCAUserList from '@constants/DMCAUserList';
import * as sessionActions from '@redux/Session/SessionReducer';
import { SessionUseCase } from '@usecase';

const sessionUseCase = new SessionUseCase();

export const sessionWatches = [
    takeLatest(sessionActions.SET_USER_STEP, sessionUseCase.setUserStep),
    takeLatest(sessionActions.INCREMENT_STEP, sessionUseCase.incrementStep),
    takeLatest(sessionActions.DECREMENT_STEP, sessionUseCase.decrementStep),
    takeLatest(
        sessionActions.RESEND_CONFIRMATION_CODE,
        sessionUseCase.resendConfirmationCode
    ),
    takeLatest(
        sessionActions.RESEND_CONFIRMATION_MAIL,
        sessionUseCase.resendConfirmationMail
    ),
    takeLatest(
        sessionActions.SEND_DELETE_PASSWORD_CONFIRMATION_MAIL,
        sessionUseCase.sendDeletePasswordConfirmEmail
    ),
    takeLatest(
        sessionActions.GENERATE_ACCESS_TOKEN,
        sessionUseCase.generateAccessToken
    ),
];
