import { fromJS, Set, List, Map } from 'immutable';
import { call, put, select, fork, takeLatest, apply } from 'redux-saga/effects';
import * as sessionActions from '@redux/Session/SessionReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as appActions from '@redux/App/AppReducer';
import UseCaseImpl from '@usecase/UseCaseImpl';
import { browserHistory } from 'react-router';
import { SessionRepository, AuthRepository } from '@repository';
import models from '@network/client_models';
import oauth from '@network/oauth';
import tt from 'counterpart';

const sessionRepository = new SessionRepository();
const authRepository = new AuthRepository();

export default class SessionUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *generateAccessToken({ payload: { accessToken, isOneTime = true } }) {
        try {
            const state = yield select(state => state);
            const result = yield sessionRepository.generateAccessToken(
                accessToken,
                oauth.getClientId(localStorage) ||
                    state.session.get('client_id'),
                isOneTime
            );
            oauth.saveAccessToken(localStorage, result);
            yield sessionActions.setAccessToken({ accessToken: result });
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }
}
