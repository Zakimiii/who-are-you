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
import { SearchUseCase } from '@usecase';
import * as searchActions from './SearchReducer';

const searchUseCase = new SearchUseCase();

export const searchWatches = [
    // takeEvery(searchActions.SEARCH_CONTENT, searchUseCase.searchContent),
    // takeEvery(
    //     searchActions.GET_MORE_SEARCH_CONTENT,
    //     searchUseCase.getMoreSearchContent
    // ),
    // takeEvery(searchActions.SEARCH_USER, searchUseCase.searchUser),
    // takeEvery(
    //     searchActions.GET_MORE_SEARCH_USER,
    //     searchUseCase.getMoreSearchUser
    // ),
    // takeEvery(searchActions.SEARCH_LABEL, searchUseCase.searchLabel),
    // takeEvery(
    //     searchActions.GET_MORE_SEARCH_LABEL,
    //     searchUseCase.getMoreSearchLabel
    // ),
];
