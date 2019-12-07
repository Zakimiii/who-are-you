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
import { CategoryUseCase } from '@usecase';
import * as categoryActions from './CategoryReducer';
import { LOCATION_CHANGE } from 'react-router-redux';

const categoryUseCase = new CategoryUseCase();

export const categoryWatches = [
    takeEvery(LOCATION_CHANGE, categoryUseCase.initCategories),
    takeEvery(LOCATION_CHANGE, categoryUseCase.initAllCategories),
    takeEvery(LOCATION_CHANGE, categoryUseCase.initCategoryCommunities),
    takeEvery(LOCATION_CHANGE, categoryUseCase.initShow),
    // takeEvery(categoryActions.GET_MORE_CATEGORIES, categoryUseCase.getMoreAllCategories),
    takeEvery(categoryActions.GET_MORE_HOME, categoryUseCase.getMoreCategories),
    takeEvery(
        categoryActions.GET_MORE_CATEGORY_COMMUNITY,
        categoryUseCase.getMoreCategoryCommunities
    ),
];
