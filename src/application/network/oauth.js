import uuidv4 from 'uuid/v4';
import { Set, Map, fromJS, List } from 'immutable';
import expo from '@extension/object2json';
import Cookies from 'js-cookie';

export const client_save_place = 'client_id';
export const token_save_place = 'access_token';

export const generateClientId = localStorage => {
    let client_id =
        localStorage.getItem(client_save_place) ||
        Cookies.get(client_save_place);
    if (!client_id || client_id == '') {
        client_id = uuidv4();
        const data = new Buffer(client_id).toString('hex');
        localStorage.setItem(client_save_place, data);
        Cookies.set(client_save_place, data);
    }
    return client_id;
};

export const overrideClientId = (localStorage, client_id) => {
    const data = new Buffer(client_id).toString('hex');
    localStorage.setItem(client_save_place, data);
    Cookies.set(client_save_place, data);
};

export const getClientId = localStorage => {
    const raw =
        localStorage.getItem(client_save_place) ||
        Cookies.get(client_save_place);
    if (raw == undefined || raw == null) {
        const client_id = generateClientId(localStorage);
        return client_id;
    }
    return new Buffer(raw, 'hex').toString();
};

export const getAccessToken = localStorage => {
    const raw =
        localStorage.getItem(token_save_place) || Cookies.get(token_save_place);
    if (raw == undefined || raw == null) return;
    return new Buffer(raw, 'hex').toString();
};

export const saveAccessToken = (localStorage, access_token) => {
    if (!access_token) return;
    const data = new Buffer(access_token).toString('hex');
    if (!data) return;
    localStorage.removeItem(token_save_place);
    Cookies.remove(token_save_place);
    localStorage.setItem(token_save_place, data);
    Cookies.set(token_save_place, data);
};

export const removeAccessToken = localStorage => {
    localStorage.removeItem(token_save_place);
    Cookies.remove(token_save_place);
};

module.exports = {
    generateClientId,
    getClientId,
    overrideClientId,
    getAccessToken,
    saveAccessToken,
    removeAccessToken,
};
