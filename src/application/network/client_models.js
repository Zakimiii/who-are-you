const safe2json = require('@extension/safe2json');

const User = {
    build: init => {
        return {
            id: null,
            username: '',
            nickname: '',
            detail: '',
            picture_small: '',
            picture_large: '',
            locale: '',
            country_code: '',
            timezone: '',
            verified: true,
            bot: false,
            isPrivate: false,
            permission: true,
            created_at: new Date(),
            updated_at: new Date(),
            ...init,
        };
    },
    toJSON: arg => safe2json(arg),
    isInstance: obj =>
        !!obj &&
        'username' in obj &&
        'nickname' in obj &&
        'detail' in obj &&
        'picture_small' in obj &&
        'picture_large' in obj,
};

const Heading = {
    build: init => {
        return {
            id: null,
            UserId: null,
            VoterId: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
            answer_count: 0,
            isHide: false,
            isPrivate: false,
            valid: false,
            permission: true,
            created_at: new Date(),
            updated_at: new Date(),
            ...init,
        };
    },
    toJSON: arg => safe2json(arg),
    isInstance: obj =>
        !!obj && 'UserId' in obj && 'VoterId' in obj && 'body' in obj,
};

const Answer = {
    build: init => {
        return {
            id: null,
            UserId: null,
            HeadingId: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
            isMyAnswer: false,
            isHide: false,
            isPrivate: false,
            valid: false,
            permission: true,
            created_at: new Date(),
            updated_at: new Date(),
            ...init,
        };
    },
    toJSON: arg => safe2json(arg),
    isInstance: obj =>
        !!obj && 'UserId' in obj && 'HeadingId' in obj && 'body' in obj,
};

module.exports = {
    User,
    Heading,
    Answer,
};
