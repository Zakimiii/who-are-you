import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import models from '@network/client_models';
import { headingNewRoute } from '@infrastructure/RouteInitialize';

// Action constants
export const CREATE_HEADING = 'answer/CREATE_HEADING';
export const UPDATE_HEADING = 'heading/UPDATE_HEADING';
export const DELETE_HEADING = 'heading/DELETE_HEADING';
export const SYNC_HEADING = 'heading/SYNC_HEADING';
export const SET_CACHES = 'heading/SET_CACHES';
export const RESET_CACHES = 'heading/SET_CACHES';
export const SET_DELETES = 'heading/SET_DELETES';
export const RESET_DELETES = 'heading/SET_DELETES';
export const SHOW_NEW = 'heading/SHOW_NEW';
export const SHOW_EDIT = 'heading/SHOW_EDIT';
export const HIDE_NEW = 'heading/HIDE_NEW';
export const RESET_NEW = 'heading/RESET_NEW';
export const SET_NEW = 'heading/SET_NEW';

const defaultState = fromJS({
    caches: List([]),
    deletes: List([]),
    show_new_modal: false,
    new_heading: Map(models.Heading.build()),
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
            if (!payload.headings) return state;
            return state.set('new_heading', Map(action.payload.headings));
        }

        case RESET_NEW: {
            return state.merge({
                new_heading: Map(models.Heading.build()),
            });
        }

        case SHOW_EDIT:
            if (!payload.heading) return state;
            return state.merge({
                new_heading: payload.heading,
                show_new_modal: true,
            });

        case HIDE_NEW: {
            return state.merge({
                show_new_modal: false,
                new_heading: Map(models.Heading.build()),
            });
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

export const updateHeading = payload => ({
    type: UPDATE_HEADING,
    payload,
});

export const deleteHeading = payload => ({
    type: DELETE_HEADING,
    payload,
});

export const getCache = (id, state) => {
    if (!id) return;
    const val = state.heading.get('caches');
    let headings = val.toJS();
    if (!(headings instanceof Array)) return;
    if (headings.length == 0) return;
    return headings.find(x => x.id == id);
};

export const getDelete = (id, state) => {
    if (!id) return;
    const val = state.heading.get('deletes');
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
