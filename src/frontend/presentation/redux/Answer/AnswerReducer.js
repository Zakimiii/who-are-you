import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import models from '@network/client_models';

// Action constants
export const UPDATE_ANSWER = 'answer/UPDATE_ANSWER';
export const DELETE_ANSWER = 'answer/DELETE_ANSWER';
export const SYNC_ANSWER = 'answer/SYNC_ANSWER';
export const SET_CACHES = 'answer/SET_CACHES';
export const RESET_CACHES = 'answer/SET_CACHES';
export const SET_DELETES = 'answer/SET_DELETES';
export const RESET_DELETES = 'answer/SET_DELETES';

const defaultState = fromJS({
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

        case SET_CACHES: {
            const answers = action.payload.answers;
            if (!(answers instanceof Array)) return state;
            if (answers.length == 0) return state;
            let before = state.get('caches') || List([]);
            before = before.filter(val => !answers.find(x => x.id == val.id));
            return state.set('caches', List(answers.map(val => Map(val))));
        }

        case RESET_CACHES: {
            return state.set('caches', List([]));
        }

        case SET_DELETES: {
            const answers = action.payload.answers;
            if (!(answers instanceof Array)) return state;
            if (answers.length == 0) return state;
            let before = state.get('deletes') || List([]);
            before = before.filter(val => !answers.find(x => x.id == val.id));
            return state.set('deletes', List(answers.map(val => Map(val))));
        }

        case RESET_DELETES: {
            return state.set('deletes', List([]));
        }

        default:
            return state;
    }
}

// Action creators

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

export const createAnswer = payload => ({
    type: CREATE_ANSWER,
    payload,
});

export const syncAnswer = payload => ({
    type: SYNC_ANSWER,
    payload,
});

export const updateAnswer = payload => ({
    type: UPDATE_ANSWER,
    payload,
});

export const deleteAnswer = payload => ({
    type: DELETE_ANSWER,
    payload,
});

export const getCache = (id, state) => {
    if (!id) return;
    const val = state.answer.get('caches');
    let answers = val.toJS();
    if (!(answers instanceof Array)) return;
    if (answers.length == 0) return;
    return answers.find(x => x.id == id);
};

export const getDelete = (id, state) => {
    if (!id) return;
    const val = state.answer.get('deletes');
    let answers = val.toJS();
    if (!(answers instanceof Array)) return;
    if (answers.length == 0) return;
    return answers.find(x => x.id == id);
};

export const bind = (answer, state) => {
    if (!answer) return;
    if (!answer.id) return answer;
    if (getDelete(answer.id, state)) return null;
    return getCache(answer.id, state) || answer;
};
