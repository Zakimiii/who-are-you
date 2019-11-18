const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const communityTemplate = (key, communities_limit) => {
    return {
        community_id: casual.integer((from = 1), (to = communities_limit)),
        body: casual.title,
        locale: 'ja',
        country_code: 'JP',
        count: 0,
        isHide: false,
        isPrivate: false,
        valid: true,
        permission: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function communityTemplates(limit = 30, communities_number = 30) {
    let communityTemplates_array = [];
    await times(limit)(() => {
        communityTemplates_array.push(communityTemplate(communityTemplates_array.length, communities_number));
    });
    return communityTemplates_array;
}

module.exports = communityTemplates;
