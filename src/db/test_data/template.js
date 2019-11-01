const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const template = key => {
    return {
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

async function templates(limit = 30) {
    let templates_array = [];
    await times(limit)(() => {
        templates_array.push(template(templates_array.length));
    });
    return templates_array;
}

module.exports = templates;
