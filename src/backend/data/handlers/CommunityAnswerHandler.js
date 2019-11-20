import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import TwitterHandler from '@network/twitter';
import data_config from '@constants/data_config';
import safe2json from '@extension/safe2json';
import { ApiError } from '@extension/Error';
import {
    CommunityAnswerDataStore,
    CommunityHeadingDataStore,
    NotificationDataStore,
    CommunityDataStore,
    CommunityTemplateDataStore,
} from '@datastore';

const communityAnswerDataStore = new CommunityAnswerDataStore();
const communityHeadingDataStore = new CommunityHeadingDataStore();
const notificationDataStore = new NotificationDataStore();
const communityDataStore = new CommunityDataStore();
const communityTemplateDataStore = new CommunityTemplateDataStore();

export default class CommunityAnswerHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async postTweet(answer) {
        if (process.env.NODE_ENV == 'development') return true;

        if (!answer || !answer.UserId) return false;

        const heading = await models.CommunityHeading.findOne({
            where: {
                id: Number(answer.HeadingId),
            },
        });

        if (!heading) return false;

        const community = await models.Community.findOne({
            where: {
                id: Number(heading.CommunityId),
            },
        });

        if (!community) return false;

        const identity = await models.Identity.findOne({
            where: {
                user_id: Number(answer.UserId),
            },
        });

        await TwitterHandler.postTweetWithoutMention(
            community.body,
            `/community/answer/${answer.id}`,
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

        let answer = await models.CommunityAnswer.findOne({
            where: {
                id,
            },
            raw: true,
        });

        answer = await communityAnswerDataStore.getShowIncludes(answer);

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

        const result = await communityAnswerDataStore.create(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        communityHeadingDataStore.updateCount({ id: result.HeadingId });
        communityDataStore.updateCountFromAnswer(result);

        // notificationDataStore.onCreateAnswer(result);

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

        const result = await communityAnswerDataStore.update(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        // communityHeadingDataStore.updateCount({ id: result.HeadingId });
        // communityDataStore.updateCountFromAnswer(result);

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

        const result = await communityAnswerDataStore.delete(answer).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        communityHeadingDataStore.updateCount({ id: result.HeadingId });
        communityDataStore.updateCountFromAnswer(answer);

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

        const result = await communityAnswerDataStore.trash(answer).catch(e => {
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

        const result = await communityAnswerDataStore.untrash(answer).catch(e => {
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
