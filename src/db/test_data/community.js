const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const community = (key, caetgories_limit) => {
    return {
        category_id: casual.integer((from = 1), (to = caetgories_limit)),
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

async function communities(limit = 30, categories_number = 30,) {
    let communities_array = [];
    await times(limit)(() => {
        communities_array.push(community(communities_array.length, categories_number));
    });
    return communities_array;
}

module.exports = communities;
