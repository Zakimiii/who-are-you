import { Map, List } from 'immutable';
import models from '@network/client_models';
import { templateIndexRoute } from '@infrastructure/RouteInitialize';
import uuidv4 from 'uuid/v4';

export const ANSWER_TEMPLATE = 'communityTemplate/ANSWER_TEMPLATE';
export const ADD_HEADING = 'communityTemplate/ADD_HEADING';
export const SET_HOME = 'communityTemplate/SET_HOME';
export const RESET_HOME = 'communityTemplate/RESET_HOME';
export const ADD_HOME = 'communityTemplate/ADD_HOME';
export const GET_MORE_HOME = 'communityTemplate/GET_MORE_HOME';
export const SYNC_TEMPLATE = 'communityTemplate/SYNC_TEMPLATE';
export const SET_CACHES = 'communityTemplate/SET_CACHES';
export const RESET_CACHES = 'communityTemplate/SET_CACHES';
export const SET_DELETES = 'communityTemplate/SET_DELETES';
export const RESET_DELETES = 'communityTemplate/SET_DELETES';
export const SHOW_NEW = 'communityTemplate/SHOW_NEW';
export const HIDE_NEW = 'communityTemplate/HIDE_NEW';
export const RESET_NEW = 'communityTemplate/RESET_NEW';
export const SET_NEW = 'communityTemplate/SET_NEW';

const defaultState = Map({
    home_template: List(),
    show_new_modal: false,
    new_template: Map(models.CommunityTemplate.build()),
    caches: List([]),
    deletes: List([]),
});

export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return state.merge({
                caches: List([]),
                deletes: List([]),
            });

        case SET_HOME: {
            if (!action.payload.templates) return state;
            if (action.payload.templates.length == 0) return state;
            return state.set(
                'home_template',
                List(
                    action.payload.templates.map(val => {
                        return Map(val);
                    })
                )
            );
        }

        case RESET_HOME: {
            return state.set('home_template', List());
        }

        case ADD_HOME: {
            if (!action.payload.templates) return state;
            if (action.payload.templates.length == 0) return state;
            let before = state.get('home_template');
            return state.set(
                'home_template',
                before.concat(
                    List(
                        action.payload.templates.map(val => {
                            return Map(val);
                        })
                    )
                )
            );
        }

        case SET_CACHES: {
            const templates = action.payload.templates;
            if (!(templates instanceof Array)) return state;
            if (templates.length == 0) return state;
            let before = state.get('caches') || List([]);
            before = before.filter(val => !templates.find(x => x.id == val.id));
            return state.set('caches', List(templates.map(val => Map(val))));
        }

        case RESET_CACHES: {
            return state.set('caches', List([]));
        }

        case SET_DELETES: {
            const templates = action.payload.templates;
            if (!(templates instanceof Array)) return state;
            if (templates.length == 0) return state;
            let before = state.get('deletes') || List([]);
            before = before.filter(val => !templates.find(x => x.id == val.id));
            return state.set('deletes', List(templates.map(val => Map(val))));
        }

        case RESET_DELETES: {
            return state.set('deletes', List([]));
        }

        case SET_NEW: {
            if (!payload.template) return state;
            return state.set('new_template', Map(action.payload.template));
        }

        case RESET_NEW: {
            return state.merge({
                new_template: Map(models.Heading.build()),
            });
        }

        case SHOW_NEW: {
            return state.merge({
                show_new_modal: true,
            });
        }

        case HIDE_NEW: {
            return state.merge({
                show_new_modal: false,
                new_template: Map(models.CommunityTemplate.build()),
            });
        }

        default:
            return state;
    }
}

export const setHome = payload => ({
    type: SET_HOME,
    payload,
});

export const resetHome = payload => ({
    type: RESET_HOME,
    payload,
});

export const addHome = payload => ({
    type: ADD_HOME,
    payload,
});

export const getMoreHome = payload => ({
    type: GET_MORE_HOME,
    payload,
});

export const syncTemplate = payload => ({
    type: SYNC_TEMPLATE,
    payload,
});

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

export const showNew = payload => ({
    type: SHOW_NEW,
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

export const answerTemplate = payload => ({
    type: ANSWER_TEMPLATE,
    payload,
});

export const addHeading = payload => ({
    type: ADD_HEADING,
    payload,
});

export const getCache = (id, state) => {
    if (!id) return;
    const val = state.communityTemplate.get('caches');
    let templates = val.toJS();
    if (!(templates instanceof Array)) return;
    if (templates.length == 0) return;
    return templates.find(x => x.id == id);
};

export const getDelete = (id, state) => {
    if (!id) return;
    const val = state.communityTemplate.get('deletes');ƒ
    let templates = val.toJS();
    if (!(templates instanceof Array)) return;
    if (templates.length == 0) return;
    return templates.find(x => x.id == id);
};

export const bind = (template, state) => {
    if (!template) return;
    if (!template.id) return template;
    if (getDelete(template.id, state)) return null;
    return getCache(template.id, state) || template;
};

export const getHomeTemplate = state => {
    const val = state.communityTemplate.get('home_template');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getHomeTemplateLength = state => {
    const val = state.communityTemplate.get('home_template');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};
