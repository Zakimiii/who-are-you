import DataStoreImpl from '@datastore/DataStoreImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';

export default class CommunityHeadingDataStore extends DataStoreImpl {
    constructor() {
        super();
    }
}
