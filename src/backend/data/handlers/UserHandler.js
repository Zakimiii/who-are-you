import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import safe2json from '@extension/safe2json';
import { apiFindUserValidates, apiSyncUserValidates } from '@validations/user';
import {
    HeadingDataStore,
    AnswerDataStore,
    UserDataStore,
    NotificationDataStore,
} from '@datastore';

const headingDataStore = new HeadingDataStore();
const answerDataStore = new AnswerDataStore();
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
                        id: Number(id),
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

        router.body = {
            success: true,
            headings,
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
}