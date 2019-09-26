const casual = require('casual');
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const searchHistory = users_limit => {
    return {
        user_id: casual.integer((from = 1), (to = users_limit)),
        title: casual.title,
        client_id: uuidv4(),
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function searchHistories(limit = 30, users_number = 30) {
    let searchHistories_array = [];
    await times(limit)(() => {
        searchHistories_array.push(searchHistory(users_number));
    });
    return searchHistories_array;
}

module.exports = searchHistories;
