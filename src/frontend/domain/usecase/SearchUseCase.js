import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@network/client_models';
import SearchRepository from '@repository/SearchRepository';
import { browserHistory } from 'react-router';
import * as searchActions from '@redux/Search/SearchReducer';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import querystring from 'querystring';

const searchRepository = new SearchRepository();

export default class SearchUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *searchHeading({ payload: { keyword } }) {
        if (keyword === '' || !keyword) return;
        const search_state = yield select(state => state.search);

        const prevKeyword = search_state.get('keyword');

        let search_heading = search_state.get('search_heading');
        search_heading = search_heading.toJS();

        if (prevKeyword == keyword && search_heading.length > 0) return;
        yield put(appActions.fetchDataBegin());
        try {
            yield put(authActions.syncCurrentUser());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const data = yield searchRepository
                .searchHeading({
                    keyword,
                    user: current_user,
                })
                .catch(e => {
                    throw new Error(e);
                });
            if (!data) {
                yield put(appActions.fetchDataEnd());
                return;
            }
            yield put(searchActions.setResult({ headings: data }));
            yield put(searchActions.setKeyword({ keyword }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreSearchHeading({ payload }) {
        const search_state = yield select(state => state.search);
        const keyword = search_state.get('keyword');
        if (keyword === '' || !keyword) return;
        let search_heading = search_state.get('search_heading');
        search_heading = search_heading.toJS();
        yield put(appActions.fetchDataBegin());
        try {
            const data = yield searchRepository
                .searchHeading({
                    keyword,
                    offset: search_heading[0].items[0].headings.length,
                })
                .catch(e => {
                    throw new Error(e);
                });
            if (!data) {
                yield put(appActions.fetchMoreDataEnd());
                return;
            }
            yield put(searchActions.addResult({ headings: data }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *searchUser({ payload: { keyword } }) {
        if (keyword === '' || !keyword) return;
        const search_state = yield select(state => state.search);

        const prevKeyword = search_state.get('user_keyword');

        let search_user = search_state.get('search_user');
        search_user = search_user.toJS();

        if (prevKeyword == keyword) return;
        yield put(appActions.fetchDataBegin());
        try {
            yield put(authActions.syncCurrentUser());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const data = yield searchRepository
                .searchUser({
                    keyword,
                    user: current_user,
                })
                .catch(e => {
                    throw new Error(e);
                });
            if (!data) {
                yield put(appActions.fetchDataEnd());
                return;
            }
            yield put(searchActions.setUserResult({ users: data }));
            yield put(searchActions.setUserKeyword({ keyword }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreSearchUser({ payload }) {
        const search_state = yield select(state => state.search);
        const keyword = search_state.get('user_keyword');
        if (keyword === '' || !keyword) return;
        let search_user = search_state.get('search_user');
        search_user = search_user.toJS();
        yield put(appActions.fetchDataBegin());
        try {
            const data = yield searchRepository
                .searchUser({
                    keyword,
                    offset: search_user[0].items[0].headings.length,
                })
                .catch(e => {
                    throw new Error(e);
                });
            if (!data) {
                yield put(appActions.fetchMoreDataEnd());
                return;
            }
            yield put(searchActions.addUserResult({ users: data }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *searchAnswer({ payload: { keyword } }) {
        if (keyword === '' || !keyword) return;
        const search_state = yield select(state => state.search);

        const prevKeyword = search_state.get('answer_keyword');

        let search_user = search_state.get('search_answer');
        search_user = search_user.toJS();

        if (prevKeyword == keyword && search_user.length > 0) return;
        yield put(appActions.fetchDataBegin());
        try {
            yield put(authActions.syncCurrentUser());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const data = yield searchRepository
                .searchAnswer({
                    keyword,
                    user: current_user,
                })
                .catch(e => {
                    throw new Error(e);
                });
            if (!data) {
                yield put(appActions.fetchDataEnd());
                return;
            }
            yield put(searchActions.setAnswerResult({ answers: data }));
            yield put(searchActions.setAnswerKeyword({ keyword }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreSearchAnswer({ payload }) {
        const search_state = yield select(state => state.search);
        const keyword = search_state.get('answer_keyword');
        if (keyword === '' || !keyword) return;
        let search_user = search_state.get('search_answer');
        search_user = search_user.toJS();
        yield put(appActions.fetchDataBegin());
        try {
            const data = yield searchRepository
                .searchAnswer({
                    keyword,
                    offset: search_user[0].items[0].headings.length,
                })
                .catch(e => {
                    throw new Error(e);
                });
            if (!data) {
                yield put(appActions.fetchDataEnd());
                return;
            }
            yield put(searchActions.addAnswerResult({ answers: data }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }
}
