import UseCaseImpl from '@usecase/UseCaseImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';

export default class UserUseCase extends UseCaseImpl {
    constructor() {
        super();
    }
}
