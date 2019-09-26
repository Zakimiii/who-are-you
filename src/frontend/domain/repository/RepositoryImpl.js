import { bindActionCreators } from 'redux';
import fetch from 'isomorphic-fetch';
import { ClientError } from '@extension/Error';
import env from '@env/env.json';

export default class RepositoryImpl {
    constructor() {}

    async apiCall(path, payload, reqType = 'POST') {
        if (!!payload.api_key || !!payload.api_password) {
            throw new ClientError({
                error: new Error('payload is invalid'),
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        payload.api_key = env.API.KEY;
        payload.api_password = env.API.PASSWORD;
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
        };
        const response = await fetch(path, reqObjs[reqType]).catch(e => {
            console.log(e);
            throw new ClientError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || contentType.indexOf('application/json') === -1) {
            throw new ClientError({
                error: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        let responseData = await response.json();
        if (responseData.error) {
            responseData.error.error = new Error(responseData.error.message);
            throw new ClientError(responseData.error);
        }
        return responseData;
    }

    async call(path, payload, reqType = 'GET') {
        const reqObjs = {
            GET: {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
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
        };
        const response = await fetch(path, reqObjs[reqType]).catch(e => {
            console.log(e);
            throw new ClientError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
        const contentType = response.headers.get('content-type');
        if (!contentType || contentType.indexOf('application/json') === -1) {
            throw new ClientError({
                error: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        let responseData = await response.json();
        if (responseData.error) {
            responseData.error.error = new Error(responseData.error.message);
            throw new ClientError(responseData.error);
        }
        return responseData;
    }
}
