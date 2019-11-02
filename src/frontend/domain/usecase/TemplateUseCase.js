import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as templateActions from '@redux/Template/TemplateReducer';
import AppUseCase from '@usecase/AppUseCase';
import { templateIndexRoute } from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import models from '@network/client_models';
import Notification from '@network/notification';
import tt from 'counterpart';
import data_config from '@constants/data_config';
import { TemplateRepository } from '@repository';
import { FileEntity, FileEntities } from '@entity';
import TwitterHandler from '@network/twitter';

const templateRepository = new TemplateRepository();
const notification = new Notification();

export default class TemplateUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initTrend({ payload: { pathname } }) {
        if (!templateIndexRoute.isValidPath(pathname)) return;
        try {
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const templates = !!current_user
                ? yield templateRepository.getTrend({
                      username: current_user.username,
                  })
                : yield templateRepository.getStaticTrend({});
            if (!templates || templates.length == 0) return;
            yield put(templateActions.setHome({ templates }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreTrend({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (templateIndexRoute.isValidPath(pathname)) {
            try {
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    templateActions.getHomeTemplateLength(state)
                );
                if (indexContentsLength == 0) return;
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const loading = yield select(state =>
                    state.app.get('more_loading')
                );
                if (loading || indexContentsLength == 0) return;
                yield put(appActions.fetchMoreDataBegin());
                const templates = !!current_user
                    ? yield templateRepository.getTrend({
                          username: current_user.username,
                          offset: indexContentsLength,
                      })
                    : yield templateRepository.getStaticTrend({
                          offset: indexContentsLength,
                      });
                if (!templates || templates.length == 0) return;
                yield put(templateActions.addHome({ templates }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *answer({ payload: { user, answer, template } }) {}
}
