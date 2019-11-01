'use strict';

const uuidv4 = require('uuid/v4');

const max_decimal_range = 65;
const min_decimal_range = 4;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('users', 'heading_count', {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            }),
            queryInterface.addColumn('users', 'answer_count', {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            }),
        ]);
    },

    down: (queryInterface, Sequelize) => {
        throw new Error('The initial migration is not revertable');
    },
};
