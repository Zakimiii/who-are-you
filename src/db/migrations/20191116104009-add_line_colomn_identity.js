'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('identities', 'linkToken', {
                type: Sequelize.STRING(255),
            }),
            queryInterface.addColumn('identities', 'line_id', {
                type: Sequelize.STRING(255),
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        throw new Error('The initial migration is not revertable');
    },
};
