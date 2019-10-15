const casual = require('casual');
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const notification = users_limit => {
    return {
        user_id: casual.integer((from = 1), (to = users_limit)),
        template: casual.title,
        target_table: '',
        target_id: 1,
        url: '/',
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function notifications(limit = 30, users_number = 30) {
    let notifications_array = [];
    await times(limit)(() => {
        notifications_array.push(notification(users_number));
    });
    return notifications_array;
}

module.exports = notifications;
