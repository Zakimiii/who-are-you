import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';

export default class SessionHandler extends HandlerImpl {
    constructor() {
        super();
    }
}
