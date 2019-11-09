import { fromJS, Set, List, Map } from 'immutable';
import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as authActions from '@redux/Auth/AuthReducer';
import * as sessionActions from '@redux/Session/SessionReducer';
import * as appActions from '@redux/App/AppReducer';
import * as userActions from '@redux/User/UserReducer';
import UseCaseImpl from '@usecase/UseCaseImpl';
import AuthRepository from '@repository/AuthRepository';
import { browserHistory } from 'react-router';
import * as cu2 from '@network/current_user';
import {
    homeRoute,
    userShowRoute,
    confirmForDeleteRoute,
} from '@infrastructure/RouteInitialize';
import expo from '@extension/object2json';
import safe2json from '@extension/safe2json';
import { ClientError } from '@extension/Error';
import oauth from '@network/oauth';
import Cookies from 'js-cookie';
import uuidv4 from 'uuid/v4';

const authRepository = new AuthRepository();

export default class AuthUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *checkClientId({ payload: { pathname } }) {
        oauth.generateClientId(localStorage);
        yield sessionActions.setClientId({ client_id: uuidv4() });
    }

    *logout() {
        if (!process.env.BROWSER) return;
        localStorage.removeItem(cu2.save_place);
        Cookies.remove(cu2.save_place);
        // TODO: in sign up, access token will be remove.
        oauth.removeAccessToken(localStorage);
        yield put(authActions.syncCurrentUserEnd());
    }

    // *login({ payload: { email, password } }) {
    //     try {
    //         if (typeof password == 'undefined' || typeof email == 'undefined')
    //             return;
    //         const state = yield select(state => state);

    //         yield put(appActions.fetchDataBegin());

    //         const data = yield authRepository.user_authenticate({
    //             email,
    //             password,
    //             client_id:
    //                 oauth.getClientId(localStorage) ||
    //                 state.session.get('client_id'),
    //         });

    //         yield put(appActions.fetchDataEnd());

    //         if (!data) return;

    //         if (data.accessToken) {
    //             oauth.saveAccessToken(localStorage, data.accessToken);
    //             yield sessionActions.setAccessToken({
    //                 accessToken: data.accessToken,
    //             });
    //         }

    //         if (data.user) {
    //             yield put(
    //                 authActions.setCurrentUser({
    //                     user: safe2json(data.user),
    //                 })
    //             );
    //             browserHistory.push(homeIndexRoute.path);
    //             yield put(authActions.hideLogin());
    //         }
    //     } catch (e) {
    //         yield put(appActions.addError({ error: e }));
    //     }
    //     yield put(appActions.fetchDataEnd());
    // }

    *twitterLogin({ payload: { pathname } }) {
        try {
            if (
                browserHistory.getCurrentLocation().query.twitter_logined !=
                    'true' ||
                !userShowRoute.isValidPath(pathname)
            )
                return;
            yield put(appActions.fetchDataBegin());

            const accessToken = browserHistory.getCurrentLocation().query
                .accessToken;

            yield put(
                sessionActions.generateAccessToken({
                    accessToken,
                    isOneTime: true,
                })
            );

            const user = yield authRepository.twitter_authenticate(
                accessToken,
                ''
            );

            yield put(appActions.fetchDataEnd());

            if (!!user) {
                yield put(
                    authActions.setCurrentUser({
                        user: safe2json(user),
                    })
                );
                yield put(authActions.hideLogin());
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *twitterConfirmLoginForDelete({ payload: { pathname } }) {
        if (!confirmForDeleteRoute.isValidPath(pathname)) return;
        try {
            if (
                browserHistory.getCurrentLocation().query.twitter_logined !=
                'true'
            )
                return;
            yield put(appActions.fetchDataBegin());

            const accessToken = browserHistory.getCurrentLocation().query
                .accessToken;

            yield put(
                sessionActions.generateAccessToken({
                    accessToken,
                    isOneTime: true,
                })
            );

            const user = yield authRepository.twitter_authenticate(
                accessToken,
                ''
            );

            yield put(appActions.fetchDataEnd());

            if (!!user) {
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                if (
                    current_user.username != user.username ||
                    current_user.id != user.id
                ) {
                    throw new ClientError({
                        error: new Error('username is_not_correct'),
                        tt_key: 'errors.is_not_correct',
                        tt_params: { data: 'g.login' },
                    });
                }
                yield put(authActions.hideConfirmLoginForDeleteModal());
                yield put(userActions.deleteUser({ user }));
                yield put(authActions.logout());
                browserHistory.push(homeIndexRoute.path);
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *syncCurrentUser({ payload }) {
        const synced = yield select(state => state.auth.get('synced'));
        if (!!synced) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const state = yield select(state => state);

            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const localAccessToken =
                oauth.getAccessToken(localStorage) ||
                state.session.get('accessToken');

            if (!current_user || !localAccessToken) {
                yield put(authActions.logout());
                yield put(appActions.screenLoadingEnd());
                return;
            }

            const result = yield authRepository.syncUser(current_user);
            if (!result) {
                yield put(authActions.logout());
                yield put(appActions.screenLoadingEnd());
                return;
            }

            if (!!result.exist && !!result.user) {
                yield put(
                    authActions.setCurrentUser({
                        user: safe2json(result.user),
                    })
                );
            } else {
                yield put(authActions.logout());
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *syncCurrentUserForce({ payload }) {
        yield put(appActions.screenLoadingBegin());
        try {
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            if (!current_user) {
                yield put(authActions.logout());
                yield put(appActions.screenLoadingEnd());
                return;
            }

            const result = yield authRepository.syncUser(current_user);
            if (!result) {
                yield put(authActions.logout());
                yield put(appActions.screenLoadingEnd());
                return;
            }

            if (!!result.exist && !!result.user) {
                yield put(
                    authActions.setCurrentUser({
                        user: safe2json(result.user),
                    })
                );
            } else {
                yield put(authActions.logout());
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *setCurrentUser({ payload: { user } }) {
        if (!process.env.BROWSER || !user) return;
        yield cu2.saveCurrentUser(localStorage, user);
        yield put(authActions.syncCurrentUserEnd());
    }

    *showLogin({ payload = { isError: true } }) {
        if (!payload.isError) return;
        const error = new ClientError({
            error: new Error('require login'),
            tt_key: 'g.do_it',
            tt_params: { data: 'g.login' },
        });
        yield put(appActions.addError({ error }));
    }
}
