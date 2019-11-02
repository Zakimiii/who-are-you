import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import { TemplateDataStore } from '@datastore';
import safe2json from '@extension/safe2json';
import querystring from 'querystring';
import uuidv4 from 'uuid/v4';
import countryCode from '@constants/countryCode';
import { ApiError } from '@extension/Error';
import Cookies from 'js-cookie';
import mail from '@network/mail';
import jwt from 'jsonwebtoken';
import env from '@env/env.json';
import validator from 'validator';
import badDomains from '@constants/bad-domains';

const templateDataStore = new TemplateDataStore();

export default class TemplateHandler extends HandlerImpl {
    constructor() {
        super();
    }
}
