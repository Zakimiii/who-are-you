import HandlerImpl from '@handlers/HandlerImpl';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import Cookies from 'js-cookie';
import mail from '@network/mail';
import jwt from 'jsonwebtoken';
import env from '@env/env.json';
import validator from 'validator';
import badDomains from '@constants/bad-domains';
import { SessionDataStore } from '@datastore';
import safe2json from '@extension/safe2json';
import querystring from 'querystring';
import uuidv4 from 'uuid/v4';
import countryCode from '@constants/countryCode';
import { ApiError } from '@extension/Error';

const sessionDataStore = new SessionDataStore();

export default class SessionHandler extends HandlerImpl {
    constructor() {
        super();
    }

    async handleStopMailNotificationRequest(router, ctx, next) {
        const { token } = router.query;

        const decoded = await sessionDataStore.verifyToken(
            token,
            'mail_notification'
        );

        const identity = await models.Identity.findOne({
            where: {
                email: decoded.email,
            },
        });

        if (!identity)
            throw new ApiError({
                error: e,
                tt_key: 'errors.not_exists',
                tt_params: { content: 'User' },
            });
        if (!identity.permission)
            throw new ApiError({
                error: e,
                tt_key: 'errors.is_not_permitted',
                tt_params: { data: identity.username },
            });

        const val = await identity.update({
            isMailNotification: false,
        });

        router.redirect(`/?success_key=g.mail_stop`);
    }
}
