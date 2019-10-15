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

    async check(notification) {
        if (!notification) return;
        const result = await models.Notification.findOne({
            where: {
                id: notification.id,
            },
        });

        if (!result) return;

        const updated = await result.update({
            isChecked: true,
        });

        return updated;
    }

    async onCreateAnswer(answer) {
        if (!answer) return;
        const target = await models.Answer.findOne({
            where: {
                id: Number(answer.id),
            },
        });

        const heading = await models.Heading.findOne({
            where: {
                id: Number(answer.HeadingId),
            },
        });

        const identity = await models.Identity.findOne({
            where: {
                user_id: Number(target.UserId),
            },
        });

        const h_identity = await models.Identity.findOne({
            where: {
                user_id: Number(heading.UserId),
            },
        });

        const v_identity = await models.Identity.findOne({
            where: {
                user_id: Number(heading.VoterId),
            },
        });

        if (!identity || !heading)
            throw new ApiError({
                error: new Error('identity is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'g.user' },
            });

        const user = await models.User.findOne({
            where: {
                id: Number(target.UserId),
            },
        });

        const h_user = await models.User.findOne({
            where: {
                id: Number(heading.UserId),
            },
        });

        const v_user = await models.User.findOne({
            where: {
                id: Number(heading.VoterId),
            },
        });

        if (!user)
            throw new ApiError({
                error: new Error('identity is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'g.user' },
            });

        await Promise.all([
            models.Notification.create({
                user_id: h_user.id,
                target_table: 'answer',
                target_id: target.id,
                template: 'on_create_answer',
                url: config.CURRENT_APP_URL + `/answer/${target.id}`,
            }),
            notification.push({
                tt_key: 'on_create_heading',
                url: config.CURRENT_APP_URL + `/answer/${target.id}`,
                ids: [h_user.notification_id || ''],
            }),
            v_user &&
                models.Notification.create({
                    user_id: v_user.id,
                    target_table: 'answer',
                    target_id: target.id,
                    template: 'on_create_answer',
                    url: config.CURRENT_APP_URL + `/answer/${target.id}`,
                }),
            v_user &&
                notification.push({
                    tt_key: 'on_create_heading',
                    url: config.CURRENT_APP_URL + `/answer/${target.id}`,
                    ids: [v_user.notification_id || ''],
                }),
        ]);

        if (
            !validator.isEmail(h_identity.email) ||
            !Number.prototype.castBool(h_identity.isMailNotification) ||
            !validator.isEmail(v_identity.email) ||
            !Number.prototype.castBool(v_identity.isMailNotification)
        )
            return;

        await Promise.all([
            mail.send(h_identity.email, 'on_create_answer', {
                title: `新しい回答が届きました！`,
                text: `${
                    config.APP_NAME
                }です。\n新しい回答が届きました！回答をシェアして自分のことを多くの人に広めましょう！\n下記のボタンをクリックしてシェアしましょう！`,
                button_text: 'シェアする',
                button_url: TwitterHandler.getShareUrl({
                    text: target.body,
                    pathname: `/answer/${target.id}`,
                }),
                foot_text: '',
                end_text: '',
                inc_name: config.INC_FULL_NAME,
                unsubscribe_text: 'メールの通知を解除したい場合は',
                unsubscribe_url:
                    config.CURRENT_APP_URL +
                    '/api/v1/notification/email/stop?token=' +
                    h_identity.mail_notification_token,
                unsubscribe: 'こちらから',
                contact: '会社住所・お問い合わせ',
            }),
            v_identity &&
                mail.send(v_identity.email, 'on_create_answer', {
                    title: `新しい回答が届きました！`,
                    text: `${
                        config.APP_NAME
                    }です。\n新しい回答が届きました！回答をシェアして自分のことを多くの人に広めましょう！\n下記のボタンをクリックしてシェアしましょう！`,
                    button_text: 'シェアする',
                    button_url: TwitterHandler.getShareUrl({
                        text: target.body,
                        pathname: `/answer/${target.id}`,
                    }),
                    foot_text: '',
                    end_text: '',
                    inc_name: config.INC_FULL_NAME,
                    unsubscribe_text: 'メールの通知を解除したい場合は',
                    unsubscribe_url:
                        config.CURRENT_APP_URL +
                        '/api/v1/notification/email/stop?token=' +
                        v_identity.mail_notification_token,
                    unsubscribe: 'こちらから',
                    contact: '会社住所・お問い合わせ',
                }),
        ]);

        // await TwitterHandler.postTweet(
        //     answer.body,
        //     `/answer/${target.id}`,
        //     identity.twitter_token,
        //     identity.twitter_secret
        // );
    }

    async onCreateHeading(heading) {
        if (!heading) return;

        const target = await models.Heading.findOne({
            where: {
                id: Number(heading.id),
            },
        });

        const identity = await models.Identity.findOne({
            where: {
                user_id: Number(target.VoterId),
            },
        });

        const h_identity = await models.Identity.findOne({
            where: {
                user_id: Number(target.UserId),
            },
        });

        if (!h_identity)
            throw new ApiError({
                error: new Error('identity is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'g.user' },
            });

        const user = await models.User.findOne({
            where: {
                id: Number(target.VoterId),
            },
        });

        const h_user = await models.User.findOne({
            where: {
                id: Number(target.UserId),
            },
        });

        if (!h_user)
            throw new ApiError({
                error: new Error('identity is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'g.user' },
            });

        await Promise.all([
            models.Notification.create({
                user_id: h_user.id,
                target_table: 'heading',
                target_id: target.id,
                template: 'on_create_heading',
                url: config.CURRENT_APP_URL + `/heading/${target.id}`,
            }),
            notification.push({
                tt_key: 'on_create_heading',
                url: config.CURRENT_APP_URL + `/heading/${target.id}`,
                ids: [h_user.notification_id || ''],
            }),
        ]);

        if (
            !validator.isEmail(h_identity.email) ||
            !Number.prototype.castBool(h_identity.isMailNotification)
        )
            return;

        await mail.send(identity.email, 'on_create_heading', {
            title: `新しい紹介カードが届きました！`,
            text: `${
                config.APP_NAME
            }です。\n新しい紹介カードが届きました！カードをシェアして回答を募集しましょう！\n下記のボタンをクリックしてシェアしましょう！`,
            button_text: 'シェアする',
            button_url: TwitterHandler.getShareUrl({
                text: target.body,
                pathname: `/heading/${target.id}`,
            }),
            foot_text: '',
            end_text: '',
            inc_name: config.INC_FULL_NAME,
            unsubscribe_text: 'メールの通知を解除したい場合は',
            unsubscribe_url:
                config.CURRENT_APP_URL +
                '/api/v1/notification/email/stop?token=' +
                h_identity.mail_notification_token,
            unsubscribe: 'こちらから',
            contact: '会社住所・お問い合わせ',
        });
        // await TwitterHandler.postTweet(
        //     heading.body,
        //     `/heading/${target.id}`,
        //     identity.twitter_token,
        //     identity.twitter_secret
        // );
    }
}
