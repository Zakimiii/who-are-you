import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';

// Action constants
export const SET_SHOW = 'user/SET_SHOW';
export const UPDATE_USER = 'user/UPDATE_USER';
export const SYNC_USER = 'user/SYNC_USER';
export const DELETE_USER = 'user/DELETE_USER';
export const SET_USER_HEADING = 'user/SET_USER_HEADING';
export const ADD_USER_HEADING = 'user/ADD_USER_HEADING';
export const GET_MORE_USER_HEADING = 'user/GET_MORE_USER_HEADING';
export const SET_CACHES = 'user/SET_CACHES';
export const RESET_CACHES = 'user/SET_CACHES';
export const SET_DELETES = 'user/SET_DELETES';
export const RESET_DELETES = 'user/SET_DELETES';

const defaultState = fromJS({
    show_user: Map(),
    user_heading: List(),
    caches: List([]),
    deletes: List([]),
});

export default function reducer(state = defaultState, action) {
    const payload = action.payload;

    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return state.merge({
                caches: List([]),
                deletes: List([]),
            });

        case SET_SHOW: {
            return state.merge({
                show_user: Map(action.payload.user),
                user_heading: Map(action.payload.user.Headings),
            });
        }

        case SET_CACHES: {
            const contents = action.payload.users;
            if (!(contents instanceof Array)) return;
            if (contents.length == 0) return;
            let before = state.get('caches') || List([]);
            before = before.filter(val => !contents.find(x => x.id == val.id));
            return state.set('caches', List(contents.map(val => Map(val))));
        }

        case RESET_CACHES: {
            return state.set('caches', List([]));
        }

        case SET_DELETES: {
            const contents = action.payload.users;
            if (!(contents instanceof Array)) return;
            if (contents.length == 0) return;
            let before = state.get('deletes') || List([]);
            before = before.filter(val => !contents.find(x => x.id == val.id));
            return state.set('deletes', List(contents.map(val => Map(val))));
        }

        case RESET_DELETES: {
            return state.set('deletes', List([]));
        }

        case SET_USER_HEADING: {
            if (!payload.headings) return state;
            return state.set(
                'user_heading',
                List(
                    action.payload.headings.map(val => {
                        return Map(val);
                    })
                )
            );
        }

        case ADD_USER_HEADING: {
            if (!payload.contents) return state;
            let before = state.get('user_heading');
            return state.set(
                'user_heading',
                before.concat(
                    List(
                        action.payload.contents.map(val => {
                            return Map(val);
                        })
                    )
                )
            );
        }

        default:
            return state;
    }
}

export const setCaches = payload => ({
    type: SET_CACHES,
    payload,
});

export const resetCaches = payload => ({
    type: RESET_CACHES,
    payload,
});

export const setDeletes = payload => ({
    type: SET_DELETES,
    payload,
});

export const resetDeletes = payload => ({
    type: RESET_DELETES,
    payload,
});

export const syncUser = payload => ({
    type: SYNC_USER,
    payload,
});

export const updateUser = payload => ({
    type: UPDATE_USER,
    payload,
});

export const deleteUser = payload => ({
    type: DELETE_USER,
    payload,
});

export const setUserHeading = payload => ({
    type: SET_USER_HEADING,
    payload,
});

export const addUserHeading = payload => ({
    type: ADD_USER_HEADING,
    payload,
});

export const getMoreUserHeading = payload => ({
    type: GET_MORE_USER_HEADING,
    payload,
});

export const setShow = payload => ({
    type: SET_SHOW,
    payload,
});

export const getDelete = (id, state) => {
    if (!id) return;
    const val = state.user.get('deletes');
    let contents = val.toJS();
    if (!(contents instanceof Array)) return;
    if (contents.length == 0) return;
    return contents.find(x => x.id == id);
};

export const getCache = (id, state) => {
    if (!id) return;
    const val = state.user.get('caches');
    let contents = val.toJS();
    if (!(contents instanceof Array)) return;
    if (contents.length == 0) return;
    return contents.find(x => x.id == id);
};

export const bind = (user, state) => {
    if (!user) return;
    if (!user.id) return user;
    if (getDelete(user.id, state)) return null;
    return getCache(user.id, state) || user;
};

export const getShowUser = state => {
    let val = state.user.get('show_user');
    const user = !!val ? val.toJS() : null;
    return bind(user, state);
};

export const isMyAccount = (state, user) => {
    let val = state.auth.get('current_user');
    if (!val) return false;
    val = val.toJS();
    if (!user) return false;
    return !!user && !!val ? val.id == user.id : false;
};

export const getUserHeading = state => {
    const val = state.user.get('user_heading');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getUserHeadingLength = state => {
    const val = state.user.get('user_heading');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};
