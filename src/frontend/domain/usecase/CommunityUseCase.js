import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@network/client_models';
import { CommunityRepository, CommunityHeadingRepository } from '@repository';
import * as appActions from '@redux/App/AppReducer';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as communityActions from '@redux/Community/CommunityReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import AppUseCase from '@usecase/AppUseCase';
import {
    communityShowRoute,
    communityIndexRoute,
    homeRoute,
    homeAliasRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import { FileEntity, FileEntities } from '@entity';
import data_config from '@constants/data_config';

const communityRepository = new CommunityRepository();
const communityHeadingRepository = new CommunityHeadingRepository();
const appUsecase = new AppUseCase();

export default class CommunityUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initIndex({ payload: { pathname } }) {
        try {
            if (communityIndexRoute.isValidPath(pathname)) {
                yield put(appActions.fetchDataBegin());
                yield put(authActions.syncCurrentUser());
                const communities = yield communityRepository.getStaticCommunities({});
                if (!communities) return;
                yield put(communityActions.setHome({ communities }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreIndex({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        try {
            if (communityIndexRoute.isValidPath(pathname)) {
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    communityActions.getHomeCommunityLength(state)
                );
                if (indexContentsLength == 0) return;
                const loading = yield select(state =>
                    state.app.get('more_loading')
                );
                if (loading || indexContentsLength == 0) return;
                yield put(appActions.fetchMoreDataBegin());
                const communities = yield communityRepository.getStaticCommunities({
                    offset: indexContentsLength,
                });
                if (communities.length == 0) {
                    yield put(appActions.fetchMoreDataEnd());
                    return;
                };
                yield put(communityActions.addHome({ communities }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *initShow({ payload: { pathname } }) {
        try {
            if (communityShowRoute.isValidPath(pathname)) {
                const id = communityShowRoute.params_value(
                    'id',
                    pathname
                );
                yield put(appActions.fetchDataBegin());
                yield put(authActions.syncCurrentUser());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const community = yield communityRepository.getCommunity({
                    id,
                });
                if (!community) return;
                yield put(communityActions.setShow({ community }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initCommunityHeadings({ payload: { pathname } }) {
        try {
            if (communityShowRoute.isValidPath(pathname)) {
                const id = communityShowRoute.params_value(
                    'id',
                    pathname
                );
                const section = communityShowRoute.params_value('section', pathname);
                if (section !== 'headings' && !!section) return;
                yield put(authActions.syncCurrentUser());
                yield put(appActions.fetchDataBegin());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                let headings = yield communityRepository.getHeadings({
                    id,
                });
                yield put(communityActions.setCommunityHeading({ headings }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreCommunityHeadings({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        try {
            if (communityShowRoute.isValidPath(pathname)) {
                yield put(authActions.syncCurrentUser());
                const id = communityShowRoute.params_value(
                    'id',
                    pathname
                );
                const indexContentsLength = yield select(state =>
                    communityActions.getCommunityHeadingLength(state)
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
                const headings = yield communityRepository.getHeadings({
                    id,
                    offset: indexContentsLength,
                });
                if (headings.length == 0) {
                    yield put(appActions.fetchMoreDataEnd());
                    return;
                };
                yield put(communityActions.addCommunityHeading({ headings }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *syncCommunity({ payload: { id } }) {
        const community = yield communityRepository
            .getCommunity({
                id,
            })
            .catch(async e => {
                await put(appActions.addError({ error: e }));
            });
        yield put(
            !!community
                ? communityActions.setCaches({ communities: [community] })
                : communityActions.setDeletes({
                      communities: [models.Community.build({ id })],
                  })
        );
    }

    *follow({ payload: { user, target } }) {
        if (!user || !target) return;
        try {
            const data = yield communityRepository.follow({
                user, target
            });
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }

    *unfollow({ payload: { user, target } }) {
        if (!user || !target) return;
        try {
            const data = yield communityRepository.unfollow({
                user,
                target
            });
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }
}
