import UseCaseImpl from '@usecase/UseCaseImpl';
import { UserRepository, HeadingRepository } from '@repository';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@network/client_models';
import * as appActions from '@redux/App/AppReducer';
import * as userActions from '@redux/User/UserReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import AppUseCase from '@usecase/AppUseCase';
import { userShowRoute, homeRoute } from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import { FileEntity, FileEntities } from '@entity';
import data_config from '@constants/data_config';

const userRepository = new UserRepository();
const headingRepository = new HeadingRepository();
const appUsecase = new AppUseCase();

export default class UserUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initShow({ payload: { pathname } }) {
        if (!userShowRoute.isValidPath(pathname)) return;
        try {
            const username = userShowRoute.params_value('username', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const user = yield userRepository.getUser({
                username,
                isMyAccount: current_user && current_user.username == username,
            });
            yield put(userActions.setShow({ user }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initFollower({ payload: { pathname } }) {
        if (!userShowRoute.isValidPath(pathname)) return;
        try {
            const username = userShowRoute.params_value('username', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const users = yield userRepository.getUserFollower({
                username,
            });
            yield put(userActions.setFollower({ users }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initUserHeadings({ payload: { pathname } }) {
        if (!userShowRoute.isValidPath(pathname)) return;
        try {
            const username = userShowRoute.params_value('username', pathname);
            yield put(authActions.syncCurrentUser());
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const headings = yield userRepository.getHeadings({
                username,
                isMyAccount: current_user && current_user.username == username,
            });
            if (headings.length == 0) return;
            yield put(userActions.setUserHeading({ headings }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreUserHeadings({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (userShowRoute.isValidPath(pathname)) {
            try {
                yield put(authActions.syncCurrentUser());
                const username = userShowRoute.params_value(
                    'username',
                    pathname
                );
                const indexContentsLength = yield select(state =>
                    userActions.getUserHeadingLength(state)
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
                const headings = yield userRepository.getHeadings({
                    username,
                    offset: indexContentsLength,
                    isMyAccount:
                        current_user && current_user.username == username,
                });
                if (headings.length == 0) return;
                yield put(userActions.addUserHeading({ headings }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *getMoreUserHeadingAnswers({ payload: { heading } }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (!heading) return;
        if (!heading.Answers) return;
        try {
            yield put(authActions.syncCurrentUser());
            const indexContentsLength = heading.Answers.length;
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const loading = yield select(state =>
                state.app.get('more_loading')
            );
            if (indexContentsLength == 0) return;
            yield put(appActions.fetchMoreDataBegin());
            const answers = yield headingRepository.getAnswers({
                heading,
                offset: indexContentsLength,
            });
            if (answers.length == 0) return;
            yield put(userActions.addUserHeadingAnswer({ heading, answers }));
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *updateUser({ payload: { user } }) {
        yield put(appActions.screenLoadingBegin());
        const current_user = yield select(state =>
            authActions.getCurrentUser(state)
        );
        try {
            if (current_user.id != user.id) return;
            if (user.picture_small instanceof Map) {
                let model = FileEntities.build(user.picture_small.toJS());
                user.picture_small = yield model.upload({
                    xsize: data_config.small_picture_size,
                    ysize: data_config.small_picture_size,
                });
                user.picture_small = model.items[0].url;
            }
            const data = yield userRepository.updateUser(user);
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(authActions.syncCurrentUserForce());
        yield put(userActions.syncUser({ id: current_user.id }));
        yield put(appActions.screenLoadingEnd());
    }

    *deleteUser({ payload }) {
        yield put(appActions.screenLoadingBegin());
        try {
            const user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const data = yield userRepository.deleteUser(user);
            yield put(userActions.syncUser({ id: user.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(authActions.syncCurrentUser());
        yield put(appActions.screenLoadingEnd());
    }

    *syncUser({ payload: { id, username } }) {
        const user = yield userRepository
            .getUser({
                id,
                username,
            })
            .catch(async e => {
                await put(appActions.addError({ error: e }));
            });
        yield put(
            !!user
                ? userActions.setCaches({ users: [user] })
                : userActions.setDeletes({
                      users: [models.User.build({ id, username })],
                  })
        );
    }
}
