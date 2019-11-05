import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';

// Action constants
export const SET_SHOW = 'user/SET_SHOW';
export const SET_FOLLOWER = 'user/SET_FOLLOWER';
export const ADD_FOLLOWER = 'user/ADD_FOLLOWER';
export const GET_MORE_FOLLOWER = 'user/GET_MORE_FOLLOWER';
export const RESET_FOLLOWER = 'user/RESET_FOLLOWER';
export const UPDATE_USER = 'user/UPDATE_USER';
export const SYNC_USER = 'user/SYNC_USER';
export const DELETE_USER = 'user/DELETE_USER';
export const SET_USER_HEADING = 'user/SET_USER_HEADING';
export const ADD_USER_HEADING = 'user/ADD_USER_HEADING';
export const ADD_USER_HEADING_ANSWER = 'user/ADD_USER_HEADING_ANSWER';
export const GET_MORE_USER_HEADING = 'user/GET_MORE_USER_HEADING';
export const GET_MORE_USER_HEADING_ANSWER = 'user/GET_MORE_USER_HEADING_ANSWER';
export const SET_RECOMMEND = 'user/SET_RECOMMEND';
export const ADD_RECOMMEND = 'user/ADD_RECOMMEND';
export const GET_MORE_RECOMMEND = 'user/GET_MORE_RECOMMEND';
export const RESET_RECOMMEND = 'user/RESET_RECOMMEND';

export const SET_USER_POST = 'user/SET_USER_POST';
export const ADD_USER_POST = 'user/ADD_USER_POST';
export const GET_MORE_USER_POST = 'user/GET_MORE_USER_POST';

export const SET_USER_NOTIFICATION = 'user/SET_USER_NOTIFICATION';
export const ADD_USER_NOTIFICATION = 'user/ADD_USER_NOTIFICATION';
export const GET_MORE_USER_NOTIFICATION = 'user/GET_MORE_USER_NOTIFICATION';

export const SET_CACHES = 'user/SET_CACHES';
export const RESET_CACHES = 'user/SET_CACHES';
export const SET_DELETES = 'user/SET_DELETES';
export const RESET_DELETES = 'user/SET_DELETES';

const defaultState = fromJS({
    show_user: Map(),
    user_heading: List([]),
    user_post: List([]),
    user_notification: List([]),
    user_follower: List([]),
    user_recommend: List([]),
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

        case SET_FOLLOWER: {
            if (!payload.users) return state;
            return state.set(
                'user_follower',
                List(action.payload.users.map(val => Map(val)))
            );
        }

        case RESET_FOLLOWER: {
            return state.set('user_follower', List([]));
        }

        case ADD_FOLLOWER: {
            if (!payload.users) return state;
            let before = state.get('user_follower');
            return state.set(
                'user_follower',
                before.concat(List(action.payload.users.map(val => Map(val))))
            );
        }

        case SET_USER_HEADING: {
            if (!payload.headings) return state;
            return state.set(
                'user_heading',
                List(action.payload.headings.map(val => Map(val)))
            );
        }

        case ADD_USER_HEADING: {
            if (!payload.headings) return state;
            let before = state.get('user_heading');
            return state.set(
                'user_heading',
                before.concat(
                    List(action.payload.headings.map(val => Map(val)))
                )
            );
        }

        case SET_USER_POST: {
            if (!payload.headings) return state;
            return state.set(
                'user_post',
                List(action.payload.headings.map(val => Map(val)))
            );
        }

        case ADD_USER_POST: {
            if (!payload.headings) return state;
            let before = state.get('user_post');
            return state.set(
                'user_post',
                before.concat(
                    List(action.payload.headings.map(val => Map(val)))
                )
            );
        }

        case SET_USER_NOTIFICATION: {
            if (!payload.notifications) return state;
            return state.set(
                'user_notification',
                List(action.payload.notifications.map(val => Map(val)))
            );
        }

        case ADD_USER_NOTIFICATION: {
            if (!payload.notifications) return state;
            let before = state.get('user_notification');
            return state.set(
                'user_notification',
                before.concat(
                    List(action.payload.notifications.map(val => Map(val)))
                )
            );
        }

        case ADD_USER_HEADING_ANSWER: {
            if (!payload.heading || !payload.answers) return state;
            let befores = state.get('user_heading');
            befores = befores.toJS();
            let before = befores.filter(val => val.id == payload.heading.id);
            before = before[0] instanceof Map ? before[0].toJS() : before[0];
            before.Answers = before.Answers.concat(payload.answers);
            befores = befores.map(val => {
                if (val.id == payload.heading.id) {
                    val = Map(before);
                }
                return val;
            });
            return state.set('user_heading', List(befores));
        }

        case SET_RECOMMEND: {
            if (!payload.users) return state;
            return state.set(
                'user_recommend',
                List(action.payload.users.map(val => Map(val)))
            );
        }

        case RESET_RECOMMEND: {
            return state.set('user_recommend', List([]));
        }

        case ADD_RECOMMEND: {
            if (!payload.users) return state;
            let before = state.get('user_recommend');
            return state.set(
                'user_recommend',
                before.concat(List(action.payload.users.map(val => Map(val))))
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

export const setFollower = payload => ({
    type: SET_FOLLOWER,
    payload,
});

export const resetFollower = payload => ({
    type: RESET_FOLLOWER,
    payload,
});

export const addFollower = payload => ({
    type: ADD_FOLLOWER,
    payload,
});

export const getMoreFollower = payload => ({
    type: GET_MORE_FOLLOWER,
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

export const addUserHeadingAnswer = payload => ({
    type: ADD_USER_HEADING_ANSWER,
    payload,
});

export const getMoreUserHeading = payload => ({
    type: GET_MORE_USER_HEADING,
    payload,
});

export const getMoreUserHeadingAnswer = payload => ({
    type: GET_MORE_USER_HEADING_ANSWER,
    payload,
});

export const setUserPost = payload => ({
    type: SET_USER_POST,
    payload,
});

export const addUserPost = payload => ({
    type: ADD_USER_POST,
    payload,
});

export const getMoreUserPost = payload => ({
    type: GET_MORE_USER_POST,
    payload,
});

export const setUserNotification = payload => ({
    type: SET_USER_NOTIFICATION,
    payload,
});

export const addUserNotification = payload => ({
    type: ADD_USER_NOTIFICATION,
    payload,
});

export const getMoreUserNotification = payload => ({
    type: GET_MORE_USER_NOTIFICATION,
    payload,
});

export const setShow = payload => ({
    type: SET_SHOW,
    payload,
});

export const setRecommend = payload => ({
    type: SET_RECOMMEND,
    payload,
});

export const resetRecommend = payload => ({
    type: RESET_RECOMMEND,
    payload,
});

export const addRecommend = payload => ({
    type: ADD_RECOMMEND,
    payload,
});

export const getMoreRecommend = payload => ({
    type: GET_MORE_RECOMMEND,
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

export const getFollower = state => {
    const val = state.user.get('user_follower');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getFollowerLength = state => {
    const val = state.user.get('user_follower');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};

export const getRecommend = state => {
    const val = state.user.get('user_recommend');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getRecommendLength = state => {
    const val = state.user.get('user_recommend');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};

export const getUserPost = state => {
    const val = state.user.get('user_post');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getUserPostLength = state => {
    const val = state.user.get('user_post');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};

export const getUserNotification = state => {
    const val = state.user.get('user_notification');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getUserNotificationLength = state => {
    const val = state.user.get('user_notification');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};
