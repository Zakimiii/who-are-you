const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const communityTemplate = (key, categories_limit) => {
    return {
        category_id: casual.integer((from = 1), (to = categories_limit)),
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

async function communityTemplates(limit = 30, categories_number = 30) {
    let communityTemplates_array = [];
    await times(limit)(() => {
        communityTemplates_array.push(communityTemplate(communityTemplates_array.length, categories_number));
    });
    return communityTemplates_array;
}

module.exports = communityTemplates;
