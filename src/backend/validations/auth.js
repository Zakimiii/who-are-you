import { ClientError, ApiError } from '@extension/Error';
import { ValidationEntity, ValidationEntities } from '@entity/ValidationEntity';
import models from '@models';
import badDomains from '@constants/bad-domains';
import data_config from '@constants/data_config';
import validator from 'validator';
import { ACTION_TYPE } from '@entity';
import {
    apiUnwrapData,
    apiCheckEmailFormat,
    apiCheckEmailIsBadDomain,
    apiCheckPhoneNumberFormat,
    apiCheckHalfWidthAlphanumeric,
    apiCheckHalfWidthAlphanumericOrSimbol,
    apiCheckSpace,
} from '@validations';

export const apiCheckIdentityEmailExists = new ValidationEntity({
    validate: async arg => {
        const { email } = arg;
        if (!email) return false;
        const result = await models.Identity.findOne({
            where: { email },
            raw: true,
        });
        return !!result;
    },
    error: arg => {
        throw new ApiError({
            error: new Error(`is_not_correct_auth`),
            tt_key: 'errors.is_not_correct_auth',
        });
    },
});

export const apiCheckIdentityFinishSinup = new ValidationEntity({
    validate: async arg => {
        const { email } = arg;
        if (!email) return false;
        const result = await models.Identity.findOne({
            where: { email },
            raw: true,
        });
        return !!result.UserId;
    },
    error: arg => {
        throw new ApiError({
            error: new Error(`is_not_correct_auth`),
            tt_key: 'errors.is_not_correct_auth',
        });
    },
});

export const apiCheckEmailIsVerified = new ValidationEntity({
    validate: async arg => {
        const { identity } = arg;
        return identity.email_is_verified;
    },
    error: arg => {
        throw new ApiError({
            error: new Error('Email verified required'),
            tt_key: 'errors.is_required',
            tt_params: { data: 'Email verify' },
        });
    },
});

export const apiCheckPassword = new ValidationEntity({
    validate: async arg => {
        const { password } = arg;
        if (!password) return false;
        return (
            `${password}`.length >= data_config.password_min_limit &&
            `${password}`.length <= data_config.password_max_limit
        );
    },
    error: arg => {
        throw new ApiError({
            error: new Error('password is not correct format'),
            tt_key: 'errors.is_text_min_max_limit',
            tt_params: {
                data: 'g.password',
                min: data_config.password_min_limit,
                max: data_config.password_max_limit,
            },
        });
    },
});

export const apiInitAuthValidates = new ValidationEntities({
    items: [
        apiUnwrapData('email'),
        apiUnwrapData('username'),
        apiCheckHalfWidthAlphanumeric('username'),
        apiCheckSpace('username'),
        apiCheckEmailFormat,
        apiCheckEmailIsBadDomain,
        apiCheckEmailIsVerified,
    ],
});

export const apiSetPasswordValidates = new ValidationEntities({
    items: [
        apiUnwrapData('password'),
        apiCheckPassword,
        apiCheckHalfWidthAlphanumericOrSimbol('password'),
        apiCheckSpace('password'),
    ],
});

export const apiAuthenticateIdentityValidates = new ValidationEntities({
    items: [apiCheckIdentityEmailExists, apiCheckIdentityFinishSinup],
});
