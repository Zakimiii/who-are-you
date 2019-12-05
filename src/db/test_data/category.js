const casual = require('casual'); //.ja_JP;
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const category = key => {
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

async function categories(limit = 30) {
    let categories_array = [];
    await times(limit)(() => {
        categories_array.push(category(categories_array.length));
    });
    return categories_array;
}

module.exports = categories;
