import { Map, List } from 'immutable';
import models from '@network/client_models';
import {
    loginRoute,
    resendConfirmationMailRoute,
    resendConfirmationCodeRoute,
    sendDeletePasswordConfirmationMailRoute,
} from '@infrastructure/RouteInitialize';
import uuidv4 from 'uuid/v4';

export const SET_ACCESS_TOKEN = 'session/SET_ACCESS_TOKEN';
export const REMOVE_ACCESS_TOKEN = 'session/REMOVE_ACCESS_TOKEN';
export const SET_CLIENT_ID = 'session/SET_CLIENT_ID';
export const REMOVE_CLIENT_ID = 'session/REMOVE_CLIENT_ID';
export const SET_COUNTRY_CODE = 'session/SET_COUNTRY_CODE';
export const SET_LOCALE = 'session/SET_LOCALE';
export const SET_TIMEZOON = 'session/SET_TIMEZOON';
export const GENERATE_ACCESS_TOKEN = 'session/GENERATE_ACCESS_TOKEN';
export const SET_IDENTITY = 'session/SET_IDENTITY';

const defaultState = Map({
    accessToken: '',
    client_id: uuidv4(),
    countryCode: 'JP',
    locale: 'ja',
    timezoon: 'Asia/Tokyo',
    identity: Map({}),
});

export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return state.set('accessToken', action.payload.accessToken);
        case REMOVE_ACCESS_TOKEN:
            return state.set('accessToken', '');
        case SET_CLIENT_ID:
            return state.set('client_id', action.payload.client_id);
        case REMOVE_CLIENT_ID:
            return state.set('client_id', '');
        case SET_IDENTITY:
            return state.set('identity', action.payload.identity);
        case SET_COUNTRY_CODE:
            return state.set('countryCode', action.payload.countryCode);
        case SET_LOCALE:
            return state.set('locale', action.payload.locale);
        case SET_TIMEZOON:
            return state.set('timezoon', action.payload.timezoon);
        default:
            return state;
    }
}

export const setAccessToken = payload => ({
    type: SET_ACCESS_TOKEN,
    payload,
});

export const removeAccessToken = payload => ({
    type: REMOVE_ACCESS_TOKEN,
    payload,
});

export const setClientId = payload => ({
    type: SET_ACCESS_TOKEN,
    payload,
});

export const removeClientId = payload => ({
    type: REMOVE_CLIENT_ID,
    payload,
});

export const setIdentity = payload => ({
    type: SET_IDENTITY,
    payload,
});

export const setCountryCode = countryCode => ({
    type: SET_COUNTRY_CODE,
    payload: { countryCode },
});

export const setLocale = locale => ({
    type: SET_LOCALE,
    payload: { locale },
});

export const setTimezoon = timezoon => ({
    type: SET_TIMEZOON,
    payload: { timezoon },
});

export const generateAccessToken = payload => ({
    type: GENERATE_ACCESS_TOKEN,
    payload,
});

export const getIdentity = state => {
    const val = state.session.get('identity');
    return !!val ? val.toJS() : null;
};
