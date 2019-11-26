import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import data_config from '@constants/data_config';
import safe2json from '@extension/safe2json';
import { ApiError } from '@extension/Error';
import {
    CommunityAnswerDataStore,
    CommunityHeadingDataStore,
    NotificationDataStore,
    CommunityDataStore,
    CommunityTemplateDataStore,
    CategoryDataStore,
} from '@datastore';

const communityAnswerDataStore = new CommunityAnswerDataStore();
const communityHeadingDataStore = new CommunityHeadingDataStore();
const notificationDataStore = new NotificationDataStore();
const communityDataStore = new CommunityDataStore();
const categoryDataStore = new CategoryDataStore();
const communityTemplateDataStore = new CommunityTemplateDataStore();

export default class CommunityHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleGetCommunityRequest(router, ctx, next) {
        const { id } = router.request.body;

        let community = await models.Community.findOne({
            where: {
                id: Number(id) || 0,
            },
            raw: true,
        });

        community = await communityDataStore.getShowIncludes(community);
        community = community[0];

        router.body = {
            success: true,
            community: safe2json(community),
        };
    }

    async handleGetCommunityHeadingsRequest(router, ctx, next) {
        const {
            community_id,
            limit,
            offset,
        } = router.request.body;

        if (!community_id)
            throw new ApiError({
                error: new Error('user_id or username is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'user_id or username' },
            });

        const headings = await communityHeadingDataStore.getCommunityHeadings({
            community_id,
            offset,
            limit,
        });

        const results = await Promise.all(
            headings.map(async heading => {
                heading.Answers = await communityAnswerDataStore.getIndexIncludes(
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

    async handleStaticRecommendCommunityRequest(router, ctx, next) {
        const { limit, offset } = router.request.body;

        const communities = await communityDataStore.getStaticRecommendCommunities({
            offset,
            limit,
        });

        router.body = {
            success: true,
            communities,
        };
    }

    async handleReviewRequest(router, ctx, next) {
        const {
            community,
        } = router.request.body;

        if (!community)
            throw new ApiError({
                error: new Error('community is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'community' },
            });

        const category = community.Category;

        const result_category = await categoryDataStore.review(
            category,
        );

        const result_community = await communityDataStore.review(
            community,
        );

        router.body = {
            success: true,
            community: safe2json(result_community),
            category: safe2json(result_category),
        };
    }
}
