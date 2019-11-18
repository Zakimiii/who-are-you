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
}
