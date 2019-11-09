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
import mail from '@network/mail';
import jwt from 'jsonwebtoken';
import tt from 'counterpart';
import prototype_data from '@locales/prototype/ja.json';

export default class AuthDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async create_by_twitter_username({ username }) {
        const profile = await TwitterHandler.getUser({
            screen_name: username,
        });

        const email = `${'twitter'.slice(0, data_config.provider_limit)}${
            profile.id
        }${profile.username}`;

        const withdrawal = await models.Withdrawal.findOne({
            where: {
                twitter_id: profile.id,
                twitter_username: profile.username,
            },
        });

        if (withdrawal)
            return {
                user: null,
                identity: null,
            };

        const user = await models.User.create({
            username: uuidv4(),
            nickname: profile.displayName,
            detail: profile._json.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile._json.profile_image_url_https
                ) || data_config.default_user_image,
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || data_config.default_user_image,
            verified: false,
            bot: false,
            isPrivate: false,
            permission: true,
            twitter_id: profile.id,
            twitter_username: profile.username,
        });

        const identity = await models.Identity.create({
            UserId: user.id,
            email,
            token: '',
            email_is_verified: false,
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
                ) || data_config.default_user_image,
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || data_config.default_user_image,
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

    async create_by_twitter_profile({ profile }) {
        const withdrawal = await models.Withdrawal.findOne({
            where: {
                twitter_id: profile.id,
                twitter_username: profile.screen_name,
            },
        });

        if (withdrawal)
            return {
                user: null,
                identity: null,
            };

        const user = await models.User.create({
            username: uuidv4(),
            nickname: profile.name,
            detail: profile.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile.profile_image_url_https
                ) || data_config.default_user_image,
            picture_large:
                TwitterHandler.fix_banner_name(profile.profile_banner_url) ||
                data_config.default_user_image,
            verified: false,
            bot: false,
            isPrivate: false,
            permission: true,
            twitter_id: profile.id,
            twitter_username: profile.screen_name,
        });

        const email = `${'twitter'.slice(0, data_config.provider_limit)}${
            profile.id
        }${profile.screen_name}`;

        const identity = await models.Identity.create({
            UserId: user.id,
            token: '',
            email,
            email_is_verified: false,
            phone_number: uuidv4(),
            phone_number_is_verified: false,
            phone_code: '',
            username: user.username,
            account_is_created: false,
            confirmation_code: '',
            password_hash: '',
            password: '',
            twitter_id: profile.id,
            twitter_username: profile.screen_name,
            verified: false,
            bot: false,
            permission: true,
        });

        return {
            user,
            identity,
        };
    }

    async update_by_twitter_profile({ user, identity, profile }) {
        user = await user.update({
            nickname: profile.name,
            detail: profile.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile.profile_image_url_https
                ) || data_config.default_user_image,
            picture_large:
                TwitterHandler.fix_banner_name(profile.profile_banner_url) ||
                data_config.default_user_image,
            twitter_id: profile.id,
        });

        identity = await identity.update({
            twitter_id: profile.id,
        });

        return {
            user,
            identity,
        };
    }

    async create_by_twitter_oauth_profile({ profile, token, tokenSecret }) {
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

        const withdrawal = await models.Withdrawal.findOne({
            where: {
                twitter_id: profile.id,
                twitter_username: profile.screen_name,
            },
        });

        if (withdrawal) {
            await models.Withdrawal.destroy({
                where: {
                    twitter_id: profile.id,
                    twitter_username: profile.screen_name,
                },
            });
        }

        const user = await models.User.create({
            username: uuidv4(),
            nickname: profile.displayName,
            detail: profile._json.description,
            picture_small:
                TwitterHandler.fix_image_name(
                    profile._json.profile_image_url_https
                ) || data_config.default_user_image,
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || data_config.default_user_image,
            verified: true,
            bot: false,
            isPrivate: false,
            permission: true,
            twitter_id: profile.id,
            twitter_username: profile.username,
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
            twitter_token: token,
            twitter_secret: tokenSecret,
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
            nickname: emojiStrip(profile.displayName),
            detail: emojiStrip(profile._json.description),
            picture_small:
                TwitterHandler.fix_image_name(
                    profile._json.profile_image_url_https
                ) || data_config.default_user_image,
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || data_config.default_user_image,
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

    async update_by_twitter_oauth_profile({
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
                ) || data_config.default_user_image,
            picture_large:
                TwitterHandler.fix_banner_name(
                    profile._json.profile_banner_url
                ) || data_config.default_user_image,
            verified: true,
            twitter_id: profile.id,
        });

        identity = await identity.update({
            twitter_id: profile.id,
            twitter_token: token,
            twitter_secret: tokenSecret,
            verified: true,
        });

        //TODO: make verified
        if (!identity.verified) {
        }

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
        let created;
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
            created = true;
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
            created = false;
        }

        return {
            identity,
            user,
            created,
        };
    }

    async find_or_create_by_twitter_profile({ profile }) {
        if (!profile) return;

        let identity;
        let created;
        let user = await models.User.findOne({
            include: [
                {
                    model: models.Identity,
                    where: {
                        twitter_username: profile.screen_name,
                    },
                },
            ],
        });

        if (!user) {
            const results = await this.create_by_twitter_profile({
                profile,
            });
            identity = results.identity;
            user = results.user;
            created = true;
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
            });
            identity = results.identity;
            user = results.user;
            created = false;
        }

        return {
            identity,
            user,
            created,
        };
    }

    async find_or_create_by_twitter_oauth_profile({
        profile,
        token,
        tokenSecret,
    }) {
        if (!profile) return;

        let identity;
        let created;
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
            const results = await this.create_by_twitter_oauth_profile({
                profile,
                token,
                tokenSecret,
            });
            identity = results.identity;
            user = results.user;
            created = true;
        } else {
            identity = await models.Identity.findOne({
                where: {
                    user_id: Number(user.id),
                },
            });
            const results = await this.update_by_twitter_oauth_profile({
                profile,
                identity,
                user,
                token,
                tokenSecret,
            });
            identity = results.identity;
            user = results.user;
            created = false;
        }

        return {
            identity,
            user,
            created,
        };
    }

    async find_or_create_by_twitter_followers({ username, user_id }) {
        if (!username) return;
        const identity = await models.Identity.findOne({
            where: {
                $or: [
                    {
                        user_id: Number(user_id) || 0,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        if (!identity) return;
        if (!identity.twitter_username) return;

        const twitter_followers = await TwitterHandler.getFollows(
            {
                count: 20,
                screen_name: identity.twitter_username,
                include_user_entities: true,
            },
            identity.token,
            identity.secret
        );

        if (!twitter_followers) return;

        let followers = await Promise.all(
            twitter_followers.users.map(profile =>
                this.find_or_create_by_twitter_profile({ profile })
            )
        ).catch(async e => {
            const users = await models.User.findAll({
                include: [
                    {
                        model: models.Follow,
                        as: 'Followers',
                        where: {
                            votered_id: identity.UserId,
                        },
                    },
                ],
                limit: 20,
            });
            return users.map(val => {
                return { user: val };
            });
        });

        followers = followers.filter(
            val => !!val && !!val.user && val.identity
        );

        await Promise.all(
            followers.map(val =>
                models.Follow.findOrCreate({
                    where: {
                        voter_id: val.user.id,
                        votered_id: identity.UserId,
                    },
                })
            )
        );

        return followers;
    }
}
