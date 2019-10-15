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
};

module.exports = {
    User,
    Heading,
    Answer,
};
