import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import safe2json from '@extension/safe2json';
import { apiFindUserValidates, apiSyncUserValidates } from '@validations/user';
import {
    HeadingDataStore,
    AnswerDataStore,
    AuthDataStore,
    UserDataStore,
    NotificationDataStore,
} from '@datastore';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';
import Promise from 'bluebird';
import tt from 'counterpart';

const headingDataStore = new HeadingDataStore();
const answerDataStore = new AnswerDataStore();
const authDataStore = new AuthDataStore();
const userDataStore = new UserDataStore();
const notificationDataStore = new NotificationDataStore();

export default class UserHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleGetUserRequest(router, ctx, next) {
        const { username, id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        const user = await models.User.findOne({
            where: {
                $or: [
                    {
                        id: Number(id) || 0,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        router.body = {
            success: true,
            user: safe2json(user),
        };
    }

    async handleGetUserRecommendsRequest(router, ctx, next) {
        const { username, id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        // const user = await models.User.findOne({
        //     where: {
        //         $or: [
        //             {
        //                 id: Number(id) || 0,
        //             },
        //             {
        //                 username,
        //             },
        //         ],
        //     },
        // });

        router.body = {
            success: true,
            // user: safe2json(user),
        };
    }

    async handleGetStaticUserRecommendsRequest(router, ctx, next) {
        // const { username, id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        // const user = await models.User.findOne({
        //     where: {
        //         $or: [
        //             {
        //                 id: Number(id) || 0,
        //             },
        //             {
        //                 username,
        //             },
        //         ],
        //     },
        // });

        router.body = {
            success: true,
            // user: safe2json(user),
        };
    }

    async handleGetUserTwitterNameRequest(router, ctx, next) {
        const { username, id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        const user = await models.User.findOne({
            where: {
                $or: [
                    {
                        id: Number(id) || 0,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        if (!user) {
            router.body = {
                success: true,
            };
        }

        const identity = await models.Identity.findOne({
            where: {
                user_id: user.id,
            },
        });

        router.body = {
            success: true,
            user: safe2json(user),
            twitter_username: identity.twitter_username,
        };
    }

    async handleCreateBotRequest(router, ctx, next) {
        const { username, id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        const user = await models.User.findOne({
            where: {
                $or: [
                    {
                        id: Number(id) || 0,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        const heading = await headingDataStore.createBot(user);

        router.body = {
            success: true,
            user: safe2json(user),
            heading: safe2json(heading),
        };
    }

    async handleGetUserFollowerRequest(router, ctx, next) {
        const { username, id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        const followers = await authDataStore.find_or_create_by_twitter_followers(
            {
                username,
                user_id: Number(id),
            }
        );

        router.body = {
            success: true,
            users: followers.map(follower => safe2json(follower.user)),
        };
    }

    async handleGetUserHeadingsRequest(router, ctx, next) {
        const {
            username,
            user_id,
            limit,
            offset,
            isMyAccount,
        } = router.request.body;

        if (!user_id && !username)
            throw new ApiError({
                error: new Error('user_id or username is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'user_id or username' },
            });

        const headings = await headingDataStore.getUserHeadings({
            user_id,
            username,
            offset,
            limit,
            isMyAccount,
        });

        const results = await Promise.all(
            headings.map(async heading => {
                heading.Answers = await answerDataStore.getIndexIncludes(
                    heading.Answers
                );
                return heading;
            })
        );

        router.body = {
            success: true,
            headings: results,
        };
    }

    async handleGetUserAnswersRequest(router, ctx, next) {
        const {
            username,
            user_id,
            limit,
            offset,
            isMyAccount,
        } = router.request.body;

        if (!user_id && !username)
            throw new ApiError({
                error: new Error('user_id or username is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'user_id or username' },
            });

        const answers = await answerDataStore.getUserAnswers({
            user_id,
            username,
            offset,
            limit,
            isMyAccount,
        });

        router.body = {
            success: true,
            answers,
        };
    }

    async handleGetUserPostsRequest(router, ctx, next) {
        const {
            username,
            user_id,
            limit,
            offset,
            isMyAccount,
        } = router.request.body;

        if (!user_id && !username)
            throw new ApiError({
                error: new Error('user_id or username is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'user_id or username' },
            });

        const headings1 = await headingDataStore.getUserPostHeadings({
            user_id,
            username,
            offset,
            limit,
            isMyAccount,
        });

        const headings2 = await headingDataStore.getUserPostHeadingAnswers({
            user_id,
            username,
            offset,
            limit,
            isMyAccount,
        });

        const results = headings1
            .concat(headings2)
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

        router.body = {
            success: true,
            headings: results,
        };
    }

    async handleGetUserNotificationsRequest(router, ctx, next) {
        const {
            username,
            user_id,
            limit,
            offset,
            isMyAccount,
        } = router.request.body;

        const results = await models.Notification.findAll({
            include: [
                {
                    model: models.User,
                    where: {
                        $or: [
                            {
                                id: Number(user_id) || 0,
                            },
                            {
                                username,
                            },
                        ],
                    },
                    attributes: ['id'],
                },
            ],
            order: [['created_at', 'DESC']],
            raw: true,
            offset: Number(offset || 0),
            limit: Number(limit || data_config.fetch_data_limit('L')),
        });

        router.body = {
            success: true,
            notifications: results,
        };
    }

    async handleSyncUserRequest(router, ctx, next) {
        const { user } = router.request.body;

        // await apiSyncUserValidates
        //     .isValid({
        //         user,
        //     })
        //     .catch(e => {
        //         router.body = {
        //             success: true,
        //             exist: false,
        //         };
        //         return;
        //     });

        let synced_user = await models.User.findOne({
            where: {
                id: Number(user.id),
                username: user.username,
            },
        }).catch(e => {
            router.body = {
                success: true,
                exist: false,
            };
            return;
        });

        if (!synced_user) {
            router.body = {
                success: true,
                exist: false,
            };
            return;
        }

        router.body = {
            success: true,
            user: safe2json(synced_user),
            exist: !!safe2json(synced_user),
        };
    }

    async handleSyncNotificationIdRequest(router, ctx, next) {
        const { notification_id, user } = router.request.body;

        if (!notification_id || notification_id == '') return;

        // await apiSyncUserValidates
        //     .isValid({
        //         user,
        //     })
        //     .catch(e => {
        //         router.body = {
        //             success: true,
        //             exist: false,
        //         };
        //         return;
        //     });

        let synced_user = await models.User.findOne({
            where: {
                id: Number(user.id),
                username: user.username,
            },
        }).catch(e => {
            router.body = {
                success: true,
                exist: false,
            };
            return;
        });

        if (!synced_user) {
            router.body = {
                success: true,
                exist: false,
            };
            return;
        }

        synced_user = await synced_user
            .update({
                notification_id,
            })
            .catch(e => {
                router.body = {
                    success: true,
                    exist: false,
                };
                return;
            });

        router.body = {
            success: true,
            user: safe2json(synced_user),
            exist: !!safe2json(synced_user),
        };
    }

    async handleInitializeCountsRequest(router, ctx, next) {
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

        /*
        10 of concurrency is very confortable to do tasks smoothly.
        */
        const datum = await Promise.map(
            results,
            result => userDataStore.updateCount(result),
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
}
