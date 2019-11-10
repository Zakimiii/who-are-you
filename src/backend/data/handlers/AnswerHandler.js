import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
import {
    HeadingDataStore,
    AnswerDataStore,
    NotificationDataStore,
    UserDataStore,
} from '@datastore';
import Promise from 'bluebird';
import data_config from '@constants/data_config';
import safe2json from '@extension/safe2json';
import {
    apiUpdateAnswerValidates,
    apiCreateAnswerValidates,
    apiDestroyAnswerValidates,
    apiTrashAnswerValidates,
    apiUnTrashAnswerValidates,
} from '@validations/answer';
import { ApiError } from '@extension/Error';
import TwitterHandler from '@network/twitter';

const answerDataStore = new AnswerDataStore();
const notificationDataStore = new NotificationDataStore();
const headingDataStore = new HeadingDataStore();
const userDataStore = new UserDataStore();

export default class AnswerHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async postTweet(answer) {
        if (process.env.NODE_ENV == 'development') return true;

        if (!answer) return false;

        const heading = await models.Heading.findOne({
            where: {
                id: Number(answer.HeadingId),
            },
        });

        if (!heading) return false;

        const user = await models.User.findOne({
            where: {
                id: Number(heading.UserId),
            },
        });

        if (!user) return false;

        const identity = await models.Identity.findOne({
            where: {
                user_id: Number(answer.UserId),
            },
        });

        await TwitterHandler.postTweet(
            user.twitter_username,
            `/answer/${answer.id}`,
            identity.twitter_token,
            identity.twitter_secret
        ).catch(e => {
            return false;
        });

        return true;
    }

    async handleGetRequest(router, ctx, next) {
        const { id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        let answer = await models.Answer.findOne({
            where: {
                id,
            },
            raw: true,
        });

        answer = await answerDataStore.getShowIncludes(answer);

        router.body = {
            success: true,
            answer: safe2json(answer[0]),
        };
    }

    async handleCreateRequest(router, ctx, next) {
        const { answer, limit, offset } = router.request.body;

        // await apiCreateAnswerValidates.isValid({
        //     answer,
        // });

        const result = await answerDataStore.create(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        headingDataStore.updateCount({ id: result.HeadingId });
        userDataStore.updateCountFromAnswer(result);

        notificationDataStore.onCreateAnswer(result);

        const posted = await this.postTweet(result);

        router.body = {
            success: true,
            answer: safe2json(result),
            posted,
        };
    }

    async handleUpdateRequest(router, ctx, next) {
        const { answer, limit, offset } = router.request.body;

        // await apiUpdateAnswerValidates.isValid({
        //     answer,
        // });

        const result = await answerDataStore.update(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        // headingDataStore.updateCount({ id: result.HeadingId });
        // userDataStore.updateCountFromAnswer(result);

        const posted = await this.postTweet(result);

        router.body = {
            success: true,
            answer: safe2json(result),
            posted,
        };
    }

    async handleDestroyRequest(router, ctx, next) {
        const { answer, limit, offset } = router.request.body;

        // await apiDestroyAnswerValidates.isValid({
        //     answer,
        // });

        const result = await answerDataStore.delete(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        headingDataStore.updateCount({ id: result.HeadingId });
        userDataStore.updateCountFromAnswer(answer);

        router.body = {
            success: true,
            answer: safe2json(result),
        };
    }

    async handleTrashRequest(router, ctx, next) {
        const { answer, limit, offset } = router.request.body;

        // await apiTrashAnswerValidates.isValid({
        //     answer,
        // });

        const result = await answerDataStore.trash(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            answer: safe2json(result),
        };
    }

    async handleUnTrashRequest(router, ctx, next) {
        const { answer, limit, offset } = router.request.body;

        // await apiUnTrashAnswerValidates.isValid({
        //     answer,
        // });

        const result = await answerDataStore.untrash(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            answer: safe2json(result),
        };
    }
}
