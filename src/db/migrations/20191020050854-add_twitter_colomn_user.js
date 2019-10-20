'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('users', 'twitter_username', {
                type: Sequelize.STRING(255),
            }),
            queryInterface.addColumn('users', 'twitter_id', {
                type: Sequelize.STRING(255),
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        throw new Error('The initial migration is not revertable');
    },
};
