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
                    case 'vector':
                    case 'post_vector':
                    case 'follow_vector':
                    case 'follower_vector':
                    case 'upvote_vector':
                    case 'request_post_vector':
                    case 'request_upvote_vector':
                    case 'label_stock_vector':
                    case 'view_vector':
                        // value = expo.ifStringParseJSON(value);
                        value = value.split(',').map(v => parseFloat(v));
                        break;
                    case 'id':
                        value = parseInt(value, 10);
                        break;
                    case 'pure_score':
                    case 'score':
                    case 'pure_score':
                    case 'token_balance':
                        value = parseFloat(value);
                        break;
                    case 'verified':
                    case 'bot':
                    case 'isPrivate':
                    case 'permission':
                        value = value == 'true';
                        break;
                    case 'vector':
                        value = JSON.parse(value);
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
                    case 'vector':
                    case 'post_vector':
                    case 'follow_vector':
                    case 'follower_vector':
                    case 'upvote_vector':
                    case 'request_post_vector':
                    case 'request_upvote_vector':
                    case 'label_stock_vector':
                    case 'view_vector':
                        // value = expo.ifStringParseJSON(value);
                        value = value.split(',').map(v => parseFloat(v));
                        break;
                    case 'id':
                        value = parseInt(value, 10);
                        break;
                    case 'pure_score':
                    case 'score':
                    case 'pure_score':
                    case 'token_balance':
                        value = parseFloat(value);
                        break;
                    case 'verified':
                    case 'bot':
                    case 'isPrivate':
                    case 'permission':
                        value = value == 'true';
                        break;
                    case 'vector':
                        value = JSON.parse(value);
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
