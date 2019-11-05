const users = require('./user');
const identities = require('./identity');
const templates = require('./template');
const headings = require('./heading');
const answers = require('./answer');
const searchHistories = require('./search_history');
const developers = require('./developer');
const notifications = require('./notification');

async function data({
    users_limit,
    templates_limit,
    headings_limit,
    answers_limit,
    searchHistories_limit,
    developers_limit,
    notifications_limit,
}) {
    const datum = await Promise.all([
        users(users_limit),
        identities(users_limit),
        templates(templates_limit),
        headings(headings_limit, users_limit),
        answers(answers_limit, users_limit, headings_limit),
        searchHistories(searchHistories_limit, users_limit),
        developers(developers_limit),
        notifications(notifications_limit),
    ]);

    let users_data = datum[0],
        identities_data = datum[1],
        templates_data = datum[2],
        headings_data = datum[3],
        answers_data = datum[4],
        searchHistories_data = datum[5],
        developers_data = datum[6],
        notifications_data = datum[7];

    return {
        users: users_data,
        identities: identities_data,
        templates: templates_data,
        headings: headings_data,
        answers: answers_data,
        searchHistories: searchHistories_data,
        developers: developers_data,
        notifications: notifications_data,
    };
}

module.exports = data;
