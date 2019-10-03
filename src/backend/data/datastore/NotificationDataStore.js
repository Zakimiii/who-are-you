import DataStoreImpl from '@datastore/DataStoreImpl';
import UserDataStore from '@datastore/UserDataStore';
import { Set, Map, fromJS, List } from 'immutable';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import models from '@models';
import Promise from 'bluebird';
import safe2json from '@extension/safe2json';
import data_config from '@constants/data_config';
import { ApiError } from '@extension/Error';
import mail from '@network/mail';
import validator from 'validator';
import config from '@constants/config';
import notification_config from '@constants/notification_config';
import Notification from '@network/notification';
import querystring from 'querystring';
import TwitterHandler from '@network/twitter';

const notification = new Notification();

export default class NotificationDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async onCreateAnswer(answer) {
        if (!answer) return;
        const target = await models.Answer.findOne({
            where: {
                id: Number(answer.id),
            },
        });

        const identity = await models.Identity.findOne({
            where: {
                user_id: Number(target.UserId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        if (!identity)
            throw new ApiError({
                error: new Error('identity is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'g.user' },
            });

        const user = await models.User.findOne({
            where: {
                id: Number(target.UserId),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        if (!user)
            throw new ApiError({
                error: new Error('identity is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'g.user' },
            });

        const results = await TwitterHandler.postTweet(
            answer.body,
            `/answer/${target.id}`,
            identity.twitter_token,
            identity.twitter_secret
        );
    }

    async onCreateHeading(answer) {}
}
