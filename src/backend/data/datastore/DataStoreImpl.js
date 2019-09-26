import { bindActionCreators } from 'redux';
import fetch from 'isomorphic-fetch';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';

// let last_call;
const request_base = {
    method: 'post',
    mode: 'no-cors',
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
};

export default class DataStoreImpl {
    constructor() {}

    async apiCall(path, payload, reqType = 'POST') {
        const reqObjs = {
            POST: {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
            PUT: {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            GET: {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
        };
        const response = await fetch(path, reqObjs[reqType]);
        const contentType = response.headers.get('content-type');
        if (!contentType || contentType.indexOf('application/json') === -1) {
            throw new ApiError({
                erorr: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        const responseData = await response.json();
        if (responseData.error) {
            const error = new ApiError({
                erorr: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
                ...responseData.error,
            });
            throw error;
        }
        return responseData;
    }

    setUserPreferences(payload) {
        if (!process.env.BROWSER || window.$STM_ServerBusy)
            return Promise.resolve();
        const request = Object.assign({}, request_base, {
            body: JSON.stringify({ csrf: window.$STM_csrf, payload }),
        });
        return fetch('/api/v1/setUserPreferences', request);
    }
}
