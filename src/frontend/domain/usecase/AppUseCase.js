import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@network/client_models';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import tt from 'counterpart';
import Notification, { getOneSignalWindow } from '@network/notification';
import { UserRepository } from '@repository';
import { call, put, select, takeEvery } from 'redux-saga/effects';

const userRepository = new UserRepository();
const notification = new Notification();

export default class AppUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *detectNotificationId({ payload: { pathname } }) {
        try {
            let id,
                OneSignal = getOneSignalWindow();
            if (process.env.BROWSER) {
                id = yield OneSignal.getUserId();
            }
            if (!id) return;
            const state = yield select(state =>
                state.app.get('user_preferences')
            );
            let preferences = state.toJS();
            preferences.notification_id = id;
            yield put(appActions.setUserPreferences(preferences));
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            if (!current_user) return;
            if (current_user.notification_id == id) return;
            yield userRepository.syncNotificationId({
                notification_id: id,
                current_user,
            });
            /*.catch(async e => {
                await put(appActions.addError({ error: e }));
            });*/
        } catch (e) {}
    }

    *hideAllModal({ payload }) {
        const state = yield select(state => state);
    }
}
