import RepositoryImpl from '@repository/RepositoryImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class CommunityHeadingRepository extends RepositoryImpl {
    constructor() {
        super();
    }
}
