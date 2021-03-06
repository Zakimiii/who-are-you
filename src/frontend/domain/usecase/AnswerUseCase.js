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
    homeRoute,
    answerShowRoute,
    answerNewRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import models from '@network/client_models';
import Notification from '@network/notification';
import tt from 'counterpart';
import data_config from '@constants/data_config';
import {
    HeadingRepository,
    AnswerRepository,
    UserRepository,
} from '@repository';
import { FileEntity, FileEntities } from '@entity';

const answerRepository = new AnswerRepository();
const headingRepository = new HeadingRepository();
const userRepository = new UserRepository();
const appUsecase = new AppUseCase();
const notification = new Notification();

export default class AnswerUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initShow({ payload: { pathname } }) {
        if (!answerShowRoute.isValidPath(pathname)) return;
        try {
            const id = answerShowRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const answer = yield answerRepository.getAnswer({
                id,
            });
            yield put(answerActions.setShow({ answer }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.fetchDataEnd());
    }

    *initNew({ payload: { pathname } }) {
        if (!answerNewRoute.isValidPath(pathname)) return;
        const repository = yield select(state =>
            answerActions.getNewAnswer(state)
        );
        if (!!repository && !!repository.HeadingId) return;
        try {
            const id = answerNewRoute.params_value('id', pathname);
            yield put(appActions.fetchDataBegin());
            const current_user = yield select(state =>
                authActions.getCurrentUser(state)
            );
            const heading = yield headingRepository.getHeading({
                id,
            });
            if (!heading) return;
            yield put(
                answerActions.setNew({
                    answer: models.Answer.build({
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
        const answer = yield answerRepository
            .getAnswer({
                id,
            })
            .catch(async e => {
                await put(appActions.addError({ error: e }));
            });

        yield put(
            !!answer
                ? answerActions.setCaches({ answers: [answer] })
                : answerActions.setDeletes({
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
            const data = yield answerRepository.create(answer);

            if (!data.posted && !!data.answer) {
                const twitter_username = yield userRepository.getUserTwitterUsername(
                    {
                        id: answer.Heading.UserId,
                    }
                );
                yield put(
                    answerActions.createdAnswer({
                        answer: data.answer,
                        twitter_username,
                    })
                );
            } else if (!!data.posted && !!data.answer) {
                yield put(answerActions.hideNew());
                yield put(answerActions.resetNew());
                browserHistory.push(
                    answerShowRoute.getPath({
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
            const data = yield answerRepository.update(answer);
            if (!data.posted && !!data.answer) {
                const twitter_username = yield userRepository.getUserTwitterUsername(
                    {
                        id: answer.Heading.UserId,
                    }
                );
                yield put(
                    answerActions.createdAnswer({
                        answer: data.answer,
                        twitter_username,
                    })
                );
            } else if (!!data.posted && !!data.answer) {
                yield put(answerActions.hideNew());
                yield put(answerActions.resetNew());
                browserHistory.push(
                    answerShowRoute.getPath({
                        params: {
                            id: data.answer.id,
                        },
                    })
                );
            }
            yield put(answerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *deleteAnswer({ payload: { answer } }) {
        if (!answer) return;
        try {
            const data = yield answerRepository.delete(answer);
            yield put(answerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
    }

    *trashAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield answerRepository.trash(answer);
            yield put(answerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *untrashAnswer({ payload: { answer } }) {
        if (!answer) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield answerRepository.trash(answer);
            yield put(answerActions.syncAnswer({ id: answer.id }));
        } catch (e) {
            console.log(e);
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }
}
