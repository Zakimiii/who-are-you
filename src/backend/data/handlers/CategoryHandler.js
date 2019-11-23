import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import CategoryDataStore from '@datastore/CategoryDataStore';
import data_config from '@constants/data_config';
import safe2json from '@extension/safe2json';
import { ApiError } from '@extension/Error';

const categoryDataStore = new CategoryDataStore();

export default class CategoryHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleGetCategoryRequest(router, ctx, next) {
        const { id } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        const category = await models.Category.findOne({
            where: {
                id: Number(id) || 0,
            },
        });

        router.body = {
            success: true,
            category: safe2json(category),
        };
    }

    async handleGetCategoriesRequest(router, ctx, next) {
        const { limit, offset } = router.request.body;

        // await apiFindUserValidates.isValid({
        //     username,
        //     id,
        //     user: { id, username },
        // });

        const categories = await categoryDataStore.getCategories({
            limit,
            offset,
        });

        router.body = {
            success: true,
            categories,
        };
    }

    async handleGetCategoryCommunitiesRequest(router, ctx, next) {
        const {
            category_id,
            limit,
            offset,
            isMyAccount,
        } = router.request.body;

        if (!category_id)
            throw new ApiError({
                error: new Error('and username is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'category_id' },
            });

        const communities = await communityDataStore.getCategoryCommunities({
            category_id,
            offset,
            limit,
        });

        router.body = {
            success: true,
            communities,
        };
    }
}
