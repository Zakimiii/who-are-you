const casual = require('casual'); //.ja_JP;
const gender = ['mail', 'femail'];
const times = require('../utils/times');
const uuidv4 = require('uuid/v4');

const developer = key => {
    return {
        api_key: 'e47be6d0-89d7-11e9-8cb4-374fed3b56f3',
        email: casual.email,
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiY29uZmlybV9lbWFpbCIsImVtYWlsIjoidGgyNzg3NjMxNEBpY2xvdWQuY29tIiwiaWF0IjoxNTUwNzIxODY5fQ.xCQCe1Dmh1Hp4yOcSgzjdot7hgauF4gIMAWaqfJtn6A',
        email_is_verified: true /*casual.boolean*/,
        last_attempt_verify_email: new Date(),
        phone_number: casual.phone,
        phone_number_is_verified: false,
        last_attempt_verify_phone_number: new Date(),
        phone_code_attempts: 0,
        phone_code: '',
        country_code: 'JP',
        locale: 'ja',
        username: casual.name,
        permission: true,
        account_is_created: true,
        confirmation_code: '',
        username_booked_at: new Date(),
        password_hash:
            '$2a$10$IsGkaweZ1CkqelMLjkMfJuEM9y8asagt74Y1ES8zXqzbhVFFA4lXO',
        password: '',
        verified: true,
        bot: false,
        permission: true,
        created_at: new Date(),
        updated_at: new Date(),
    };
};

async function developers(limit = 30) {
    let developers_array = [];
    await times(limit)(() => {
        developers_array.push(developer(developers_array.length));
    });
    return developers_array;
}

module.exports = developers;
