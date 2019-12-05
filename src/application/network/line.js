import querystring from 'querystring';
import env from '@env/env.json';
import fetch from 'isomorphic-fetch';
import { ApiError } from '@extension/Error';
import config from '@constants/config';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import models from '@models';

export default class LineHandler {
    static getLinkToken = async () => {
        const response = await fetch(
            `https://api.line.me/v2/bot/user/${env.LINE.USER_ID}/linkToken`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${env.LINE.ACCESS_TOKEN}`,
                },
            }
        ).catch(e => {
            throw new ClientError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || contentType.indexOf('application/json') === -1) {
            throw new ApiError({
                error: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        let responseData = await response.json();
        if (responseData.error) {
            responseData.error.error = new Error(responseData.error.message);
            throw new ApiError(responseData.error);
        }

        return responseData.linkToken;
    };

    static pushAccountLink = async (linkToken, user_id) => {
        const response = await fetch(
            `https://api.line.me/v2/bot/message/push`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${env.LINE.ACCESS_TOKEN}`,
                },
                body: JSON.stringify({
                    to: `${user_id}`,
                    messages: [
                        {
                            type: 'template',
                            altText: '連携まであと１タップ！',
                            template: {
                                type: 'buttons',
                                text: '連携まであと１タップ！',
                                actions: [
                                    {
                                        type: 'uri',
                                        label: 'アカウントを連携',
                                        uri: `${config.CURRENT_APP_URL}/line/${
                                            linkToken
                                        }/confirm`,
                                    },
                                ],
                            },
                        },
                    ],
                }),
            }
        ).catch(e => {
            throw new ClientError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || contentType.indexOf('application/json') === -1) {
            throw new ApiError({
                error: new Error('Invalid response from server'),
                tt_key: 'errors.invalid_response_from_server',
            });
        }
        let responseData = await response.json();
        if (responseData.error) {
            responseData.error.error = new Error(responseData.error.message);
            throw new ApiError(responseData.error);
        }
    };

    static redirectEndPointLinkUrl = async linkToken => {
        const nonce = await jwt.sign(
            {
                type: 'linkToken',
                linkToken,
            },
            env.JWT_SECRET
        );

        return `https://access.line.me/dialog/bot/accountLink?linkToken=${
            linkToken
        }&nonce=${nonce}`;
    };

    static handleAccountLink = async event => {
        if (event.type != 'accountLink') return;

        const line_user_id = event.source.type == 'user' && event.source.userId;
        const nonce = event.link.result == 'ok' && event.link.nonce;

        const decoded = await jwt.verify(nonce, env.JWT_SECRET);

        if (decoded.type !== 'linkToken') {
            throw new ApiError({
                error: new Error('Token is invalid'),
                tt_key: 'errors.is_not_correct',
                tt_params: { data: nonce },
            });
        }

        const linkToken = decoded.linkToken;

        const identity = await models.Identity.findOne({
            where: {
                linkToken,
            },
        });

        if (!identity) return;

        const updated = await identity.update({
            line_id: line_user_id,
        });

        return updated;
    };
}
