import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import { HeadingDataStore } from '@datastore';

const headingDataStore = new HeadingDataStore();

export default class HeadingHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleCreateRequest(router, ctx, next) {
        const { user, limit, offset } = router.request.body;
    }
}
