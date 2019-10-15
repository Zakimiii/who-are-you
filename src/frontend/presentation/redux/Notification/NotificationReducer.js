import { fromJS, Map, List } from 'immutable';
import { DEFAULT_LANGUAGE } from '@infrastructure/client_config';
import { browserHistory } from 'react-router';
import { loginRoute } from '@infrastructure/RouteInitialize';
import safe2json from '@extension/safe2json';

// Action constants
export const CHECK_NOTIFICATION = 'notification/CHECK_NOTIFICATION';

const defaultState = fromJS({});

export default function reducer(state = defaultState, action) {
    const payload = action.payload;

    switch (action.type) {
        default:
            return state;
    }
}

export const checkNotification = payload => ({
    type: CHECK_NOTIFICATION,
    payload,
});
