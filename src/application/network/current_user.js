import { Set, Map, fromJS, List } from 'immutable';
import expo from '@extension/object2json';
import Cookies from 'js-cookie';

export const tab = '\t';
export const escaper = ':::::::::';
export const save_place = 'current_user';

export const setInitialCurrentUser = store => {
    if (!!store.get(save_place)) {
        const user_hash = new Buffer(store.get(save_place), 'hex')
            .toString()
            .split(tab);
        let current_user_elements = Map({});
        user_hash.forEach(val => {
            if (val !== '') {
                let key = val.split(escaper)[0];
                let value = val.split(escaper)[1];
                switch (key) {
                    case 'id':
                        value = parseInt(value, 10);
                        break;
                    case 'verified':
                    case 'bot':
                    case 'isPrivate':
                    case 'permission':
                        value = value == 'true';
                        break;
                    default:
                        break;
                }
                current_user_elements = current_user_elements.set(key, value);
            }
        });
        return current_user_elements;
    } else if (!!Cookies.get(save_place)) {
        const user_hash = new Buffer(Cookies.get(save_place), 'hex')
            .toString()
            .split(tab);
        let current_user_elements = Map({});
        user_hash.forEach(val => {
            if (val !== '') {
                let key = val.split(escaper)[0];
                let value = val.split(escaper)[1];
                switch (key) {
                    case 'id':
                        value = parseInt(value, 10);
                        break;
                    case 'verified':
                    case 'bot':
                    case 'isPrivate':
                    case 'permission':
                        value = value == 'true';
                        break;
                    default:
                        break;
                }
                current_user_elements = current_user_elements.set(key, value);
            }
        });
        return current_user_elements;
    } else {
        return null;
    }
};

export const saveCurrentUser = (localStorage, user) => {
    localStorage.removeItem(save_place);
    Cookies.remove(save_place);
    let bufferUser = '';
    Object.keys(user).forEach(function(key, index) {
        bufferUser += `${key}${escaper}${user[`${key}`]}${tab}`;
    });
    const data = new Buffer(bufferUser).toString('hex');
    localStorage.setItem(save_place, data);
    Cookies.set(save_place, data);
};
