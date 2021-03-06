import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import models from '@network/client_models';
import {
    communityAnswerNewRoute,
    communityAnswerShowRoute,
} from '@infrastructure/RouteInitialize';
import safe2json from '@extension/safe2json';
import TwitterHandler from '@network/twitter';
import { open } from '@network/window';

// Action constants
export const CREATE_ANSWER = 'communityAnswer/CREATE_ANSWER';
export const CREATED_ANSWER = 'communityAnswer/CREATED_ANSWER';
export const UPDATE_ANSWER = 'communityAnswer/UPDATE_ANSWER';
export const DELETE_ANSWER = 'communityAnswer/DELETE_ANSWER';
export const TRASH_ANSWER = 'communityAnswer/TRASH_ANSWER';
export const UNTRASH_ANSWER = 'communityAnswer/UNTRASH_ANSWER';
export const SYNC_ANSWER = 'communityAnswer/SYNC_ANSWER';
export const SET_CACHES = 'communityAnswer/SET_CACHES';
export const RESET_CACHES = 'communityAnswer/SET_CACHES';
export const SET_DELETES = 'communityAnswer/SET_DELETES';
export const RESET_DELETES = 'communityAnswer/SET_DELETES';
export const SHOW_NEW = 'communityAnswer/SHOW_NEW';
export const SHOW_EDIT = 'communityAnswer/SHOW_EDIT';
export const HIDE_NEW = 'communityAnswer/HIDE_NEW';
export const RESET_NEW = 'communityAnswer/RESET_NEW';
export const SET_NEW = 'communityAnswer/SET_NEW';
export const SCREEN_SHOT = 'communityAnswer/SCREEN_SHOT';
export const FINISH_SCREEN_SHOT = 'communityAnswer/FINISH_SCREEN_SHOT';
export const RESET_SHOW = 'communityAnswer/RESET_SHOW';
export const SET_SHOW = 'communityAnswer/SET_SHOW';

const defaultState = fromJS({
    caches: List([]),
    deletes: List([]),
    show_new_modal: false,
    new_answer: Map(models.CommunityAnswer.build()),
    show_answer: Map(models.CommunityAnswer.build()),
    show_screen_shot: false,
    screen_shot: null,
    screen_shot_answer: Map(models.CommunityAnswer.build()),
});

export default function reducer(state = defaultState, action) {
    const payload = action.payload;
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return state.merge({
                show_new_modal: communityAnswerNewRoute.isValidPath(
                    action.payload.pathname
                ),
                caches: List([]),
                deletes: List([]),
                show_screen_shot: false,
                screen_shot: null,
                screen_shot_answer: Map(models.CommunityAnswer.build()),
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

        case SET_NEW: {
            if (!payload.answer) return state;
            return state.set('new_answer', Map(action.payload.answer));
        }

        case RESET_NEW: {
            return state.merge({
                new_answer: Map(models.Answer.build()),
            });
        }

        case SHOW_EDIT:
            if (!payload.answer) return state;
            return state.merge({
                new_answer: Map(payload.answer),
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
                new_answer: Map(models.Answer.build()),
            });
        }

        case SCREEN_SHOT: {
            return state.merge({
                show_screen_shot: true,
                screen_shot_answer: Map(payload.answer),
            });
        }

        case FINISH_SCREEN_SHOT: {
            return state.merge({
                screen_shot: payload.screen_shot,
                show_screen_shot: false,
                screen_shot_answer: Map(models.Answer.build()),
            });
        }

        case SET_SHOW: {
            if (!payload.answer) return state;
            return state.set('show_answer', Map(action.payload.answer));
        }

        case RESET_SHOW: {
            return state.merge({
                show_answer: Map(models.Answer.build()),
            });
        }

        case CREATED_ANSWER: {
            const { answer, text } = payload;
            if (!answer || !text) return state;
            if (!answer.id) return state;
            window.location.replace(
                TwitterHandler.getShareWithoutMentionUrl({
                    text,
                    pathname: communityAnswerShowRoute.getPath({
                        params: {
                            id: answer.id,
                        },
                    }),
                })
            );
            // window.open(
            //     TwitterHandler.getShareUrl({
            //         text: answer.body,
            //         pathname: communityAnswerShowRoute.getPath({
            //             params: {
            //                 id: answer.id,
            //             }
            //         }),
            //     })
            // );
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

export const createAnswer = payload => ({
    type: CREATE_ANSWER,
    payload,
});

export const createdAnswer = payload => ({
    type: CREATED_ANSWER,
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

export const trashAnswer = payload => ({
    type: TRASH_ANSWER,
    payload,
});

export const untrashAnswer = payload => ({
    type: UNTRASH_ANSWER,
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

export const getCache = (id, state) => {
    if (!id) return;
    const val = state.communityAnswer.get('caches');
    let answers = val.toJS();
    if (!(answers instanceof Array)) return;
    if (answers.length == 0) return;
    return answers.find(x => x.id == id);
};

export const getDelete = (id, state) => {
    if (!id) return;
    const val = state.communityAnswer.get('deletes');
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

export const getNewAnswer = state => {
    let val = state.communityAnswer.get('new_answer');
    const answer = !!val ? val.toJS() : null;
    return bind(answer, state);
};

export const getScreenShotAnswer = state => {
    let val = state.communityAnswer.get('screen_shot_answer');
    const answer = !!val ? val.toJS() : null;
    return answer;
};

export const getScreenShot = state => {
    let val = state.communityAnswer.get('screen_shot');
    return val;
};

export const getShowAnswer = state => {
    let val = state.communityAnswer.get('show_answer');
    const answer = !!val ? val.toJS() : null;
    return bind(answer, state);
};
