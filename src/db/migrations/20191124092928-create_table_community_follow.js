'use strict';

const uuidv4 = require('uuid/v4');

const max_decimal_range = 65;
const min_decimal_range = 4;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'communityFollows',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                voter_id: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                },
                voted_id: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'communities',
                        key: 'id',
                    },
                    onUpdate: 'cascade',
                    onDelete: 'cascade',
                },
                isPrivate: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                valid: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                permission: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            },
            {
                engine: 'InnoDB ROW_FORMAT=DYNAMIC',
            }
        ).then(function() {
            return queryInterface.sequelize.query(
                'ALTER TABLE `communityFollows` ROW_FORMAT=DYNAMIC;'
            );
        })
    },

    down: (queryInterface, Sequelize) => {
        throw new Error('The initial migration is not revertable');
    },
};
