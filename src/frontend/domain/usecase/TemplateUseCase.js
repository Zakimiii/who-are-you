import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as templateActions from '@redux/Template/TemplateReducer';
import * as headingActions from '@redux/Heading/HeadingReducer';
import * as answerActions from '@redux/Answer/AnswerReducer';
import AppUseCase from '@usecase/AppUseCase';
import {
    templateIndexRoute,
    userShowRoute,
    headingShowRoute,
} from '@infrastructure/RouteInitialize';
import { browserHistory } from 'react-router';
import models from '@network/client_models';
import Notification from '@network/notification';
import tt from 'counterpart';
import data_config from '@constants/data_config';
import { TemplateRepository, UserRepository } from '@repository';
import { FileEntity, FileEntities } from '@entity';
import TwitterHandler from '@network/twitter';

const userRepository = new UserRepository();
const templateRepository = new TemplateRepository();
const notification = new Notification();

export default class TemplateUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initTrend({ payload: { pathname } }) {
        if (userShowRoute.isValidPath(pathname)) {
            const section = userShowRoute.params_value('section', pathname);
            if (section !== 'templates') return;
            try {
                yield put(appActions.fetchDataBegin());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const templates = !!current_user
                    ? yield templateRepository.getTrend({
                          username: current_user.username,
                      })
                    : yield templateRepository.getStaticTrend({});
                if (!templates || templates.length == 0) return;
                yield put(templateActions.setHome({ templates }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        } else if (templateIndexRoute.isValidPath(pathname)) {
            try {
                yield put(appActions.fetchDataBegin());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const templates = !!current_user
                    ? yield templateRepository.getTrend({
                          username: current_user.username,
                      })
                    : yield templateRepository.getStaticTrend({});
                if (!templates || templates.length == 0) return;
                yield put(templateActions.setHome({ templates }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreTrend({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (templateIndexRoute.isValidPath(pathname) || userShowRoute.isValidPath(pathname)) {
            if (userShowRoute.isValidPath(pathname)) {
                const section = userShowRoute.params_value('section', pathname);
                if (section !== 'templates') return;
            }
            const section = userShowRoute.params_value('section', pathname);
            if (section !== 'templates') return;
            try {
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    templateActions.getHomeTemplateLength(state)
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
                const templates = !!current_user
                    ? yield templateRepository.getTrend({
                          username: current_user.username,
                          offset: indexContentsLength,
                      })
                    : yield templateRepository.getStaticTrend({
                          offset: indexContentsLength,
                      });
                if (!templates || templates.length == 0) {
                    yield put(appActions.fetchMoreDataEnd());
                    return;
                }
                yield put(templateActions.addHome({ templates }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchMoreDataEnd());
    }

    *addHeading({ payload: { template, heading } }) {
        if (!heading || !template) return;
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
            const data = yield templateRepository.addHeading({
                template,
                heading,
            });
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
                browserHistory.push(
                    headingShowRoute.getPath({
                        params: {
                            id: data.heading.id,
                        },
                    })
                );
            }
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }

    *answer({ payload: { user, answer, template } }) {
        if (!answer || !user || !template) return;
        yield put(appActions.screenLoadingBegin());
        try {
            const data = yield templateRepository.answer({
                user,
                answer,
                template,
            });
            yield put(templateActions.hideNew());
            yield put(templateActions.resetNew());
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }
}
