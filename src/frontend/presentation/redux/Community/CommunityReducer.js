import { Map, OrderedMap, List, fromJS } from 'immutable';
import tt from 'counterpart';
import { browserHistory } from 'react-router';
import safe2json from '@extension/safe2json';
import { ClientError } from '@extension/Error';
import * as detection from '@network/detection';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import {
    communityShowRoute,
} from '@infrastructure/RouteInitialize';

export const SET_SHOW = 'community/SET_SHOW';
export const SET_COMMUNITY_HEADING = 'community/SET_COMMUNITY_HEADING';
export const ADD_COMMUNITY_HEADING = 'community/ADD_COMMUNITY_HEADING';
export const GET_MORE_COMMUNITY_HEADING = 'community/GET_MORE_COMMUNITY_HEADING';

export const SET_CACHES = 'community/SET_CACHES';
export const RESET_CACHES = 'community/SET_CACHES';
export const SET_DELETES = 'community/SET_DELETES';
export const RESET_DELETES = 'community/SET_DELETES';
export const SYNC_COMMUNITY = 'community/SYNC_COMMUNITY';

export const defaultState = Map({
    show_community: Map(),
    community_heading: List([]),
    caches: List([]),
    deletes: List([]),
});

export default function reducer(state = defaultState, action = {}) {
  const payload = action.payload;
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return state.merge({
                caches: List([]),
                deletes: List([]),
            });

        case SET_SHOW: {
            return state.merge({
                show_community: Map(payload.community),
                community_heading: Map(payload.community.Headings),
            });
        }

        case SET_COMMUNITY_HEADING: {
            if (!payload.headings) return state;
            return state.set(
                'community_heading',
                List(payload.headings.map(val => Map(val)))
            );
        }

        case ADD_COMMUNITY_HEADING: {
            if (!payload.headings) return state;
            let before = state.get('community_heading');
            return state.set(
                'community_heading',
                before.concat(
                    List(payload.headings.map(val => Map(val)))
                )
            );
        }

        case SET_CACHES: {
            const contents = action.payload.communities;
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
            const contents = action.payload.communities;
            if (!(contents instanceof Array)) return;
            if (contents.length == 0) return;
            let before = state.get('deletes') || List([]);
            before = before.filter(val => !contents.find(x => x.id == val.id));
            return state.set('deletes', List(contents.map(val => Map(val))));
        }

        case RESET_DELETES: {
            return state.set('deletes', List([]));
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

export const syncCommunity = payload => ({
    type: SYNC_COMMUNITY,
    payload,
});

export const setShow = payload => ({
    type: SET_SHOW,
    payload,
});

export const setCommunityHeading = payload => ({
    type: SET_COMMUNITY_HEADING,
    payload,
});

export const addCommunityHeading = payload => ({
    type: ADD_COMMUNITY_HEADING,
    payload,
});

export const getMoreCommunityHeading = payload => ({
    type: GET_MORE_COMMUNITY_HEADING,
    payload,
});

export const getDelete = (id, state) => {
    if (!id) return;
    const val = state.community.get('deletes');
    let contents = val.toJS();
    if (!(contents instanceof Array)) return;
    if (contents.length == 0) return;
    return contents.find(x => x.id == id);
};

export const getCache = (id, state) => {
    if (!id) return;
    const val = state.community.get('caches');
    let contents = val.toJS();
    if (!(contents instanceof Array)) return;
    if (contents.length == 0) return;
    return contents.find(x => x.id == id);
};

export const bind = (community, state) => {
    if (!community) return;
    if (!community.id) return community;
    if (getDelete(community.id, state)) return null;
    return getCache(community.id, state) || community;
};

export const getShowCommunity = state => {
    let val = state.community.get('show_community');
    const community = !!val ? val.toJS() : null;
    return bind(community, state);
};

export const getCommunityHeading = state => {
    const val = state.community.get('community_heading');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getCommunityHeadingLength = state => {
    const val = state.community.get('community_heading');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};
