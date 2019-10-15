import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as notifiactionActions from '@redux/Notification/NotificationReducer';
import { NotificationRepository } from '@repository';

const notificationRepository = new NotificationRepository();

export default class NotificationUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *checkNotification({ payload: { notification } }) {
        if (!notification) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield notificationRepository.check(notification);
            // yield put(headingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }
}
