'use strict';

const uuidv4 = require('uuid/v4');

const max_decimal_range = 65;
const min_decimal_range = 4;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('headings', 'template_id', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'templates',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'set null',
                allowNull: true,
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        throw new Error('The initial migration is not revertable');
    },
};
