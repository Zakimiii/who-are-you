import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';

export default class CommunityHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleGetCommunityRequest(router, ctx, next) {
        const { id } = router.request.body;

        const community = await models.Community.findOne({
            where: {
                id: Number(id) || 0,
            },
        });

        router.body = {
            success: true,
            user: safe2json(community),
        };
    }
}
