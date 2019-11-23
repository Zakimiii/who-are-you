import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import AppUseCase from '@usecase/AppUseCase';
import {
    userShowRoute,
    communityShowRoute,
    homeRoute,
    communityAnswerShowRoute,
    communityAnswerNewRoute,
    communityHeadingShowRoute,
    communityHeadingNewRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import models from '@network/client_models';
import Notification from '@network/notification';
import tt from 'counterpart';
import data_config from '@constants/data_config';
import {
    CommunityHeadingRepository,
    CommunityAnswerRepository,
    CommunityRepository,
    UserRepository,
} from '@repository';
import { FileEntity, FileEntities } from '@entity';

const communityAnswerRepository = new CommunityAnswerRepository();
const communityHeadingRepository = new CommunityHeadingRepository();
const userRepository = new UserRepository();
const communityRepository = new CommunityRepository();
const appUsecase = new AppUseCase();
const notification = new Notification();

export default class CommunityHeadingUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initShow({ payload: { pathname } }) {
        if (!communityHeadingShowRoute.isValidPath(pathname)) return;
        try {
            const id = communityHeadingShowRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const heading = yield communityHeadingRepository.getHeading({
                id,
            });
            if (!heading) return;
            yield put(communityHeadingActions.setShow({ heading }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initNew({ payload: { pathname } }) {
        if (!communityHeadingNewRoute.isValidPath(pathname)) return;
        const repository = yield select(state =>
            communityHeadingActions.getNewHeading(state)
        );
        if (!!repository && !!repository.HeadingId) return;
        try {
            const id = communityHeadingNewRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const community = yield communityRepository.getCommunity({
                id,
                isMyAccount: current_user && current_user.id == id,
            });
            if (!community) return;
            yield put(
                communityHeadingActions.setNew({
                    heading: models.Community.build({
                        Community: community,
                        CommunityId: community.id,
                    }),
                })
            );
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initHeadingAnswers({ payload: { pathname } }) {
        if (!communityHeadingShowRoute.isValidPath(pathname)) return;
        try {
            const id = communityHeadingShowRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const answers = yield communityHeadingRepository.getAnswers({
                heading: { id },
            });
            yield put(communityHeadingActions.setHeadingAnswer({ answers }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreHeadingAnswers({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (communityHeadingShowRoute.isValidPath(pathname)) {
            try {
                yield put(authActions.syncCurrentUser());
                const id = communityHeadingShowRoute.params_value('id', pathname);
                const indexContentsLength = yield select(state =>
                    communityHeadingActions.getHeadingAnswerLength(state)
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
                const answers = yield communityHeadingRepository.getAnswers({
                    heading: { id },
                    offset: indexContentsLength,
                });
                if (answers.length == 0) {
                    yield put(appActions.fetchMoreDataEnd());
                    return;
                };
                yield put(communityHeadingActions.addHeadingAnswer({ answers }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *syncHeading({ payload: { id } }) {
        const heading = yield communityHeadingRepository
            .getHeading({
                id,
            })
            .catch(async e => {
                await put(appActions.addError({ error: e }));
            });

        yield put(
            !!heading
                ? communityHeadingActions.setCaches({ headings: [heading] })
                : communityHeadingActions.setDeletes({
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
                    // bcomposite_src: '/images/brands/ogp-back.png',
                });
            }
            const data = yield communityHeadingRepository.create(heading);
            if (!data.posted && !!data.heading) {
                yield put(
                    communityHeadingActions.createdHeading({
                        heading: data.heading,
                        text: heading.Community.body,
                    })
                );
            } else if (!!data.posted && !!data.heading) {
                yield put(communityHeadingActions.hideNew());
                yield put(communityHeadingActions.resetNew());
                browserHistory.push(
                    communityHeadingShowRoute.getPath({
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
                    // bcomposite_src: '/images/brands/ogp-back.png',
                });
            }
            const data = yield communityHeadingRepository.update(heading);
            if (!data.posted && !!data.heading) {
                yield put(
                    communityHeadingActions.createdHeading({
                        heading: data.heading,
                        text: heading.Community.body,
                    })
                );
            } else if (!!data.posted && !!data.heading) {
                yield put(communityHeadingActions.hideNew());
                yield put(communityHeadingActions.resetNew());
                browserHistory.push(
                    communityHeadingShowRoute.getPath({
                        params: {
                            id: data.heading.id,
                        },
                    })
                );
            }
            yield put(communityHeadingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *deleteHeading({ payload: { heading } }) {
        if (!heading) return;
        try {
            const data = yield communityHeadingRepository.delete(heading);
            yield put(communityHeadingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }

    *trashHeading({ payload: { heading } }) {
        if (!heading) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield communityHeadingRepository.trash(heading);
            yield put(communityHeadingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *untrashHeading({ payload: { heading } }) {
        if (!heading) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield communityHeadingRepository.trash(heading);
            yield put(communityHeadingActions.syncHeading({ id: heading.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }
}
