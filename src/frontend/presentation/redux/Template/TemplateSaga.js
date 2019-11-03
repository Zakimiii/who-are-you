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
import * as templateActions from '@redux/Template/TemplateReducer';
import { TemplateUseCase } from '@usecase';
import { LOCATION_CHANGE } from 'react-router-redux';

const templateUseCase = new TemplateUseCase();

export const templateWatches = [
    takeEvery(LOCATION_CHANGE, templateUseCase.initTrend),
    takeEvery(templateActions.ADD_HEADING, templateUseCase.addHeading),
    takeEvery(templateActions.GET_MORE_HOME, templateUseCase.getMoreTrend),
    takeLatest(templateActions.ANSWER_TEMPLATE, templateUseCase.answer),
];
