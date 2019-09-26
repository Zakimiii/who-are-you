import { Map, OrderedMap, List, fromJS } from 'immutable';
import tt from 'counterpart';
import { browserHistory } from 'react-router';
import safe2json from '@extension/safe2json';
import { ClientError } from '@extension/Error';
import * as detection from '@network/detection';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';


export const defaultState = Map({
});

export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        default:
            return state;
    }
}
