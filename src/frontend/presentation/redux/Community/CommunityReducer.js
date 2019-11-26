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
import models from '@network/client_models';

export const SET_SHOW = 'community/SET_SHOW';
export const SET_COMMUNITY_HEADING = 'community/SET_COMMUNITY_HEADING';
export const ADD_COMMUNITY_HEADING = 'community/ADD_COMMUNITY_HEADING';
export const GET_MORE_COMMUNITY_HEADING = 'community/GET_MORE_COMMUNITY_HEADING';
export const SET_HOME = 'community/SET_HOME';
export const RESET_HOME = 'community/RESET_HOME';
export const ADD_HOME = 'community/ADD_HOME';
export const GET_MORE_HOME = 'community/GET_MORE_HOME';

export const FOLLOW = 'community/FOLLOW';
export const UNFOLLOW = 'community/UNFOLLOW';

export const SET_CACHES = 'community/SET_CACHES';
export const RESET_CACHES = 'community/SET_CACHES';
export const SET_DELETES = 'community/SET_DELETES';
export const RESET_DELETES = 'community/SET_DELETES';
export const SYNC_COMMUNITY = 'community/SYNC_COMMUNITY';

export const REVIEW = 'heading/REVIEW';
export const RESET_REVIEW = 'heading/RESET_REVIEW';
export const SET_REVIEW = 'heading/SET_REVIEW';

export const defaultState = Map({
    show_community: Map(),
    home_community: List(),
    community_heading: List([]),
    review_community: Map(models.Community.build()),
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

        case SET_HOME: {
            if (!action.payload.communities) return state;
            if (action.payload.communities.length == 0) return state;
            return state.set(
                'home_community',
                List(
                    action.payload.communities.map(val => {
                        return Map(val);
                    })
                )
            );
        }

        case RESET_HOME: {
            return state.set('home_community', List());
        }

        case ADD_HOME: {
            if (!action.payload.communities) return state;
            if (action.payload.communities.length == 0) return state;
            let before = state.get('home_community');
            return state.set(
                'home_community',
                before.concat(
                    List(
                        action.payload.communities.map(val => {
                            return Map(val);
                        })
                    )
                )
            );
        }

        case SET_SHOW: {
            return state.merge({
                show_community: Map(payload.community),
            });
        }

        case SET_COMMUNITY_HEADING: {
            if (!payload.headings) return state;
            return state.set(
                'community_heading',
                List(
                    Array.prototype.unique_by_id(
                        List(action.payload.headings).toJS()
                    )
                )
            );
        }

        case ADD_COMMUNITY_HEADING: {
            if (!payload.headings) return state;
            let before = state.get('community_heading');
            return state.set(
                'community_heading',
                List(
                    Array.prototype.unique_by_id(
                        before.concat(
                            List(action.payload.headings.map(val => Map(val)))
                        ).toJS()
                    )
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

        case SET_REVIEW: {
            if (!payload.community) return state;
            return state.set('review_community', Map(action.payload.community));
        }

        case RESET_REVIEW: {
            return state.merge({
                review_community: Map(models.Community.build()),
            });
        }

        default:
            return state;
    }
}

export const follow = payload => ({
    type: FOLLOW,
    payload,
});

export const unfollow = payload => ({
    type: UNFOLLOW,
    payload,
});

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

export const review = payload => ({
    type: REVIEW,
    payload,
});

export const setReview = payload => ({
    type: SET_REVIEW,
    payload,
});

export const resetReview = payload => ({
    type: RESET_REVIEW,
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

export const isFollow = (state, community) => {
    let val = state.auth.get('current_user');
    if (!val) return false;
    val = val.toJS();
    if (!community) return false;
    if (!community.Followers) return false;
    if (!(community.Followers.length > 0)) return false;
    return community.Followers.filter(follower => follower.id == val.id).length > 0;
};

export const getShowCommunity = state => {
    let val = state.community.get('show_community');
    const community = !!val ? val.toJS() : null;
    return bind(community, state);
};

export const getHomeCommunity = state => {
    const val = state.community.get('home_community');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getHomeCommunityLength = state => {
    const val = state.community.get('home_community');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
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

export const getReviewCommunity = state => {
    let val = state.community.get('review_community');
    const community = !!val ? val.toJS() : null;
    return bind(community, state);
};
