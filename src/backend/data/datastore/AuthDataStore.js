import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import Cookie from 'js-cookie';
import validator from 'validator';
import badDomains from '@constants/bad-domains';
import models from '@models';
import * as detection from '@network/detection';
import { ApiError } from '@extension/Error';
import { apiInitAuthValidates } from '@validations/auth';
import uuidv4 from 'uuid/v4';

export default class AuthDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async create_by_twitter_username({ username }) {}

    async find_or_create_by_twitter_username({ twitter_username }) {
        if (!twitter_username) return;

        const user = await models.User.findOne({
            include: [
                {
                    model: models.Identity,
                    where: {
                        twitter_username,
                    },
                },
            ],
        });
    }

    async initialize_twitter_auth(profile) {
        if (!profile) return;

        const user = await models.User.create({
            username: identity.username,
            nickname: profile.displayName,
            detail: profile.description,
            picture_small:
                profile.profile_image_url_https || '/icons/noimage.svg',
            picture_large:
                profile.profile_background_image_url_https ||
                '/icons/noimage.svg',
            locale: detection.getEnvLocale(),
            timezone: detection.getTimeZone(),
            verified: false,
            bot: false,
            isPrivate: false,
            permission: true,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_already_registered',
            });
        });

        if (!user)
            throw new ApiError({
                error: new Error('User cannot created'),
                tt_key: 'errors.cant_created',
                tt_params: { content: identity },
            });

        const updated_identity = await identity
            .update({
                UserId: user.id,
            })
            .catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.cant_created',
                    tt_params: { content: identity },
                });
            });

        return { identity: updated_identity, user, error: null };
    }

    // async initialize_twitter_auth(identity, profile) {
    //     if (!profile) return;

    //     const user = await models.User.create({
    //         username: identity.username,
    //         nickname: profile.displayName,
    //         detail: profile.description,
    //         picture_small:
    //             profile.profile_image_url_https || '/icons/noimage.svg',
    //         picture_large:
    //             profile.profile_background_image_url_https ||
    //             '/icons/noimage.svg',
    //         locale: detection.getEnvLocale(),
    //         timezone: detection.getTimeZone(),
    //         verified: false,
    //         bot: false,
    //         isPrivate: false,
    //         permission: true,
    //     }).catch(e => {
    //         throw new ApiError({
    //             error: e,
    //             tt_key: 'errors.is_already_registered',
    //         });
    //     });

    //     if (!user)
    //         throw new ApiError({
    //             error: new Error('User cannot created'),
    //             tt_key: 'errors.cant_created',
    //             tt_params: { content: identity },
    //         });

    //     const updated_identity = await identity
    //         .update({
    //             UserId: user.id,
    //         })
    //         .catch(e => {
    //             throw new ApiError({
    //                 error: e,
    //                 tt_key: 'errors.cant_created',
    //                 tt_params: { content: identity },
    //             });
    //         });

    //     return { identity: updated_identity, user, error: null };
    // }
}
