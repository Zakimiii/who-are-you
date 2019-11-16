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
import Promise from 'bluebird';
import LineHandler from '@network/line';

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
            .find_or_create_by_twitter_oauth_profile({
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

        if (!profile) {
            router.redirect('/login');
            return;
        }

        const { user, identity } = await authDataStore
            .find_or_create_by_twitter_oauth_profile({
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

    async handleInitializeTwitterDataRequest(router, ctx, next) {
        // if (process.env.NODE_ENV != 'development') {
        //     router.body = JSON.stringify({ status: 'ok' });
        //     router.redirect('/');
        // }

        const { from_id, to_id } = router.query;

        const id_range =
            from_id && to_id
                ? {
                      id: {
                          $between: [
                              parseInt(from_id, 10),
                              parseInt(to_id, 10),
                          ],
                      },
                  }
                : null;

        const results = await models.User.findAll({
            where: id_range,
        });

        if (!results)
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });

        const identities = await Promise.all(
            results.map(result =>
                models.Identity.findOne({
                    where: {
                        user_id: result.id,
                    },
                })
            )
        );

        /*
        10 of concurrency is very confortable to do tasks smoothly.
        */
        const datum = await Promise.map(
            results,
            (result, i) =>
                identities[i] &&
                result.update({
                    twitter_username: identities[i].twitter_username,
                    twitter_id: identities[i].twitter_id,
                }),
            { concurrency: 10 }
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            users: datum.map(data => safe2json(data)),
            success: true,
        };
    }

    async handleTwitterUserDeleteAuthenticateRequest(router, req, res, next) {
        const { profile } = res;

        const { oauth_token } = router.query;

        if (!profile) {
            router.redirect('/login');
            return;
        }

        const identity = await models.Identity.findOne({
            where: {
                twitter_id: profile.id,
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_registered',
            });
        });

        if (!identity)
            throw new ApiError({
                error: new Error('is_not_registered'),
                tt_key: 'errors.is_not_registered',
            });

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

        router.redirect(`/user/delete/confirm?${params}`);
    }

    async handleTwitterLineLinkAuthenticateRequest(router, req, res, next) {
        const { profile } = res;
        const { oauth_token } = router.query;
        const { linkToken } = router.params;

        if (!profile) {
            router.redirect('/login');
            return;
        }

        //TODO: set linkToken in identity
        const identity = await models.Identity.findOne({
            where: {
                twitter_id: profile.id,
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_registered',
            });
        });

        if (!identity)
            throw new ApiError({
                error: new Error('is_not_registered'),
                tt_key: 'errors.is_not_registered',
            });

        const url = await LineHandler.redirectEndPointLinkUrl(linkToken);

        router.redirect(url);

        router.body = {
            success: true,
        };
    }
}
