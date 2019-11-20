const safe2json = require('@extension/safe2json');
const tt = require('counterpart');

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
            TemplateId: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
            answer_count: 0,
            isHide: false,
            isBot: false,
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
        !!obj &&
        'UserId' in obj &&
        'VoterId' in obj &&
        'body' in obj &&
        'isBot' in obj,
    getBody: obj => {
        if (!obj) return;
        return Number.prototype.castBool(obj.isBot)
            ? tt(`headings.${obj.body}`)
            : obj.body;
    },
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

const Template = {
    build: init => {
        return {
            id: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
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
        !!obj &&
        !('UserId' in obj) &&
        !('HeadingId' in obj) &&
        'body' in obj &&
        'count' in obj,
};

const Category = {
    build: init => {
        return {
            id: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
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
        !!obj &&
        !('UserId' in obj) &&
        !('HeadingId' in obj) &&
        'body' in obj &&
        'count' in obj,
};


const Community = {
    build: init => {
        return {
            id: null,
            CategoryId: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
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
        !!obj &&
        !('UserId' in obj) &&
        !('HeadingId' in obj) &&
        'body' in obj &&
        'count' in obj,
};

const CommunityHeading = {
    build: init => {
        return {
            id: null,
            CommunityId: null,
            VoterId: null,
            TemplateId: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
            answer_count: 0,
            isHide: false,
            isBot: false,
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
        !!obj &&
        'CommunityId' in obj &&
        'VoterId' in obj &&
        'body' in obj,
    getBody: obj => {
        if (!obj) return;
        return Number.prototype.castBool(obj.isBot)
            ? tt(`headings.${obj.body}`)
            : obj.body;
    },
};

const CommunityAnswer = {
    build: init => {
        return {
            id: null,
            UserId: null,
            HeadingId: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
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

const CommunityTemplate = {
    build: init => {
        return {
            id: null,
            CategoryId: null,
            body: '',
            locale: 'ja',
            country_code: 'JP',
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
        !!obj &&
        !('UserId' in obj) &&
        !('HeadingId' in obj) &&
        'CategoryId' in obj &&
        'body' in obj &&
        'count' in obj,
};

module.exports = {
    User,
    Heading,
    Answer,
    Template,
    Category,
    Community,
    CommunityHeading,
    CommunityAnswer,
    CommunityTemplate,
};
