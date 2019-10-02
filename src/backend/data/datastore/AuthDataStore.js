import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import Cookie from 'js-cookie';
import validator from 'validator';
import badDomains from '@constants/bad-domains';
import models from '@models';
import * as detection from '@network/detection';
import { ApiError } from '@extension/Error';
import { apiInitAuthValidates } from '@validations/auth';
import data_config from '@constants/data_config';
import uuidv4 from 'uuid/v4';
import env from '@env/env.json';
import TwitterHandler from '@network/twitter';

export default class AuthDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async create_by_twitter_username({ username }) {
        const profile = await TwitterHandler.getUser({
            screen_name: username,
        });

        const user = await models.User.create({
            username: uuidv4(),
            nickname: profile.displayName,
            detail: profile._json.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile._json.profile_image_url_https
                ) || '/icons/noimage.svg',
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || '/icons/noimage.svg',
            verified: false,
            bot: false,
            isPrivate: false,
            permission: true,
        });

        const identity = await models.Identity.create({
            UserId: user.id,
            email,
            token: '',
            email_is_verified: true,
            phone_number: uuidv4(),
            phone_number_is_verified: false,
            phone_code: '',
            username: user.username,
            account_is_created: false,
            confirmation_code: '',
            password_hash: '',
            password: '',
            twitter_id: profile.id,
            twitter_username: profile.username,
            twitter_token: '',
            twitter_secret: '',
            verified: false,
            bot: false,
            permission: true,
            mail_notification_token,
            isMailNotification,
        });

        return {
            user,
            identity,
        };
    }

    async create_by_twitter_profile({ profile }) {
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

        const user = await models.User.create({
            username: uuidv4(),
            nickname: profile.displayName,
            detail: profile._json.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile._json.profile_image_url_https
                ) || '/icons/noimage.svg',
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || '/icons/noimage.svg',
            verified: true,
            bot: false,
            isPrivate: false,
            permission: true,
        });

        const identity = await models.Identity.create({
            UserId: user.id,
            email,
            token: '',
            email_is_verified: true,
            phone_number: uuidv4(),
            phone_number_is_verified: false,
            phone_code: '',
            username: user.username,
            account_is_created: false,
            confirmation_code: '',
            password_hash: '',
            password: '',
            twitter_id: profile.id,
            twitter_username: profile.username,
            twitter_token: profile.token,
            twitter_secret: profile.tokenSecret,
            verified: true,
            bot: false,
            permission: true,
            mail_notification_token,
            isMailNotification,
        });

        return {
            user,
            identity,
        };
    }

    async update_by_twitter_username({ user, identity, username }) {
        const profile = await TwitterHandler.getUser({
            screen_name: username,
        });

        user = await user.update({
            nickname: profile.displayName,
            detail: profile._json.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile._json.profile_image_url_https
                ) || '/icons/noimage.svg',
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || '/icons/noimage.svg',
        });

        identity = await identity.update({
            email,
            mail_notification_token,
            isMailNotification,
        });

        return {
            user,
            identity,
        };
    }

    async update_by_twitter_profile({
        user,
        identity,
        profile,
        token,
        tokenSecret,
    }) {
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

        user = await user.update({
            nickname: profile.displayName,
            detail: profile._json.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile._json.profile_image_url_https
                ) || '/icons/noimage.svg',
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || '/icons/noimage.svg',
        });

        identity = await identity.update({
            twitter_id: profile.id,
            twitter_token: token,
            twitter_secret: tokenSecret,
        });

        // if (identity.email != email) {
        //     identity = await identity.update({
        //         email,
        //         mail_notification_token,
        //         isMailNotification,
        //     });
        // }

        return {
            user,
            identity,
        };
    }

    async find_or_create_by_twitter_username({ twitter_username }) {
        if (!twitter_username) return;

        let identity;
        let user = await models.User.findOne({
            include: [
                {
                    model: models.Identity,
                    where: {
                        twitter_username,
                    },
                },
            ],
        });

        if (!user) {
            const results = await this.create_by_twitter_username({
                twitter_username,
            });
            identity = results.identity;
            user = results.user;
        } else {
            identity = await models.Identity.findOne({
                where: {
                    user_id: Number(user.id),
                },
            });
            const results = await this.update_by_twitter_username({
                username: twitter_username,
                identity,
                user,
            });
            identity = results.identity;
            user = results.user;
        }

        return {
            identity,
            user,
        };
    }

    async find_or_create_by_twitter_profile({ profile, token, tokenSecret }) {
        if (!profile) return;

        let identity;
        let user = await models.User.findOne({
            include: [
                {
                    model: models.Identity,
                    where: {
                        twitter_username: profile.username,
                    },
                },
            ],
        });

        if (!user) {
            const results = await this.create_by_twitter_profile({
                profile,
                token,
                tokenSecret,
            });
            identity = results.identity;
            user = results.user;
        } else {
            identity = await models.Identity.findOne({
                where: {
                    user_id: Number(user.id),
                },
            });
            const results = await this.update_by_twitter_profile({
                profile,
                identity,
                user,
                token,
                tokenSecret,
            });
            identity = results.identity;
            user = results.user;
        }

        return {
            identity,
            user,
        };
    }
}
