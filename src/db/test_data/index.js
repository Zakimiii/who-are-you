const users = require('./user');
const identities = require('./identity');
const templates = require('./template');
const headings = require('./heading');
const answers = require('./answer');
const searchHistories = require('./search_history');
const developers = require('./developer');
const notifications = require('./notification');
const categories = require('./category');
const communities = require('./community');
const communityTemplates = require('./community_template');
const communityHeadings = require('./community_heading');
const communityAnswers = require('./community_answer');

async function data({
    users_limit,
    templates_limit,
    headings_limit,
    answers_limit,
    searchHistories_limit,
    developers_limit,
    notifications_limit,
    categories_limit,
    communities_limit,
    communityTemplates_limit,
    communityHeadings_limit,
    communityAnswers_limit,
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
        categories(categories_limit),
        communities(communities_limit),
        communityTemplates(communityTemplates_limit, categories_limit),
        communityHeadings(communityHeadings_limit, users_limit, communities_limit),
        communityAnswers(communityAnswers_limit, users_limit, communityHeadings_limit),
    ]);

    let users_data = datum[0],
        identities_data = datum[1],
        templates_data = datum[2],
        headings_data = datum[3],
        answers_data = datum[4],
        searchHistories_data = datum[5],
        developers_data = datum[6],
        notifications_data = datum[7],
        categories_data = datum[8],
        communities_data = datum[9],
        communityTemplates_data = datum[10],
        communityHeadings_data = datum[11],
        communityAnswers_data = datum[12];

    return {
        users: users_data,
        identities: identities_data,
        templates: templates_data,
        headings: headings_data,
        answers: answers_data,
        searchHistories: searchHistories_data,
        developers: developers_data,
        notifications: notifications_data,
        categories: categories_data,
        communities: communities_data,
        communityTemplates: communityTemplates_data,
        communityHeadings: communityHeadings_data,
        communityAnswers: communityAnswers_data,
    };
}

module.exports = data;
