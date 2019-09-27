import { ClientError, ApiError } from '@extension/Error';
import { ValidationEntity, ValidationEntities } from '@entity/ValidationEntity';
import models from '@models';
import badDomains from '@constants/bad-domains';
import data_config from '@constants/data_config';
import validator from 'validator';

export const apiUnwrapData = key =>
    new ValidationEntity({
        validate: async arg => !!arg[key],
        error: arg => {
            throw new ApiError({
                error: new Error(`${key} is required`),
                tt_key: 'errors.is_required',
                tt_params: { data: `g.${key}` },
            });
        },
    });

export const apiCheckEmailFormat = new ValidationEntity({
    validate: async arg => {
        const { email } = arg;
        if (!email) return false;
        return validator.isEmail(email);
    },
    error: arg => {
        throw new ApiError({
            error: new Error('Email is not correct format'),
            tt_key: 'errors.is_not_correct',
            tt_params: { data: arg.email },
        });
    },
});

export const apiCheckEmailIsBadDomain = new ValidationEntity({
    validate: async arg => {
        const { email } = arg;
        if (!email) return false;
        return !badDomains.includes(email.split('@')[1]);
    },
    error: arg => {
        throw new ApiError({
            error: new Error('Email is blacklisted'),
            tt_key: 'errors.is_not_correct',
            tt_params: { data: 'Email' },
        });
    },
});

export const apiCheckPhoneNumberFormat = new ValidationEntity({
    validate: async arg => {
        const { phone_number } = arg;
        if (!phone_number) return false;
        return validator.isMobilePhone(phone_number);
    },
    error: arg => {
        throw new ApiError({
            error: new Error('phone number is not correct format'),
            tt_key: 'errors.is_not_correct',
            tt_params: { data: arg.phone_number },
        });
    },
});

export const apiCheckUserIsVerfied = new ValidationEntity({
    validate: async arg => {
        let { user, UserId } = arg;
        user =
            user ||
            (await models.User.findOne({
                where: {
                    id: UserId,
                },
            }));
        if (!user) return false;
        return user.verified;
    },
    error: arg => {
        throw new ApiError({
            error: new Error('require telephone confirm'),
            tt_key: 'g.do_it',
            tt_params: { data: 'g.phone_verify' },
        });
    },
});

export const apiCheckHalfWidthAlphanumeric = key =>
    new ValidationEntity({
        validate: async arg => {
            if (!arg[key]) return false;
            return `${arg[key]}`.match(/^[A-Za-z0-9]*$/);
        },
        error: arg => {
            throw new ApiError({
                error: new Error(`${key} should be HalfWidthAlphanumeric`),
                tt_key: 'errors.only_halfwidthalphanumeric',
                tt_params: { data: `g.${key}` },
            });
        },
    });

export const apiCheckHalfWidthAlphanumericOrSimbol = key =>
    new ValidationEntity({
        validate: async arg => {
            if (!arg[key]) return false;
            return `${arg[key]}`.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/);
        },
        error: arg => {
            throw new ApiError({
                error: new Error(
                    `${key} should be HalfWidthAlphanumericOrSimbol`
                ),
                tt_key: 'errors.only_halfwidthalphanumeric_or_simbol',
                tt_params: { data: `g.${key}` },
            });
        },
    });

export const apiCheckSpace = key =>
    new ValidationEntity({
        validate: async arg => {
            if (!arg[key]) return false;
            return !`${arg[key]}`.match(/[\s]+/);
        },
        error: arg => {
            throw new ApiError({
                error: new Error(`${key} should not have space characters`),
                tt_key: 'errors.has_space',
                tt_params: { data: `g.${key}` },
            });
        },
    });

export const apiCheckInteger = key =>
    new ValidationEntity({
        validate: async arg => {
            if (!arg[key]) return false;
            return !`${arg[key]}`.match(/[+-]?\d+/);
        },
        error: arg => {
            throw new ApiError({
                error: new Error(`${key} is_not_correct`),
                tt_key: 'errors.is_not_correct',
                tt_params: { data: `g.${key}` },
            });
        },
    });
