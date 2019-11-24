import { Map, OrderedMap, List, fromJS } from 'immutable';
import tt from 'counterpart';
import { browserHistory } from 'react-router';
import safe2json from '@extension/safe2json';
import { ClientError } from '@extension/Error';
import * as detection from '@network/detection';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import {
    userShowRoute,
    categoryShowRoute,
    postIndexRoute,
    headingShowRoute,
    answerShowRoute,
    notificationIndexRoute,
    templateIndexRoute,
    communityShowRoute,
    communityIndexRoute,
    categoryIndexRoute,
} from '@infrastructure/RouteInitialize';

export const FETCH_DATA_BEGIN = 'app/FETCH_DATA_BEGIN';
export const FETCH_DATA_END = 'app/FETCH_DATA_END';
export const FETCH_MORE_DATA_BEGIN = 'app/FETCH_MORE_DATA_BEGIN';
export const FETCH_MORE_DATA_END = 'app/FETCH_MORE_DATA_END';
export const DISPATCH_DATA_BEGIN = 'app/DISPATCH_DATA_BEGIN';
export const DISPATCH_DATA_END = 'app/DISPATCH_DATA_END';
export const SCREEN_LOADING_BEGIN = 'app/SCREEN_LOADING_BEGIN';
export const SCREEN_LOADING_END = 'app/SCREEN_LOADING_END';
export const ADD_ERROR = 'app/ADD_ERROR';
export const REMOVE_ERROR = 'app/REMOVE_ERROR';
export const CLEAR_ERROR = 'app/CLEAR_ERROR';
export const ADD_SUCCESS = 'app/ADD_SUCCESS';
export const REMOVE_SUCCESS = 'app/REMOVE_SUCCESS';
export const CLEAR_SUCCESS = 'app/CLEAR_SUCCESS';
export const SET_USER_PREFERENCES = 'app/SET_USER_PREFERENCES';
export const TOGGLE_NIGHTMODE = 'app/TOGGLE_NIGHTMODE';
export const SHOW_HEADER = 'app/SHOW_HEADER';
export const HIDE_HEADER = 'app/HIDE_HEADER';
export const SHOW_SIDE_BAR_MODAL = 'app/SHOW_SIDE_BAR_MODAL';
export const HIDE_SIDE_BAR_MODAL = 'app/HIDE_SIDE_BAR_MODAL';
export const HIDE_ALL_MODAL = 'app/HIDE_ALL_MODAL';

export const defaultState = Map({
    loading: false,
    sending: false,
    more_loading: false,
    screen_loading: false,
    errors: List([]),
    successes: List([]),
    location: {},
    notifications: null,
    show_header: true,
    show_side_bar_modal: false,
    user_preferences: Map({
        locale: DEFAULT_LANGUAGE,
        country_code: null,
        nightmode: false,
        notification_id: null,
        timezone: null,
    }),
});

export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return state.set('location', {
                pathname: action.payload.pathname,
                loading: false,
                sending: false,
                more_loading: false,
                screen_loading: false,
            });
        case ADD_ERROR: {
            if (action.payload.error) {
                let { error } = action.payload;
                // console.log(error);
                error = safe2json(error);
                let errors = state.get('errors');
                if (!errors) {
                    errors = List([]);
                }
                return state.merge({
                    errors: List(errors.push(error)),
                });
            }
            return state;
        }

        case REMOVE_ERROR: {
            if (action.payload.error) {
                const vals = state.get('errors');
                const pre_errors = vals.toJS();
                const errors = pre_errors.filter(
                    e =>
                        e.key != action.payload.error.key &&
                        e.tt_key != action.payload.error.tt_key &&
                        e.message != action.payload.error.message
                );
                return state.set('errors', List(errors));
            }
            return state;
        }

        case CLEAR_ERROR: {
            return state.set('errors', List([]));
        }

        case ADD_SUCCESS: {
            if (action.payload.success) {
                let { success } = action.payload;
                let successes = state.get('successes');
                if (!successes) {
                    successes = List([]);
                }
                return state.merge({
                    successes: List(successes.push(success)),
                });
            }
            return state;
        }

        case REMOVE_SUCCESS: {
            if (action.payload.success) {
                const { success } = action.payload;
                const vals = state.get('successes');
                const successes = vals.toJS();
                return state.set(
                    'successes',
                    List(successes.filter(val => val != success))
                );
            }
            return state;
        }

        case CLEAR_SUCCESS: {
            return state.set('successes', List([]));
        }

        case SHOW_HEADER: {
            return state.merge({
                show_header: true,
            });
        }

        case HIDE_HEADER: {
            return state.merge({
                show_header: false,
            });
        }

        case SHOW_SIDE_BAR_MODAL: {
            return state.merge({
                show_side_bar_modal: true,
            });
        }

        case HIDE_SIDE_BAR_MODAL:
            return state.merge({
                show_side_bar_modal: false,
            });

        case FETCH_DATA_BEGIN:
            return state.set('loading', true);
        case FETCH_DATA_END:
            return state.set('loading', false);
        case FETCH_MORE_DATA_BEGIN:
            return state.set('more_loading', true);
        case FETCH_MORE_DATA_END:
            return state.set('more_loading', false);
        case DISPATCH_DATA_BEGIN:
            return state.set('sending', true);
        case DISPATCH_DATA_END:
            return state.set('sending', false);
        case SCREEN_LOADING_BEGIN:
            return state.set('screen_loading', true);
        case SCREEN_LOADING_END:
            return state.set('screen_loading', false);

        case SET_USER_PREFERENCES:
            return state.set('user_preferences', Map(action.payload));
        case TOGGLE_NIGHTMODE:
            return state.setIn(
                ['user_preferences', 'nightmode'],
                !state.getIn(['user_preferences', 'nightmode'])
            );

        default:
            return state;
    }
}

export const hideAllModal = payload => ({
    type: HIDE_ALL_MODAL,
    payload,
});

export const showSideBarModal = payload => ({
    type: SHOW_SIDE_BAR_MODAL,
    payload,
});

export const hideSideBarModal = payload => ({
    type: HIDE_SIDE_BAR_MODAL,
    payload,
});

export const showHeader = payload => ({
    type: SHOW_HEADER,
    payload,
});

export const hideHeader = payload => ({
    type: HIDE_HEADER,
    payload,
});

export const addError = payload => ({
    type: ADD_ERROR,
    payload,
});

export const removeError = payload => ({
    type: REMOVE_ERROR,
    payload,
});

export const clearError = payload => ({
    type: CLEAR_ERROR,
    payload,
});

export const addSuccess = payload => ({
    type: ADD_SUCCESS,
    payload,
});

export const removeSuccess = payload => ({
    type: REMOVE_SUCCESS,
    payload,
});

export const clearSuccess = payload => ({
    type: CLEAR_SUCCESS,
    payload,
});

export const screenLoadingBegin = () => ({
    type: SCREEN_LOADING_BEGIN,
});

export const screenLoadingEnd = () => ({
    type: SCREEN_LOADING_END,
});

export const fetchDataBegin = () => ({
    type: FETCH_DATA_BEGIN,
});

export const fetchDataEnd = () => ({
    type: FETCH_DATA_END,
});

export const fetchMoreDataBegin = () => ({
    type: FETCH_MORE_DATA_BEGIN,
});

export const fetchMoreDataEnd = () => ({
    type: FETCH_MORE_DATA_END,
});

export const dispatchDataBegin = () => ({
    type: DISPATCH_DATA_BEGIN,
});

export const dispatchDataEnd = () => ({
    type: DISPATCH_DATA_END,
});

export const setUserPreferences = payload => ({
    type: SET_USER_PREFERENCES,
    payload,
});

export const toggleNightmode = () => ({
    type: TOGGLE_NIGHTMODE,
});

export const getErrorsFromKey = (state, key) => {
    const vals = state.app.get('errors');
    if (!vals) return [];
    const errors = vals.toJS();
    return errors.filter(e => e.key == key).map(e => {
        e.error = new Error(e.message);
        return new ClientError(e);
    });
};

export const getSuccess = state => {
    const vals = state.app.get('successes');
    if (!vals) return [];
    const successes = vals.toJS();
    return successes || [];
};

export const removeErrorsFromKey = (state, key) => {
    const vals = state.app.get('errors');
    if (!vals) return [];
    const errors = vals.toJS();
    return errors.filter(e => e.key != key);
};

export const removeErrorsFromError = (state, error) => {
    const vals = state.app.get('errors');
    if (!vals) return [];
    const errors = vals.toJS();
    return errors.filter(
        e =>
            e.key != key &&
            e.tt_key != error.tt_key &&
            e.message != error.message
    );
};

export const enableModal = state => {
    return (
        state.auth.get('show_login_modal') ||
        state.heading.get('show_new_modal') ||
        state.answer.get('show_new_modal')
    );
};

//MEMO: loading check actions
export const userShowPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!userShowRoute.isValidPath(pathname)) return false;
    const username = userShowRoute.params_value('username', pathname);
    const loading = state.app.get('loading');
    const list_model = state.user.get('show_user');
    const model = list_model.toJS();
    if (!model) return true;
    return loading && model.username != username;
};

export const userShowContentsLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!userShowRoute.isValidPath(pathname)) return false;
    const username = userShowRoute.params_value('username', pathname);
    const loading = state.app.get('loading');
    if (!loading) return false;
    const list_model = state.user.get('user_heading');
    const model = list_model.toJS();
    if (!model) return true;
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading && model[0].User.username != username;
};

export const categoryShowPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!categoryShowRoute.isValidPath(pathname)) return false;
    const id = categoryShowRoute.params_value('id', pathname);
    const loading = state.app.get('loading');
    const list_model = state.category.get('show_category');
    const model = list_model.toJS();
    if (!model) return true;
    return loading && model.id != id;
};

export const categoryShowContentsLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!categoryShowRoute.isValidPath(pathname)) return false;
    const id = categoryShowRoute.params_value('id', pathname);
    const loading = state.app.get('loading');
    if (!loading) return false;
    const list_model = state.category.get('category_community');
    const model = list_model.toJS();
    if (!model) return true;
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading && model[0].id != id;
};

export const userShowTemplatesLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!userShowRoute.isValidPath(pathname)) return false;
    const username = userShowRoute.params_value('username', pathname);
    const loading = state.app.get('loading');
    if (!loading) return false;
    const list_model = state.template.get('home_template');
    const model = list_model.toJS();
    if (!model) return true;
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading;
};

export const communityShowPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!communityShowRoute.isValidPath(pathname)) return false;
    const id = communityShowRoute.params_value('id', pathname);
    const loading = state.app.get('loading');
    const list_model = state.community.get('show_community');
    const model = list_model.toJS();
    if (!model) return true;
    return loading && model.id != id;
};

export const communityShowContentsLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!communityShowRoute.isValidPath(pathname)) return false;
    const id = communityShowRoute.params_value('id', pathname);
    const loading = state.app.get('loading');
    if (!loading) return false;
    const list_model = state.community.get('community_heading');
    const model = list_model.toJS();
    if (!model) return true;
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading && model[0].CommunityId != id;
};

export const communityShowTemplatesLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!communityShowRoute.isValidPath(pathname)) return false;
    const id = communityShowRoute.params_value('id', pathname);
    const loading = state.app.get('loading');
    if (!loading) return false;
    const list_model = state.communityTemplate.get('home_template');
    const model = list_model.toJS();
    if (!model) return true;
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading;
};

export const communityIndexPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!communityIndexRoute.isValidPath(pathname)) return false;
    const loading = state.app.get('loading');
    // if (!loading) return false;
    const list_model = state.community.get('home_community');
    const model = list_model.toJS();
    const cumodel = state.auth.get('current_user');
    if (!model || !cumodel) return true;
    const current_user = cumodel.toJS();
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading;
};

export const categoryIndexPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!categoryIndexRoute.isValidPath(pathname)) return false;
    const loading = state.app.get('loading');
    // if (!loading) return false;
    const list_model = state.category.get('home_category');
    const model = list_model.toJS();
    const cumodel = state.auth.get('current_user');
    if (!model || !cumodel) return true;
    const current_user = cumodel.toJS();
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading;
};

export const templateIndexPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!templateIndexRoute.isValidPath(pathname)) return false;
    const loading = state.app.get('loading');
    // if (!loading) return false;
    const list_model = state.template.get('home_template');
    const model = list_model.toJS();
    const cumodel = state.auth.get('current_user');
    if (!model || !cumodel) return true;
    const current_user = cumodel.toJS();
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading;
};

export const postIndexPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!postIndexRoute.isValidPath(pathname)) return false;
    const loading = state.app.get('loading');
    // if (!loading) return false;
    const list_model = state.user.get('user_post');
    const model = list_model.toJS();
    const cumodel = state.auth.get('current_user');
    if (!model || !cumodel) return true;
    const current_user = cumodel.toJS();
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading || model[0].User.username != current_user.username;
};

export const notificationIndexPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!notificationIndexRoute.isValidPath(pathname)) return false;
    const loading = state.app.get('loading');
    // if (!loading) return false;
    const list_model = state.user.get('user_notification');
    const model = list_model.toJS();
    const cumodel = state.auth.get('current_user');
    if (!model || !cumodel) return true;
    const current_user = cumodel.toJS();
    if (model.length == 0 && loading) return true;
    if (!model[0]) return true;
    return loading || model[0].UserId != current_user.id;
};

export const headingShowPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!headingShowRoute.isValidPath(pathname)) return false;
    const id = headingShowRoute.params_value('id', pathname);
    const loading = state.app.get('loading');
    const list_model = state.heading.get('show_heading');
    const model = list_model.toJS();
    if (!model || Object.keys(model).length == 0) return true;
    return loading || model.id != id;
};

export const answerShowPageLoading = state => {
    if (!browserHistory) return true;
    const pathname = browserHistory.getCurrentLocation().pathname;
    if (!answerShowRoute.isValidPath(pathname)) return false;
    const id = answerShowRoute.params_value('id', pathname);
    const loading = state.app.get('loading');
    const list_model = state.answer.get('show_answer');
    const model = list_model.toJS();
    if (!model || Object.keys(model).length == 0) return true;
    return loading || model.id != id;
};
