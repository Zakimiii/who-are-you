'use strict';
/*
Use this command:
sudo sequelize db:drop && sudo sequelize db:create &&  sudo sequelize db:migrate &&  sudo sequelize db:seed:all --debug
*/
const data = require('../test_data');
// const crawler = require('../utils/crawler');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return data({
            users_limit: 100,
            headings_limit: 100,
            answers_limit: 100,
            searchHistories_limit: 100,
            developers_limit: 1,
            notifications_limit: 1,
            categories_limit: 100,
            communities_limit: 100,
            communityTemplates_limit: 100,
            communityHeadings_limit: 100,
            communityAnswers_limit: 100,
        }).then(results => {
            return queryInterface
                .bulkInsert('users', results['users'], {})
                .then(() => {
                    return queryInterface.bulkInsert(
                        'identities',
                        results['identities'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'templates',
                        results['templates'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'headings',
                        results['headings'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'answers',
                        results['answers'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'searchHistories',
                        results['searchHistories'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'developers',
                        results['developers'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'notifications',
                        results['notifications'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'categories',
                        results['categories'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'communities',
                        results['communities'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'communityTemplates',
                        results['communityTemplates'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'communityHeadings',
                        results['communityHeadings'],
                        {}
                    );
                })
                .then(() => {
                    return queryInterface.bulkInsert(
                        'communityAnswers',
                        results['communityAnswers'],
                        {}
                    );
                });
        });
    },

    down: (queryInterface, Sequelize) => {
        throw new Error('The demo seeders are not revertable');
    },
};
