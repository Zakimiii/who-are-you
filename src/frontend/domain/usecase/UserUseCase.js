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
import {
    userShowRoute,
    homeRoute,
    homeAliasRoute,
    postIndexRoute,
    notificationIndexRoute,
} from '@infrastructure/RouteInitialize';
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
        try {
            if (userShowRoute.isValidPath(pathname)) {
                const username = userShowRoute.params_value(
                    'username',
                    pathname
                );
                yield put(appActions.fetchDataBegin());
                yield put(authActions.syncCurrentUser());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const user = yield userRepository.getUser({
                    username,
                    isMyAccount:
                        current_user && current_user.username == username,
                });
                if (!user) return;
                yield put(userActions.setShow({ user }));
            } else if (homeRoute.isValidPath(pathname)) {
                yield put(appActions.fetchDataBegin());
                yield put(authActions.syncCurrentUser());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                if (!current_user) return;
                const user = yield userRepository.getUser({
                    username: current_user.username,
                    isMyAccount: true,
                });
                if (!user) return;
                yield put(userActions.setShow({ user }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initRecommend({ payload: { pathname } }) {
        if (homeAliasRoute.isValidPath(pathname)) return;
        try {
            // const username = userShowRoute.params_value('username', pathname);
            yield put(appActions.fetchDataBegin());
            yield put(authActions.syncCurrentUser());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const recommends = yield select(state =>
                userActions.getRecommend(state)
            );
            // if (recommends.length > 0) return;
            const users = !!current_user
                ? yield userRepository.getUserRecommend({
                      username: current_user.username,
                  })
                : yield userRepository.getStaticUserRecommend({});
            yield put(userActions.setRecommend({ users }));
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initFollower({ payload: { pathname } }) {
        if (homeAliasRoute.isValidPath(pathname)) return;
        try {
            // const username = userShowRoute.params_value('username', pathname);
            yield put(appActions.fetchDataBegin());
            yield put(authActions.syncCurrentUser());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const followers = yield select(state =>
                userActions.getFollower(state)
            );
            if (!current_user || followers.length > 0) return;
            const users = yield userRepository.getUserFollower({
                username: current_user.username,
            });
            yield put(userActions.setFollower({ users }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initUserHeadings({ payload: { pathname } }) {
        try {
            if (userShowRoute.isValidPath(pathname)) {
                const username = userShowRoute.params_value(
                    'username',
                    pathname
                );
                yield put(authActions.syncCurrentUser());
                yield put(appActions.fetchDataBegin());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                let headings = yield userRepository.getHeadings({
                    username,
                    isMyAccount:
                        current_user && current_user.username == username,
                });
                if (headings.length == 0) {
                    //FIXME: dry
                    yield userRepository.createBot({ username });
                    yield userRepository.createBot({ username });
                    yield userRepository.createBot({ username });
                    headings = yield userRepository.getHeadings({
                        username,
                        isMyAccount:
                            current_user && current_user.username == username,
                    });
                }
                yield put(userActions.setUserHeading({ headings }));
            } else if (homeRoute.isValidPath(pathname)) {
                yield put(authActions.syncCurrentUser());
                yield put(appActions.fetchDataBegin());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                if (!current_user) return;
                let headings = yield userRepository.getHeadings({
                    username: current_user.username,
                    isMyAccount: true,
                });
                if (headings.length == 0) {
                    //FIXME: dry
                    yield userRepository.createBot({
                        username: current_user.username,
                    });
                    yield userRepository.createBot({
                        username: current_user.username,
                    });
                    yield userRepository.createBot({
                        username: current_user.username,
                    });
                    headings = yield userRepository.getHeadings({
                        username: current_user.username,
                        isMyAccount: true,
                    });
                }
                yield put(userActions.setUserHeading({ headings }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreUserHeadings({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        try {
            if (userShowRoute.isValidPath(pathname)) {
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
            } else if (homeRoute.isValidPath(pathname)) {
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    userActions.getUserHeadingLength(state)
                );
                if (indexContentsLength == 0) return;
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                if (!current_user) return;
                const loading = yield select(state =>
                    state.app.get('more_loading')
                );
                if (loading || indexContentsLength == 0) return;
                yield put(appActions.fetchMoreDataBegin());
                const headings = yield userRepository.getHeadings({
                    username: current_user.username,
                    offset: indexContentsLength,
                    isMyAccount: true,
                });
                if (headings.length == 0) return;
                yield put(userActions.addUserHeading({ headings }));
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
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

    *initUserPosts({ payload: { pathname } }) {
        if (!postIndexRoute.isValidPath(pathname)) return;
        try {
            yield put(authActions.syncCurrentUser());
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            if (!current_user) return;
            const headings = yield userRepository.getPosts({
                username: current_user.username,
                isMyAccount: true,
            });
            if (headings.length == 0) return;
            yield put(userActions.setUserPost({ headings }));
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreUserPosts({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (postIndexRoute.isValidPath(pathname)) {
            try {
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    userActions.getUserPostLength(state)
                );
                if (indexContentsLength == 0) return;
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const loading = yield select(state =>
                    state.app.get('more_loading')
                );
                if (!current_user || loading || indexContentsLength == 0)
                    return;
                yield put(appActions.fetchMoreDataBegin());
                const headings = yield userRepository.getPosts({
                    username: current_user.username,
                    offset: indexContentsLength,
                    isMyAccount: true,
                });
                if (headings.length == 0) return;
                yield put(userActions.addUserPost({ headings }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *initUserNotifications({ payload: { pathname } }) {
        if (!notificationIndexRoute.isValidPath(pathname)) return;
        try {
            yield put(authActions.syncCurrentUser());
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            if (!current_user) return;
            const notifications = yield userRepository.getNotifications({
                username: current_user.username,
                isMyAccount: true,
            });
            if (notifications.length == 0) return;
            yield put(userActions.setUserNotification({ notifications }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreUserNotifications({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (notificationIndexRoute.isValidPath(pathname)) {
            try {
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    userActions.getUserPostLength(state)
                );
                if (indexContentsLength == 0) return;
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const loading = yield select(state =>
                    state.app.get('more_loading')
                );
                if (!current_user || loading || indexContentsLength == 0)
                    return;
                yield put(appActions.fetchMoreDataBegin());
                const notifications = yield userRepository.getNotifications({
                    username: current_user.username,
                    offset: indexContentsLength,
                    isMyAccount: true,
                });
                if (notifications.length == 0) return;
                yield put(userActions.addUserNotification({ notifications }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
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
