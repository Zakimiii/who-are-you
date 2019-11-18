import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';

export default class CommunityDataStore extends DataStoreImpl {
    constructor() {
        super();
    }
}
