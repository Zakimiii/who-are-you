import { fromJS, Set, List } from 'immutable';
import {
    call,
    put,
    select,
    fork,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';

import { browserHistory } from 'react-router';
import { translate } from '@infrastructure/Translator';
import DMCAUserList from '@constants/DMCAUserList';
import * as communityTemplateActions from '@redux/CommunityTemplate/CommunityTemplateReducer';
import { CommunityTemplateUseCase } from '@usecase';
import { LOCATION_CHANGE } from 'react-router-redux';

const communityTemplateUseCase = new CommunityTemplateUseCase();

export const communityTemplateWatches = [
    takeEvery(LOCATION_CHANGE, communityTemplateUseCase.initTrend),
    takeEvery(communityTemplateActions.ADD_HEADING, communityTemplateUseCase.addHeading),
    takeEvery(communityTemplateActions.GET_MORE_HOME, communityTemplateUseCase.getMoreTrend),
    takeLatest(communityTemplateActions.ANSWER_TEMPLATE, communityTemplateUseCase.answer),
];
