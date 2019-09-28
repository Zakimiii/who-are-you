const safe2json = require('@extension/safe2json');

const User = {
    build: init => {
        return {
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
            body: '',
            isHide: false,
            isPrivate: false,
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
            body: '',
            isHide: false,
            isPrivate: false,
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
