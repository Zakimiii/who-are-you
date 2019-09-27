import DataStoreImpl from '@datastore/DataStoreImpl';
import Cookie from 'js-cookie';
import { Set, Map, fromJS, List } from 'immutable';
import models from '@models';
// import * as twilio from '@network/twilio';
import mail from '@network/mail';
import jwt from 'jsonwebtoken';
import env from '@env/env.json';
import validator from 'validator';
import badDomains from '@constants/bad-domains';
import { ApiError } from '@extension/Error';
import nexmo from '@network/nexmo';
import config from '@constants/config';
import session_config from '@constants/session_config';
import auth_config from '@constants/auth_config';

export default class SessionDataStore extends DataStoreImpl {
    constructor() {
        super();
    }

    async setAccessToken({ client_id, identity, isOneTime = false }) {
        if (!identity) return;
        const session = await models.Identity.findOne({
            where: {
                username: identity.username,
                id: Number(identity.id),
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });
        if (!session) return;

        const access_token = auth_config.expired_mode
            ? await jwt.sign(
                  {
                      type: 'access_token',
                      username: session.username,
                  },
                  env.JWT_SECRET,
                  {
                      expiresIn: auth_config.expires_in,
                  }
              )
            : await jwt.sign(
                  {
                      type: 'access_token',
                      username: session.username,
                  },
                  env.JWT_SECRET
              );

        const result = await models.AccessToken.create({
            identity_id: session.id,
            token: access_token,
            client_id,
            expired_at: Date.prototype.getHoursAgo(auth_config.expires_in / 60),
            isOneTime,
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        if (!result) return;

        return result.token;
    }

    async checkAccessToken({ access_token, client_id, deleting = true }) {
        const decoded = await this.verifyToken(
            access_token,
            'access_token'
        ).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_access_token',
            });
        });

        if (decoded && decoded.type !== 'access_token') {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_access_token',
            });
        }

        const identity = await models.Identity.findOne({
            where: {
                username: decoded.username,
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        const model = await models.AccessToken.findOne({
            where: {
                token: access_token,
                client_id,
            },
        }).catch(e => {
            throw new ApiError({
                error: e,
                tt_key: 'errors.invalid_response_from_server',
            });
        });

        if (!model) return;

        if (Number(model.isOneTime) && deleting) {
            await models.AccessToken.destroy({
                where: {
                    id: Number(model.id),
                },
            }).catch(e => {
                throw new ApiError({
                    error: e,
                    tt_key: 'errors.invalid_response_from_server',
                });
            });
        }

        return identity;
    }

    async verifyToken(token, type) {
        if (!token) {
            throw new ApiError({
                error: new Error('Token is required'),
                tt_key: 'errors.is_required',
                tt_params: { data: 'Token' },
            });
        }

        const decoded = await jwt.verify(token, env.JWT_SECRET);

        if (type && decoded.type !== type) {
            throw new ApiError({
                error: new Error('Token is invalid'),
                tt_key: 'errors.is_not_correct',
                tt_params: { data: token },
            });
        }
        return decoded;
    }

     async sendSMS(to, body) {
        if (process.env.NODE_ENV == 'development') {
            console.log(`Send SMS to ${to} with body ${body}`);
        } else {
            nexmo.message.sendSms(config.APP_NAME, to, body);
        }
    }

    async sendSMSVerify(to) {
        // if (process.env.NODE_ENV == 'development') {
        //     console.log(`Send SMS verify to ${to}`);
        // } else {
        return new Promise((resolve, reject) => {
            nexmo.verify.request(
                {
                    number: `${to}`,
                    brand: config.APP_NAME,
                    code_length: `${session_config.SMS_VERIFY_LENGTH}`,
                },
                (e, result) => {
                    if (!!e) {
                        reject(
                            new ApiError({
                                error: e,
                                tt_key: 'errors.invalid_response_from_server',
                            })
                        );
                    }
                    resolve(result);
                }
            );
        });
        // }
    }

    async validatePhone(id, code) {
        // if (process.env.NODE_ENV == 'development') {
        //     console.log(`Validate ${number} number`);
        //     return true;
        // } else {
        return new Promise((resolve, reject) => {
            nexmo.verify.check(
                {
                    request_id: `${id}`,
                    code: `${code}`,
                },
                (e, result) => {
                    const { error_text } = result;
                    if (!!e || !!error_text) {
                        resolve(false);
                        return;
                    }
                    resolve(!!result);
                }
            );
        });
    }

    async sendEmail(to, template, context) {
        // if (process.env.NODE_ENV == 'development') {
        //     console.log(`Send Email to ${to} using template ${template}`);
        // } else {
        mail.send(to, template, context);
        // }
    }
}
