const casual = require('casual');
const gender = ['mail', 'femail'];
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const user = () => {
    return {
        username: casual.username + uuidv4(),
        nickname: casual.username,
        detail: casual.sentences((n = 3)),
        picture_small:
            'https://i0.wp.com/sk-imedia.com/wp-content/uploads/2015/05/osyarega1-e1430436385100.jpg?zoom=2&fit=580%2C387&ssl=1',
        picture_large:
            'https://i0.wp.com/sk-imedia.com/wp-content/uploads/2015/05/osyarega1-e1430436385100.jpg?zoom=2&fit=580%2C387&ssl=1',
        notification_id: uuidv4(),
        locale: 'ja',
        country_code: 'JP',
        timezone: 'Asia/Tokyo',
        verified: true /*Math.floor(Math.random()*2) == 0*/,
        bot: false,
        isPrivate: false,
        permission: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function users(limit = 30) {
    let users_array = [];
    await times(limit)(() => {
        users_array.push(user());
    });
    return users_array;
}

module.exports = users;
