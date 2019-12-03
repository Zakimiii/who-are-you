import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as appActions from '@redux/App/AppReducer';
import * as authActions from '@redux/Auth/AuthReducer';
import * as communityHeadingActions from '@redux/CommunityHeading/CommunityHeadingReducer';
import * as communityAnswerActions from '@redux/CommunityAnswer/CommunityAnswerReducer';
import * as communityTemplateActions from '@redux/CommunityTemplate/CommunityTemplateReducer';
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
    CommunityTemplateRepository,
    CommunityRepository,
    UserRepository,
} from '@repository';
import { FileEntity, FileEntities } from '@entity';

const communityAnswerRepository = new CommunityAnswerRepository();
const communityHeadingRepository = new CommunityHeadingRepository();
const communityTemplateRepository = new CommunityTemplateRepository();
const userRepository = new UserRepository();
const communityRepository = new CommunityRepository();
const appUsecase = new AppUseCase();
const notification = new Notification();

export default class CommunityTemplateUseCase extends UseCaseImpl {
    constructor() {
        super();
    }

    *initTrend({ payload: { pathname } }) {
        if (communityShowRoute.isValidPath(pathname)) {
            const section = communityShowRoute.params_value(
                'section',
                pathname
            );
            const id = communityShowRoute.params_value('id', pathname);
            if (section !== 'templates') return;
            try {
                const community = yield communityRepository.getCommunity({
                    id,
                });
                if (!community) return;
                yield put(appActions.fetchDataBegin());
                const current_user = yield select(state =>
                    authActions.getCurrentUser(state)
                );
                const templates = !!current_user
                    ? yield communityTemplateRepository.getTrend({
                          username: current_user.username,
                          category_id: community.CategoryId,
                      })
                    : yield communityTemplateRepository.getStaticTrend({
                          category_id: community.CategoryId,
                      });
                if (!templates || templates.length == 0) return;
                yield put(communityTemplateActions.setHome({ templates }));
            } catch (e) {
                yield put(appActions.addError({ error: e }));
            }
        }
        yield put(appActions.fetchDataEnd());
    }

    *getMoreTrend({ payload }) {
        const pathname = browserHistory.getCurrentLocation().pathname;
        if (communityShowRoute.isValidPath(pathname)) {
            const section = communityShowRoute.params_value(
                'section',
                pathname
            );
            const id = communityShowRoute.params_value('id', pathname);
            if (section !== 'templates') return;
            try {
                const community = yield communityRepository.getCommunity({
                    id,
                });
                if (!community) return;
                yield put(authActions.syncCurrentUser());
                const indexContentsLength = yield select(state =>
                    communityTemplateActions.getHomeTemplateLength(state)
                );
                s;
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
                    ? yield communityTemplateRepository.getTrend({
                          username: current_user.username,
                          offset: indexContentsLength,
                          category_id: community.CategoryId,
                      })
                    : yield communityTemplateRepository.getStaticTrend({
                          offset: indexContentsLength,
                          category_id: community.CategoryId,
                      });
                if (!templates || templates.length == 0) {
                    yield put(appActions.fetchMoreDataEnd());
                    return;
                }
                yield put(communityTemplateActions.addHome({ templates }));
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
                    // bcomposite_src: '/images/brands/ogp-back_low.png',
                });
            }
            const data = yield communityTemplateRepository.addHeading({
                template,
                heading,
            });
            if (!data.posted && !!data.heading) {
                yield put(
                    headingActions.createdHeading({
                        heading: data.heading,
                        text: heading.Community.body,
                    })
                );
            } else if (!!data.posted && !!data.heading) {
                browserHistory.push(
                    communityHeadingShowRoute.getPath({
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
            const data = yield communityTemplateRepository.answer({
                user,
                answer,
                template,
            });
            yield put(communityTemplateActions.hideNew());
            yield put(communityTemplateActions.resetNew());
        } catch (e) {
            yield put(appActions.addError({ error: e }));
        }
        yield put(appActions.screenLoadingEnd());
    }
}
