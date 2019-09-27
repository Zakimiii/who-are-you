import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import models from '@network/client_models';

// Action constants
export const SEARCH_HEADING = 'search/SEARCH_HEADING';
export const SET_HEADING_RESULT = 'search/SET_HEADING_RESULT';
export const GET_MORE_SEARCH_HEADING = 'search/GET_MORE_SEARCH_HEADING';
export const ADD_HEADING_RESULT = 'search/ADD_HEADING_RESULT';
export const SEARCH_USER = 'search/SEARCH_USER';
export const SEARCH_ANSWER = 'search/SEARCH_<ANSWER></ANSWER>';
export const SET_USER_RESULT = 'search/SET_USER_RESULT';
export const SET_ANSWER_RESULT = 'search/SET_ANSWER_RESULT';
export const GET_MORE_SEARCH_USER = 'search/GET_MORE_SEARCH_USER';
export const GET_MORE_SEARCH_ANSWER = 'search/GET_MORE_SEARCH_ANSWER';
export const ADD_USER_RESULT = 'search/ADD_USER_RESULT';
export const ADD_ANSWER_RESULT = 'search/ADD_ANSWER_RESULT';
export const SET_HEADING_KEYWORD = 'search/SET_HEADING_KEYWORD';
export const SET_USER_KEYWORD = 'search/SET_USER_KEYWORD';
export const SET_ANSWER_KEYWORD = 'search/SET_ANSWER_KEYWORD';

const defaultState = fromJS({
    keyword: '',
    user_keyword: '',
    search_heading: List(),
    search_user: List(),
    search_answer: List(),
});

export default function reducer(state = defaultState, action) {
    const payload = action.payload;

    switch (action.type) {
        case SET_HEADING_KEYWORD: {
            let keyword;
            if (payload) {
                keyword = fromJS(payload.keyword);
            }
            return state.merge({
                keyword: keyword,
            });
        }

        case SET_USER_KEYWORD: {
            let keyword;
            if (payload) {
                keyword = fromJS(payload.keyword);
            }
            return state.merge({
                user_keyword: keyword,
            });
        }

        case SET_ANSWER_KEYWORD: {
            let keyword;
            if (payload) {
                keyword = fromJS(payload.keyword);
            }
            return state.merge({
                answer_keyword: keyword,
            });
        }

        case SEARCH_HEADING: {
            return state;
        }

        case SET_HEADING_RESULT: {
            return state.set(
                'search_heading',
                List(action.payload.contents.map(val => Map(val)))
            );
        }

        case ADD_HEADING_RESULT: {
            let before = state.get('search_heading');
            before = before.toJS();
            before.concat(payload.contents);
            return state.set('search_heading', List(before));
        }

        case SET_USER_RESULT: {
            return state.set(
                'search_user',
                List(action.payload.contents.map(val => Map(val)))
            );
        }

        case SET_ANSWER_RESULT: {
            return state.set(
                'search_answer',
                List(action.payload.contents.map(val => Map(val)))
            );
        }

        case ADD_USER_RESULT: {
            let before = state.get('search_user');
            before = before.toJS();
            before.concat(payload.contents);
            return state.set('search_user', List(before));
        }

        case ADD_ANSWER_RESULT: {
            let before = state.get('search_answer');
            before = before.toJS();
            before.concat(payload.contents);
            return state.set('search_answer', List(before));
        }

        default:
            return state;
    }
}

// Action creators

export const searchHeading = payload => ({
    type: SEARCH_HEADING,
    payload,
});

export const getMoreSearchHeading = payload => ({
    type: GET_MORE_SEARCH_HEADING,
    payload,
});

export const setHeadingResult = payload => ({
    type: SET_HEADING_RESULT,
    payload,
});

export const addHeadingResult = payload => ({
    type: ADD_HEADING_RESULT,
    payload,
});

export const searchUser = payload => ({
    type: SEARCH_USER,
    payload,
});

export const getMoreSearchUser = payload => ({
    type: GET_MORE_SEARCH_USER,
    payload,
});

export const setUserResult = payload => ({
    type: SET_USER_RESULT,
    payload,
});

export const addUserResult = payload => ({
    type: ADD_USER_RESULT,
    payload,
});

export const searchAnswer = payload => ({
    type: SEARCH_ANSWER,
    payload,
});

export const getMoreSearchAnswer = payload => ({
    type: GET_MORE_SEARCH_ANSWER,
    payload,
});

export const setAnswerResult = payload => ({
    type: SET_ANSWER_RESULT,
    payload,
});

export const addAnswerResult = payload => ({
    type: ADD_ANSWER_RESULT,
    payload,
});

export const setKeyword = payload => ({
    type: SET_KEYWORD,
    payload,
});

export const setUserKeyword = payload => ({
    type: SET_USER_KEYWORD,
    payload,
});

export const setAnswerKeyword = payload => ({
    type: SET_ANSWER_KEYWORD,
    payload,
});

export const getSearchHeading = state => {
    const val = state.search.get('search_heading');
    if (!val) return;
    const home_models = val.toJS();
    return home_models;
};

export const getSearchUser = state => {
    const val = state.search.get('search_user');
    if (!val) return;
    const home_models = val.toJS();
    return home_models;
};

export const getSearchAnswer = state => {
    const val = state.search.get('search_answer');
    if (!val) return;
    const home_models = val.toJS();
    return home_models;
};
