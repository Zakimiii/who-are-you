const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const communityAnswer = (
    key,
    users_limit,
    headings_limit,
) => {
    return {
        user_id: casual.integer((from = 1), (to = users_limit)),
        heading_id: casual.integer((from = 1), (to = headings_limit)),
        body: casual.title,
        locale: 'ja',
        country_code: 'JP',
        isHide: false,
        isPrivate: false,
        valid: true,
        permission: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function communityAnswers(limit = 30, users_number = 30, headings_number = 30) {
    let communityAnswers_array = [];
    await times(limit)(() => {
        communityAnswers_array.push(
            communityAnswer(
                communityAnswers_array.length,
                users_number,
                headings_number
            )
        );
    });
    return communityAnswers_array;
}

module.exports = communityAnswers;
