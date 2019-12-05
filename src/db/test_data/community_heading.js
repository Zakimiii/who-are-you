const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const communityHeading = (key, users_limit, communities_limit) => {
    return {
        community_id: casual.integer((from = 1), (to = communities_limit)),
        voter_id: casual.integer((from = 1), (to = users_limit)),
        body: casual.title,
        locale: 'ja',
        country_code: 'JP',
        answer_count: 0,
        isHide: false,
        isPrivate: false,
        valid: true,
        permission: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function communityHeadings(limit = 30, users_number = 30, communities_number = 30) {
    let communityHeadings_array = [];
    await times(limit)(() => {
        communityHeadings_array.push(communityHeading(communityHeadings_array.length, users_number, communities_number));
    });
    return communityHeadings_array;
}

module.exports = communityHeadings;
