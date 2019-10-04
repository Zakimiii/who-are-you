const casual = require('casual');
const times = require('../utils/times');

const follow = users_limit => {
    return {
        voter_id: casual.integer((from = 1), (to = users_limit)),
        votered_id: casual.integer((from = 1), (to = users_limit)),
        isPrivate: false,
        valid: true,
        permission: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function follows(limit = 30, users_number = 30) {
    let follows_array = [];
    await times(limit)(() => {
        follows_array.push(follow(users_number));
    });
    return follows_array;
}

module.exports = follows;
