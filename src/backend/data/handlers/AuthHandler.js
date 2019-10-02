import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import {
    AuthDataStore,
    SessionDataStore,
    IdentityDataStore,
    UserDataStore,
} from '@datastore';
import querystring from 'querystring';
import safe2json from '@extension/safe2json';
import { ApiError } from '@extension/Error';
// import { apiAuthenticateIdentityValidates } from '@validations/auth';
import data_config from '@constants/data_config';
import uuidv4 from 'uuid/v4';
import env from '@env/env.json';

const sessionDataStore = new SessionDataStore();
const authDataStore = new AuthDataStore();
const userDataStore = new UserDataStore();

export default class AuthHandler extends HandlerImpl {
    constructor() {
        super();
    }

    // async handleTwitterAuthRequest(router, req, res, next) {
    //     const { profile } = res;

    //     const { oauth_token } = router.query;
    // }

    async handleTwitterInitializeAuth(router, req, res, next) {
        const { profile, token, tokenSecret } = res;

        if (!profile) {
            router.redirect('/login');
            return;
        }

        const { user, identity } = await authDataStore
            .find_or_create_by_twitter_profile({
                profile,
                token,
                tokenSecret,
            })
            .catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
                router.redirect('/login');
                return;
            });

        router.body = {
            identity: safe2json(identity),
            user: safe2json(user),
            success: true,
        };

        const accessToken = await sessionDataStore.setAccessToken({
            identity: identity,
            client_id: '',
            isOneTime: true,
        });

        const params = querystring.stringify({
            accessToken: accessToken,
        });

        router.redirect(`/user/${identity.username}?${params}`);
    }

    async handleTwitterAuthenticateRequest(router, req, res, next) {
        const { profile, token, tokenSecret } = res;

        const { oauth_token } = router.query;

        console.log(profile);

        if (!profile) {
            router.redirect('/login');
            return;
        }

        const { user, identity } = await authDataStore
            .find_or_create_by_twitter_profile({
                profile,
                token,
                tokenSecret,
            })
            .catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
                router.redirect('/login');
                return;
            });

        router.body = {
            identity: safe2json(identity),
            user: safe2json(user),
            success: true,
        };

        const newAccessToken = await sessionDataStore.setAccessToken({
            identity,
            client_id: '',
            isOneTime: true,
        });

        const params = querystring.stringify({
            twitter_logined: true,
            accessToken: newAccessToken,
        });

        router.body = {
            success: true,
        };

        router.redirect(`/user/${identity.username}?${params}`);
    }
}
