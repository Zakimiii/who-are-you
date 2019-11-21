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
    CategoryDataStore,
    CommunityTemplateDataStore,
} from '@datastore';

const communityAnswerDataStore = new CommunityAnswerDataStore();
const communityHeadingDataStore = new CommunityHeadingDataStore();
const notificationDataStore = new NotificationDataStore();
const communityDataStore = new CommunityDataStore();
const communityTemplateDataStore = new CommunityTemplateDataStore();
const categoryDataStore = new CategoryDataStore();

export default class CommunityHeadingHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async postTweet(heading) {
        if (process.env.NODE_ENV == 'development') return true;
        if (!heading || !heading.VoterId) return false;

        const community = await models.Community.findOne({
            where: {
                id: Number(heading.CommunityId),
            },
        });

        if (!community) return false;

        const identity = await models.Identity.findOne({
            where: {
                user_id: Number(heading.VoterId),
            },
        });

        await TwitterHandler.postTweetWithoutMention(
            community.body,
            `/communities/heading/${heading.id}`,
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

        let heading = await models.CommunityHeading.findOne({
            where: {
                id,
            },
            raw: true,
        });

        heading = await communityHeadingDataStore.getShowIncludes(heading);

        router.body = {
            success: true,
            heading: safe2json(heading[0]),
        };
    }

    async handleCreateRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiCreateHeadingValidates.isValid({
        //     heading,
        // });

        const result = await communityHeadingDataStore.create(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        // notificationDataStore.onCreateHeading(result);
        communityDataStore.updateCount({ id: result.CommunityId });
        categoryDataStore.updateCountFromHeading({ id: result.id });
        communityTemplateDataStore.find_or_create_from_heading(result);


        const posted = await this.postTweet(result);

        router.body = {
            success: true,
            heading: safe2json(result),
            posted,
        };
    }

    async handleUpdateRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiUpdateHeadingValidates.isValid({
        //     heading,
        // });

        const result = await communityHeadingDataStore.update(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        // communityDataStore.updateCount({ id: result.CommunityId });
        // categoryDataStore.updateCountFromHeading({ id: result.id });
        communityTemplateDataStore.find_or_create_from_heading(result);

        const posted = await this.postTweet(result);

        router.body = {
            success: true,
            heading: safe2json(result),
            posted,
        };
    }

    async handleDestroyRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiDestroyHeadingValidates.isValid({
        //     heading,
        // });

        const result = await communityHeadingDataStore.delete(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        communityDataStore.updateCount({ id: heading.CommunityId });
        categoryDataStore.updateCountFromHeading({ id: result.id });

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleTrashRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiTrashHeadingValidates.isValid({
        //     heading,
        // });

        const result = await communityHeadingDataStore.trash(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleUnTrashRequest(router, ctx, next) {
        const { heading, limit, offset } = router.request.body;

        // await apiUnTrashHeadingValidates.isValid({
        //     heading,
        // });

        const result = await communityHeadingDataStore.untrash(heading).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        router.body = {
            success: true,
            heading: safe2json(result),
        };
    }

    async handleGetHeadingAnswersRequest(router, ctx, next) {
        const { heading_id, limit, offset } = router.request.body;

        if (!heading_id)
            throw new ApiError({
                error: new Error('heading_id is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'heading_id' },
            });

        const answers = await communityAnswerDataStore.getHeadingAnswers({
            heading_id,
            offset,
            limit,
        });

        router.body = {
            success: true,
            answers,
        };
    }

    async handleStaticRecommendHeadingRequest(router, ctx, next) {
        const { limit, offset } = router.request.body;

        const headings = await communityHeadingDataStore.getStaticRecommendHeadings({
            offset,
            limit,
        });

        router.body = {
            success: true,
            headings,
        };
    }
}
