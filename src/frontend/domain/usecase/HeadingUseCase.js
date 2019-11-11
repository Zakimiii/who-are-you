import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import AppUseCase from '@usecase/AppUseCase';
import {
    userShowRoute,
    headingShowRoute,
    headingNewRoute,
    homeRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import models from '@network/client_models';
import Notification from '@network/notification';
import tt from 'counterpart';
import data_config from '@constants/data_config';
import { HeadingRepository, UserRepository } from '@repository';
import { FileEntity, FileEntities } from '@entity';
import TwitterHandler from '@network/twitter';

const headingRepository = new HeadingRepository();
const appUsecase = new AppUseCase();
const notification = new Notification();
const userRepository = new UserRepository();

export default class HeadingUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initShow({ payload: { pathname } }) {
        if (!headingShowRoute.isValidPath(pathname)) return;
        try {
            const id = headingShowRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const heading = yield headingRepository.getHeading({
                id,
            });
            if (!heading) return;
            yield put(headingActions.setShow({ heading }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initNew({ payload: { pathname } }) {
        if (!headingNewRoute.isValidPath(pathname)) return;
        const repository = yield select(state =>
            headingActions.getNewHeading(state)
        );
        if (!!repository && !!repository.HeadingId) return;
        try {
            const username = headingNewRoute.params_value('username', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const user = yield userRepository.getUser({
                username,
                isMyAccount: current_user && current_user.username == username,
            });
            if (!user) return;
            yield put(
                headingActions.setNew({
                    heading: models.Heading.build({
                        User: user,
                        UserId: user.id,
                    }),
                })
            );
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initHeadingAnswers({ payload: { pathname } }) {
        if (!headingShowRoute.isValidPath(pathname)) return;
        try {
            const id = headingShowRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const answers = yield headingRepository.getAnswers({
                heading: { id },
            });
            yield put(headingActions.setHeadingAnswer({ answers }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreHeadingAnswers({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (headingShowRoute.isValidPath(pathname)) {
            try {
                yield put(authActions.syncCurrentUser());
                const id = headingShowRoute.params_value('id', pathname);
                const indexContentsLength = yield select(state =>
                    headingActions.getHeadingAnswerLength(state)
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
                const answers = yield headingRepository.getAnswers({
                    heading: { id },
                    offset: indexContentsLength,
                });
                if (answers.length == 0) return;
                yield put(headingActions.addHeadingAnswer({ answers }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchMoreDataEnd());
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
            if (heading.picture instanceof Map) {
                let model = FileEntity.build(heading.picture.toJS());
                // heading.picture = yield model.upload({
                //     xsize: data_config.shot_picture_xsize,
                //     ysize: data_config.shot_picture_ysize,
                // });
                // heading.picture = model.url;
                heading.picture = yield model.getBuffer({
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                    // bcomposite_src: '/images/brands/ogp-back',
                });
            }
            const data = yield headingRepository.create(heading);
            if (!data.posted && !!data.heading) {
                const twitter_username = yield userRepository.getUserTwitterUsername(
                    {
                        id: data.heading.UserId,
                    }
                );
                yield put(
                    headingActions.createdHeading({
                        heading: data.heading,
                        twitter_username,
                    })
                );
            } else if (!!data.posted && !!data.heading) {
                yield put(headingActions.hideNew());
                yield put(headingActions.resetNew());
                browserHistory.push(
                    headingShowRoute.getPath({
                        params: {
                            id: data.heading.id,
                        },
                    })
                );
            }
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *updateHeading({ payload: { heading } }) {
        if (!heading) return;
        yield put(appActions.screenLoadingBegin());
        try {
            if (heading.picture instanceof Map) {
                let model = FileEntity.build(heading.picture.toJS());
                // heading.picture = yield model.upload({
                //     xsize: data_config.shot_picture_xsize,
                //     ysize: data_config.shot_picture_ysize,
                // });
                // heading.picture = model.url;
                heading.picture = yield model.getBuffer({
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                    // bcomposite_src: '/images/brands/ogp-back',
                });
            }
            const data = yield headingRepository.update(heading);
            if (!data.posted && !!data.heading) {
                const twitter_username = yield userRepository.getUserTwitterUsername(
                    {
                        id: data.heading.UserId,
                    }
                );
                yield put(
                    headingActions.createdHeading({
                        heading: data.heading,
                        twitter_username,
                    })
                );
            } else if (!!data.posted && !!data.heading) {
                yield put(headingActions.hideNew());
                yield put(headingActions.resetNew());
                browserHistory.push(
                    headingShowRoute.getPath({
                        params: {
                            id: data.heading.id,
                        },
                    })
                );
            }
            yield put(headingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *deleteHeading({ payload: { heading } }) {
        if (!heading) return;
        try {
            const data = yield headingRepository.delete(heading);
            yield put(headingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }

    *trashHeading({ payload: { heading } }) {
        if (!heading) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield headingRepository.trash(heading);
            yield put(headingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *untrashHeading({ payload: { heading } }) {
        if (!heading) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield headingRepository.trash(heading);
            yield put(headingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }
}
