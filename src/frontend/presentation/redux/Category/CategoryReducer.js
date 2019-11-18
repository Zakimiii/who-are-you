import { Map, OrderedMap, List, fromJS } from 'immutable';
import tt from 'counterpart';
import { browserHistory } from 'react-router';
import safe2json from '@extension/safe2json';
import { ClientError } from '@extension/Error';
import * as detection from '@network/detection';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import {
    userShowRoute,
} from '@infrastructure/RouteInitialize';
import models from '@network/client_models';

export const SET_HOME = 'category/SET_HOME';
export const RESET_HOME = 'category/RESET_HOME';
export const ADD_HOME = 'category/ADD_HOME';
export const GET_MORE_HOME = 'category/GET_MORE_HOME';

export const defaultState = Map({
    home_category: List(),
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
            if (!action.payload.categories) return state;
            if (action.payload.categories.length == 0) return state;
            return state.set(
                'home_category',
                List(
                    action.payload.categories.map(val => {
                        return Map(val);
                    })
                )
            );
        }

        case RESET_HOME: {
            return state.set('home_category', List());
        }

        case ADD_HOME: {
            if (!action.payload.categories) return state;
            if (action.payload.categories.length == 0) return state;
            let before = state.get('home_category');
            return state.set(
                'home_category',
                before.concat(
                    List(
                        action.payload.categories.map(val => {
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

export const getHomeCategory = state => {
    const val = state.category.get('home_category');
    if (!val) return [];
    const contents = val.toJS();
    return contents;
};

export const getHomeCategoryLength = state => {
    const val = state.category.get('home_category');
    if (!val) return 0;
    let home_models = val.toJS();
    if (!home_models) return 0;
    return home_models.length;
};

