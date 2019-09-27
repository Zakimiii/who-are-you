const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const heading = (
    key,
    users_limit,
) => {
    return {
        user_id: casual.integer((from = 1), (to = users_limit)),
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

async function headings(limit = 30, users_number = 30) {
    let headings_array = [];
    await times(limit)(() => {
        headings_array.push(
            heading(
                headings_array.length,
                users_number,
            )
        );
    });
    return headings_array;
}

module.exports = headings;
