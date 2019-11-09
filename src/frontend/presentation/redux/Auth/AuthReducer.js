import { fromJS, Map } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import { browserHistory } from 'react-router';
import {
    loginRoute,
    confirmForDeleteRoute,
} from '@infrastructure/RouteInitialize';
import safe2json from '@extension/safe2json';

// Action constants
export const SHOW_LOGIN = 'auth/SHOW_LOGIN';
export const HIDE_LOGIN = 'auth/HIDE_LOGIN';
export const LOGIN = 'auth/LOGIN';
export const LOGOUT = 'auth/LOGOUT';
export const SET_CURRENT_USER = 'auth/SET_CURRENT_USER';
export const SYNC_CURRENT_USER = 'auth/SYNC_CURRENT_USER';
export const SYNC_CURRENT_USER_END = 'auth/SYNC_CURRENT_USER_END';
export const SYNC_CURRENT_USER_FORCE = 'auth/SYNC_CURRENT_USER_FORCE';
export const SHOW_CONFIRM_LOGIN_FOR_DELETE =
    'auth/SHOW_CONFIRM_LOGIN_FOR_DELETE';
export const HIDE_CONFIRM_LOGIN_FOR_DELETE =
    'auth/HIDE_CONFIRM_LOGIN_FOR_DELETE';

const defaultState = fromJS({
    current_user: null,
    show_login_modal: false,
    synced: false,
    show_confirm_login_for_delete_modal: false,
});

export default function reducer(state = defaultState, action) {
    const payload = action.payload;

    switch (action.type) {
        case '@@router/LOCATION_CHANGE': {
            return state.merge({
                show_login_modal: loginRoute.isValidPath(
                    action.payload.pathname
                ),
                show_confirm_login_for_delete_modal: confirmForDeleteRoute.isValidPath(
                    action.payload.pathname
                ),
            });
        }

        case SHOW_LOGIN: {
            return state.merge({
                show_login_modal: true,
            });
        }

        case HIDE_LOGIN:
            return state.merge({
                show_login_modal: false,
            });

        case LOGIN:
            return state;

        case LOGOUT:
            return state.merge({
                logged_out: true,
                current_user: null,
            });

        case SET_CURRENT_USER:
            if (!payload.user) return state;
            const user = payload.user;
            return state.merge({
                current_user: Map(safe2json(user)),
            });

        case SYNC_CURRENT_USER_END:
            return state.merge({
                synced: true,
            });

        case SHOW_CONFIRM_LOGIN_FOR_DELETE: {
            return state.merge({
                show_confirm_login_for_delete_modal: true,
            });
        }

        case HIDE_CONFIRM_LOGIN_FOR_DELETE: {
            return state.merge({
                show_confirm_login_for_delete_modal: false,
            });
        }

        default:
            return state;
    }
}

export const showLogin = payload => ({
    type: SHOW_LOGIN,
    payload,
});

export const hideLogin = payload => ({
    type: HIDE_LOGIN,
    payload,
});

export const login = payload => ({
    type: LOGIN,
    payload,
});

export const setCurrentUser = payload => ({
    type: SET_CURRENT_USER,
    payload,
});

export const syncCurrentUser = payload => ({
    type: SYNC_CURRENT_USER,
    payload,
});

export const syncCurrentUserForce = payload => ({
    type: SYNC_CURRENT_USER_FORCE,
    payload,
});

export const syncCurrentUserEnd = payload => ({
    type: SYNC_CURRENT_USER_END,
    payload,
});

export const logout = payload => ({
    type: LOGOUT,
    payload,
});

export const showConfirmLoginForDeleteModal = payload => ({
    type: SHOW_CONFIRM_LOGIN_FOR_DELETE,
    payload,
});

export const hideConfirmLoginForDeleteModal = payload => ({
    type: HIDE_CONFIRM_LOGIN_FOR_DELETE,
    payload,
});

export const getCurrentUser = state => {
    const val = state.auth.get('current_user');
    return !!val ? val.toJS() : null;
};
