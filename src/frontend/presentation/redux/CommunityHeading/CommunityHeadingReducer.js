import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import models from '@network/client_models';
import {
    headingNewRoute,
    headingShowRoute,
} from '@infrastructure/RouteInitialize';
import TwitterHandler from '@network/twitter';
import { open } from '@network/window';

// Action constants
export const CREATE_HEADING = 'communityHeading/CREATE_HEADING';
export const CREATED_HEADING = 'communityHeading/CREATED_HEADING';
export const UPDATE_HEADING = 'communityHeading/UPDATE_HEADING';
export const DELETE_HEADING = 'communityHeading/DELETE_HEADING';
export const TRASH_HEADING = 'communityHeading/TRASH_HEADING';
export const UNTRASH_HEADING = 'communityHeading/UNTRASH_HEADING';
export const SYNC_HEADING = 'communityHeading/SYNC_HEADING';
export const SET_CACHES = 'communityHeading/SET_CACHES';
export const RESET_CACHES = 'communityHeading/SET_CACHES';
export const SET_DELETES = 'communityHeading/SET_DELETES';
export const RESET_DELETES = 'communityHeading/SET_DELETES';
export const SHOW_NEW = 'communityHeading/SHOW_NEW';
export const SHOW_EDIT = 'communityHeading/SHOW_EDIT';
export const HIDE_NEW = 'communityHeading/HIDE_NEW';
export const RESET_NEW = 'communityHeading/RESET_NEW';
export const SET_NEW = 'communityHeading/SET_NEW';
export const RESET_SHOW = 'communityHeading/RESET_SHOW';
export const SET_SHOW = 'communityHeading/SET_SHOW';
export const SCREEN_SHOT = 'communityHeading/SCREEN_SHOT';
export const FINISH_SCREEN_SHOT = 'communityHeading/FINISH_SCREEN_SHOT';
export const SET_HEADING_ANSWER = 'communityHeading/SET_HEADING_ANSWER';
export const ADD_HEADING_ANSWER = 'communityHeading/ADD_HEADING_ANSWER';
export const GET_MORE_HEADING_ANSWER = 'communityHeading/GET_MORE_HEADING_ANSWER';

const defaultState = fromJS({
    caches: List([]),
    deletes: List([]),
    show_new_modal: false,
    new_heading: Map(models.CommunityHeading.build()),
    show_heading: Map(models.CommunityHeading.build()),
    heading_answer: List(),
    show_screen_shot: false,
    screen_shot: null,
    screen_shot_heading: Map(models.CommunityHeading.build()),
});

export default function reducer(state = defaultState, action) {
    const payload = action.payload;
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return state.merge({
                show_new_modal: headingNewRoute.isValidPath(
                    action.payload.pathname
                ),
                caches: List([]),
                deletes: List([]),
                show_screen_shot: false,
                screen_shot: null,
                screen_shot_heading: Map(models.CommunityHeading.build()),
            });

        case SET_CACHES: {
            const headings = action.payload.headings;
            if (!(headings instanceof Array)) return state;
            if (headings.length == 0) return state;
            let before = state.get('caches') || List([]);
            before = before.filter(val => !headings.find(x => x.id == val.id));
            return state.set('caches', List(headings.map(val => Map(val))));
        }

        case RESET_CACHES: {
            return state.set('caches', List([]));
        }

        case SET_DELETES: {
            const headings = action.payload.headings;
            if (!(headings instanceof Array)) return state;
            if (headings.length == 0) return state;
            let before = state.get('deletes') || List([]);
            before = before.filter(val => !headings.find(x => x.id == val.id));
            return state.set('deletes', List(headings.map(val => Map(val))));
        }

        case RESET_DELETES: {
            return state.set('deletes', List([]));
        }

        case SET_NEW: {
            if (!payload.heading) return state;
            return state.set('new_heading', Map(action.payload.heading));
        }

        case RESET_NEW: {
            return state.merge({
                new_heading: Map(models.CommunityHeading.build()),
            });
        }

        case SET_SHOW: {
            if (!payload.heading) return state;
            return state.set('show_heading', Map(action.payload.heading));
        }

        case RESET_SHOW: {
            return state.merge({
                show_heading: Map(models.CommunityHeading.build()),
            });
        }

        case SHOW_EDIT:
            if (!payload.heading) return state;
            return state.merge({
                new_heading: Map(payload.heading),
                show_new_modal: true,
            });

        case SHOW_NEW: {
            return state.merge({
                show_new_modal: true,
            });
        }

        case HIDE_NEW: {
            return state.merge({
                show_new_modal: false,
                new_heading: Map(models.CommunityHeading.build()),
            });
        }

        case SCREEN_SHOT: {
            return state.merge({
                show_screen_shot: true,
                screen_shot_heading: Map(payload.heading),
            });
        }

        case FINISH_SCREEN_SHOT: {
            return state.merge({
                screen_shot: payload.screen_shot,
                show_screen_shot: false,
                screen_shot_heading: Map(models.CommunityHeading.build()),
            });
        }

        case SET_HEADING_ANSWER: {
            if (!payload.answers) return state;
            return state.set(
                'heading_answer',
                List(action.payload.answers.map(val => Map(val)))
            );
        }
        case ADD_HEADING_ANSWER: {
            if (!payload.answers) return state;
            let before = state.get('heading_answer');
            return state.set(
                'heading_answer',
                before.concat(
                    List(action.payload.headings.map(val => Map(val)))
                )
            );
        }

        case CREATED_HEADING: {
            const { heading, twitter_username } = payload;
            if (!heading || !twitter_username) return state;
            if (!heading.id) return state;
            window.location.replace(
                TwitterHandler.getShareUrl({
                    id: twitter_username,
                    text: heading.body,
                    pathname: headingShowRoute.getPath({
                        params: {
                            id: heading.id,
                        },
                    }),
                })
            );
            return state;
        }

        default:
            return state;
    }
}

// Action creators

export const showNew = payload => ({
    type: SHOW_NEW,
    payload,
});

export const showEdit = payload => ({
    type: SHOW_EDIT,
    payload,
});

export const hideNew = payload => ({
    type: HIDE_NEW,
    payload,
});

export const setNew = payload => ({
    type: SET_NEW,
    payload,
});

export const resetNew = payload => ({
    type: RESET_NEW,
    payload,
});

export const setShow = payload => ({
    type: SET_SHOW,
    payload,
});

export const resetShow = payload => ({
    type: RESET_SHOW,
    payload,
});

export const setCaches = payload => ({
    type: SET_CACHES,
    payload,
});

export const resetCaches = payload => ({
    type: RESET_DELETES,
    payload,
});

export const setDeletes = payload => ({
    type: SET_CACHES,
    payload,
});

export const resetDeletes = payload => ({
    type: RESET_DELETES,
    payload,
});

export const createHeading = payload => ({
    type: CREATE_HEADING,
    payload,
});

export const syncHeading = payload => ({
    type: SYNC_HEADING,
    payload,
});

export const createdHeading = payload => ({
    type: CREATED_HEADING,
    payload,
});

export const updateHeading = payload => ({
    type: UPDATE_HEADING,
    payload,
});

export const deleteHeading = payload => ({
    type: DELETE_HEADING,
    payload,
});

export const trashHeading = payload => ({
    type: TRASH_HEADING,
    payload,
});

export const untrashHeading = payload => ({
    type: UNTRASH_HEADING,
    payload,
});

export const screenShot = payload => ({
    type: SCREEN_SHOT,
    payload,
});

export const finishScreenShot = payload => ({
    type: FINISH_SCREEN_SHOT,
    payload,
});

export const setHeadingAnswer = payload => ({
    type: SET_HEADING_ANSWER,
    payload,
});

export const addHeadingAnswer = payload => ({
    type: ADD_HEADING_ANSWER,
    payload,
});

export const getMoreHeadingAnswer = payload => ({
    type: GET_MORE_HEADING_ANSWER,
    payload,
});

export const getCache = (id, state) => {
    if (!id) return;
    const val = state.communityHeading.get('caches');
    let headings = val.toJS();
    if (!(headings instanceof Array)) return;
    if (headings.length == 0) return;
    return headings.find(x => x.id == id);
};

export const getDelete = (id, state) => {
    if (!id) return;
    const val = state.communityHeading.get('deletes');
    let headings = val.toJS();
    if (!(headings instanceof Array)) return;
    if (headings.length == 0) return;
    return headings.find(x => x.id == id);
};

export const bind = (heading, state) => {
    if (!heading) return;
    if (!heading.id) return heading;
    if (getDelete(heading.id, state)) return null;
    return getCache(heading.id, state) || heading;
};

export const getNewHeading = state => {
    let val = state.communityHeading.get('new_heading');
    const heading = !!val ? val.toJS() : null;
    return bind(heading, state);
};

export const getScreenShotHeading = state => {
    let val = state.communityHeading.get('screen_shot_heading');
    const heading = !!val ? val.toJS() : null;
    return heading;
};

export const getScreenShot = state => {
    let val = state.communityHeading.get('screen_shot');
    return val;
};

export const getShowHeading = state => {
    let val = state.communityHeading.get('show_heading');
    const heading = !!val ? val.toJS() : null;
    return bind(heading, state);
};

export const getHeadingAnswer = state => {
    const val = state.communityHeading.get('heading_answer');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getHeadingAnswerLength = state => {
    const val = state.communityHeading.get('heading_answer');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};
