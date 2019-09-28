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
import { AnswerRepository } from '@repository';

const answerRepository = new AnswerRepository();
const appUsecase = new AppUseCase();
const notification = new Notification();

export default class AnswerUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *syncAnswer({ payload: { id } }) {
        const answer = yield answerRepository
            .getAnswer({
                id,
            })
            .catch(async e => {
                await put(appActions.addError({ error: e }));
            });

        yield put(
            !!answer
                ? answerActions.setCaches({ answers: [answer] })
                : answerActions.setDeletes({
                      answers: [models.Answer.build({ id })],
                  })
        );
    }

    *createAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield answerRepository.createAnswer(answer);
            yield put(answerActions.hideNew());
            yield put(answerActions.resetNew());
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *updateAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield answerRepository.updateAnswer(answer);
            yield put(answerActions.hideNew());
            yield put(answerActions.resetNew());
            yield put(answerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *deleteAnswer({ payload: { answer } }) {
        if (!answer) return;
        try {
            const data = yield answerRepository.deleteAnswer(answer);
            yield put(answerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }
}
