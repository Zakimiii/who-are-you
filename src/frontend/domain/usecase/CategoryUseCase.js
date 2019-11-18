import UseCaseImpl from '@usecase/UseCaseImpl';
import { CategoryRepository } from '@repository';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@network/client_models';
import * as appActions from '@redux/App/AppReducer';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as categoryActions from '@redux/Category/CategoryReducer';
import AppUseCase from '@usecase/AppUseCase';
import {
    homeRoute,
    homeAliasRoute,
    communityIndexRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import { FileEntity, FileEntities } from '@entity';
import data_config from '@constants/data_config';

const categoryRepository = new CategoryRepository();
const appUsecase = new AppUseCase();

export default class CategoryUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initCategories({ payload: { pathname } }) {
        if (!communityIndexRoute.isValidPath(pathname)) return;
        try {
            yield put(authActions.syncCurrentUser());
            yield put(appActions.fetchDataBegin());
            // const current_user = yield select(state =>
            //     authActions.getCurrentUser(state)
            // );
            const categories = yield categoryRepository.getCategories({});
            if (categories.length == 0) return;
            yield put(categoryActions.setHome({ categories }));
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreCategories({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (communityIndexRoute.isValidPath(pathname)) {
            try {
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    categoryActions.getHomeCategoryLength(state)
                );
                if (indexContentsLength == 0) return;
                // const current_user = yield select(state =>
                //     authActions.getCurrentUser(state)
                // );
                const loading = yield select(state =>
                    state.app.get('more_loading')
                );
                if (loading || indexContentsLength == 0)
                    return;
                yield put(appActions.fetchMoreDataBegin());
                const categories = yield categoryRepository.getCategories({
                    offset: indexContentsLength,
                });
                if (categories.length == 0) return;
                yield put(categoryActions.addHome({ categories }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchMoreDataEnd());
    }
}
