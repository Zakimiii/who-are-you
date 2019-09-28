import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import AppUseCase from '@usecase/AppUseCase';
import { userShowRoute, homeRoute } from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import models from '@network/client_models';
import Notification from '@network/notification';
import tt from 'counterpart';
import data_config from '@constants/data_config';
import { HeadingRepository } from '@repository';

const headingRepository = new HeadingRepository();
const appUsecase = new AppUseCase();
const notification = new Notification();

export default class HeadingUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *syncHeading({ payload: { id } }) {
        const heading = yield headingRepository
            .getHeading({
                id,
            })
            .catch(async e => {
                await put(appActions.addError({ error: e }));
            });

        yield put(
            !!heading
                ? headingActions.setCaches({ headings: [heading] })
                : headingActions.setDeletes({
                      headings: [models.Heading.build({ id })],
                  })
        );
    }

    *createHeading({ payload: { heading } }) {
        if (!heading) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield headingRepository.createHeading(heading);
            yield put(headingActions.hideNew());
            yield put(headingActions.resetNew());
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *updateHeading({ payload: { heading } }) {
        if (!heading) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield headingRepository.updateHeading(heading);
            yield put(headingActions.hideNew());
            yield put(headingActions.resetNew());
            yield put(headingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *deleteHeading({ payload: { heading } }) {
        if (!heading) return;
        try {
            const data = yield headingRepository.deleteHeading(heading);
            yield put(headingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }
}
