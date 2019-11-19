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
                show_community: Map(action.payload.community),
                community_heading: Map(action.payload.community.Headings),
            });
        }

        case SET_COMMUNITY_HEADING: {
            if (!payload.headings) return state;
            return state.set(
                'community_heading',
                List(action.payload.headings.map(val => Map(val)))
            );
        }

        case ADD_COMMUNITY_HEADING: {
            if (!payload.headings) return state;
            let before = state.get('community_heading');
            return state.set(
                'community_heading',
                before.concat(
                    List(action.payload.headings.map(val => Map(val)))
                )
            );
        }

        default:
            return state;
    }
}

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

export const getShowCommunity = state => {
    let val = state.community.get('show_community');
    const community = !!val ? val.toJS() : null;
    return community //bind(user, state);
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
