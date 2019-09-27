const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const answer = (
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
        isMyAnswer: false,
        isHide: false,
        isPrivate: false,
        valid: true,
        permission: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function answers(limit = 30, users_number = 30, headings_number = 30) {
    let answers_array = [];
    await times(limit)(() => {
        answers_array.push(
            answer(
                answers_array.length,
                users_number,
                headings_number
            )
        );
    });
    return answers_array;
}

module.exports = answers;
