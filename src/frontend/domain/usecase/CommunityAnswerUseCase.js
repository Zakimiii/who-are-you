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

export default class CommunityAnswerUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initShow({ payload: { pathname } }) {
        if (!communityAnswerShowRoute.isValidPath(pathname)) return;
        try {
            const id = communityAnswerShowRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const answer = yield communityAnswerRepository.getAnswer({
                id,
            });
            yield put(communityAnswerActions.setShow({ answer }));
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initNew({ payload: { pathname } }) {
        if (!communityAnswerNewRoute.isValidPath(pathname)) return;
        const repository = yield select(state =>
            communityAnswerActions.getNewAnswer(state)
        );
        if (!!repository && !!repository.HeadingId) return;
        try {
            const id = communityAnswerNewRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const heading = yield communityHeadingRepository.getHeading({
                id,
            });
            if (!heading) return;
            yield put(
                communityAnswerActions.setNew({
                    answer: models.CommunityAnswer.build({
                        Heading: heading,
                        HeadingId: heading.id,
                    }),
                })
            );
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *syncAnswer({ payload: { id } }) {
        const answer = yield communityAnswerRepository
            .getAnswer({
                id,
            })
            .catch(async e => {
                await put(appActions.addError({ error: e }));
            });

        yield put(
            !!answer
                ? communityAnswerActions.setCaches({ answers: [answer] })
                : communityAnswerActions.setDeletes({
                      answers: [models.Answer.build({ id })],
                  })
        );
    }

    *createAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            if (answer.picture instanceof Map) {
                let model = FileEntity.build(answer.picture.toJS());
                // answer.picture = yield model.upload({
                //     xsize: data_config.shot_picture_xsize,
                //     ysize: data_config.shot_picture_ysize,
                // });
                // answer.picture = model.url;
                answer.picture = yield model.getBuffer({
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                    // bcomposite_src: '/images/brands/ogp-back_low.png',
                });
            }
            const data = yield communityAnswerRepository.create(answer);

            if (!data.posted && !!data.answer) {
                yield put(
                    communityAnswerActions.createdAnswer({
                        answer: data.answer,
                        text: answer.Heading.Community.body,
                    })
                );
            } else if (!!data.posted && !!data.answer) {
                yield put(communityAnswerActions.hideNew());
                yield put(communityAnswerActions.resetNew());
                browserHistory.push(
                    communityAnswerShowRoute.getPath({
                        params: {
                            id: data.answer.id,
                        },
                    })
                );
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *updateAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            if (answer.picture instanceof Map) {
                let model = FileEntity.build(answer.picture.toJS());
                // answer.picture = yield model.upload({
                //     xsize: data_config.shot_picture_xsize,
                //     ysize: data_config.shot_picture_ysize,
                // });
                // answer.picture = model.url;
                answer.picture = yield model.getBuffer({
                    xsize: data_config.shot_picture_xsize,
                    ysize: data_config.shot_picture_ysize,
                    // bcomposite_src: '/images/brands/ogp-back_low.png',
                });
            }
            const data = yield communityAnswerRepository.update(answer);
            if (!data.posted && !!data.answer) {
                yield put(
                    communityAnswerActions.createdAnswer({
                        answer: data.answer,
                        text: answer.Heading.Community.body,
                    })
                );
            } else if (!!data.posted && !!data.answer) {
                yield put(communityAnswerActions.hideNew());
                yield put(communityAnswerActions.resetNew());
                browserHistory.push(
                    communityAnswerShowRoute.getPath({
                        params: {
                            id: data.answer.id,
                        },
                    })
                );
            }
            yield put(communityAnswerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *deleteAnswer({ payload: { answer } }) {
        if (!answer) return;
        try {
            const data = yield communityAnswerRepository.delete(answer);
            yield put(communityAnswerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }

    *trashAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield communityAnswerRepository.trash(answer);
            yield put(communityAnswerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *untrashAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield communityAnswerRepository.trash(answer);
            yield put(communityAnswerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }
}
