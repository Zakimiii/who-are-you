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

    async handleTwitterInitializeAuth(router, req, res, next) {
        const { profile } = res;

        let email;
        let mail_notification_token;
        let isMailNotification = false;
        if (profile.emails) {
            if (profile.emails.length > 0) {
                email = profile.emails[0].value;
                mail_notification_token = await jwt.sign(
                    {
                        type: 'mail_notification',
                        email: profile.emails[0].value,
                    },
                    env.JWT_SECRET
                );
                isMailNotification = true;
            } else {
                email = `${profile.provider.slice(
                    0,
                    data_config.provider_limit
                )}${profile.id}${profile.username}`;
            }
        } else {
            email = `${profile.provider.slice(0, data_config.provider_limit)}${
                profile.id
            }${profile.username}`;
        }

        const identity = await models.Identity.create({
            email,
            token: '',
            email_is_verified: true,
            last_attempt_verify_email: new Date(),
            phone_number: uuidv4(),
            phone_number_is_verified: false,
            last_attempt_verify_phone_number: new Date(),
            phone_code_attempts: 0,
            phone_code: '',
            username: uuidv4(),
            permission: true,
            account_is_created: false,
            confirmation_code: '',
            username_booked_at: new Date(),
            password_hash: '',
            password: '',
            twitter_id: profile.id,
            verified: false,
            bot: false,
            permission: true,
            mail_notification_token,
            isMailNotification,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_already_registered',
            });
            router.redirect('/signup');
        });

        const val = await authDataStore
            .initialize_twitter_auth(identity, profile)
            .catch(e => {
                router.redirect('/login');
                throw e;
            });

        if (val.error) {
            router.body = { success: false, error: val.error };
            router.redirect('/login');
            return;
        }

        router.body = {
            identity: safe2json(val.identity),
            user: safe2json(val.user),
            account: safe2json(val.account),
            success: true,
        };

        const accessToken = await sessionDataStore.setAccessToken({
            identity: val.identity,
            client_id: '',
            isOneTime: true,
        });

        const params = querystring.stringify({
            accessToken: accessToken,
        });

        // router.redirect(`/user/${identity.username}?${params}`);
    }

    async handleTwitterAuthenticateRequest(router, req, res, next) {
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
        }).catch(async e => {
            await this.handleTwitterInitializeAuth(router, req, res, next);
            await this.handleTwitterAuthenticateRequest(router, req, res, next);
            return;
        });

        if (!identity) {
            await this.handleTwitterInitializeAuth(router, req, res, next);
            await this.handleTwitterAuthenticateRequest(router, req, res, next);
            return;
        }

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
