'use strict';

const uuidv4 = require('uuid/v4');

const max_decimal_range = 65;
const min_decimal_range = 4;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'templates',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                body: {
                    type: Sequelize.TEXT('long'),
                },
                locale: {
                    type: Sequelize.STRING(255),
                },
                country_code: {
                    type: Sequelize.STRING(255),
                },
                picture: {
                    type: Sequelize.BLOB('long'),
                },
                tweet_url: {
                    type: Sequelize.STRING(255),
                },
                count: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                },
                //global colomn
                isHide: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
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
        );
    },

    down: (queryInterface, Sequelize) => {
        throw new Error('The initial migration is not revertable');
    },
};
