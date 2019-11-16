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

    static pushAccountLink = async linkToken => {
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
                    to: `${env.LINE.USER_ID}`,
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
                                        uri: `${
                                            config.CURRENT_APP_URL
                                        }/line/link?linkToken=${linkToken}`,
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
}

// const Line = function () {};

// /**
//  * LINE Notifyのトークンセット
//  * @param {String} token LINE Notifyトークン
//  */
// Line.prototype.setToken = function(token) {
//     this.token = token;
// };

// /**
//  * LINE Notify実行
//  * @param {String} text メッセージ
//  */
// Line.prototype.notify = function(text) {
//   if(this.token == undefined || this.token == null){
//     console.error('undefined token.');
//     return;
//   }
//   console.log(`notify message : ${text}`);
//   axios(
//     {
//       method: 'post',
//       url: 'https://notify-api.line.me/api/notify',
//       headers: {
//         Authorization: `Bearer ${this.token}`,
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       data: querystring.stringify({
//         message: text,
//       }),
//     }
//   )
//   .then( function(res) {
//     console.log(res.data);
//   })
//   .catch( function(err) {
//     console.error(err);
//   });
// };

// module.exports = Line;
