'use strict';

const uuidv4 = require('uuid/v4');

const max_decimal_range = 65;
const min_decimal_range = 4;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .createTable(
                'categories',
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
            )
            .then(function() {
                return queryInterface.sequelize.query(
                    'ALTER TABLE `categories` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'communities',
                    {
                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER,
                        },
                        category_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'categories',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
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
            })
            .then(function() {
                return queryInterface.sequelize.query(
                    'ALTER TABLE `communities` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'community_templates',
                    {
                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER,
                        },
                        community_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'communities',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
                            allowNull: false,
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
            })
            .then(function() {
                return queryInterface.sequelize.query(
                    'ALTER TABLE `community_templates` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'community_headings',
                    {
                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER,
                        },
                        template_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'community_templates',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'set null',
                            allowNull: true,
                        },
                        community_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'communities',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
                            allowNull: false,
                        },
                        voter_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
                            allowNull: true,
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
                        answer_count: {
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
            })
            .then(function() {
                return queryInterface.sequelize.query(
                    'ALTER TABLE `community_headings` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'community_answers',
                    {
                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER,
                        },
                        user_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
                            allowNull: true,
                        },
                        heading_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'community_headings',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
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
                        //global colomn
                        isMyAnswer: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
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
            })
            .then(function() {
                return queryInterface.sequelize.query(
                    'ALTER TABLE `community_answers` ROW_FORMAT=DYNAMIC;'
                );
            });
    },

    down: (queryInterface, Sequelize) => {
        throw new Error('The initial migration is not revertable');
    },
};
