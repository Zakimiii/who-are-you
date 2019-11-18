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

// export const HIDE_ALL_MODAL = 'category/HIDE_ALL_MODAL';

export const defaultState = Map({
});

export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {

        default:
            return state;
    }
}

// export const hideAllModal = payload => ({
//     type: HIDE_ALL_MODAL,
//     payload,
// });
