const uuidv4 = require('uuid/v4');

const max_decimal_range = 65;
const min_decimal_range = 4;

module.exports = {
    up: function(queryInterface, Sequelize) {
        //This table is for rendering user data.
        return queryInterface.sequelize
            .query(
                `ALTER DATABASE ${queryInterface.sequelize.config.database}
            CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
            )
            .then(() => {
                return queryInterface.createTable(
                    'users',
                    {
                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER,
                        },
                        username: {
                            type: Sequelize.STRING(126),
                            unique: true,
                        },
                        nickname: {
                            type: Sequelize.STRING(255),
                        },
                        detail: {
                            type: Sequelize.TEXT('long'),
                        },
                        picture_small: {
                            type: Sequelize.STRING(255),
                        },
                        picture_large: {
                            type: Sequelize.STRING(255),
                        },
                        locale: {
                            type: Sequelize.STRING(255),
                        },
                        country_code: {
                            type: Sequelize.STRING(255),
                        },
                        timezone: {
                            type: Sequelize.STRING(255),
                        },
                        verified: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        bot: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        notification_id: {
                            type: Sequelize.STRING(255),
                        },
                        isPrivate: {
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
                    'ALTER TABLE `users` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                //This Table is for OAuth.
                return queryInterface.createTable(
                    'identities',
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
                        },
                        username: {
                            type: Sequelize.STRING(126),
                            unique: true,
                        },
                        token: {
                            type: Sequelize.STRING(255),
                        },
                        email: {
                            type: Sequelize.STRING(126),
                            allowNull: false,
                            unique: true,
                        },
                        email_token: {
                            type: Sequelize.STRING(255),
                        },
                        email_is_verified: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        mail_notification_token: {
                            type: Sequelize.STRING(255),
                        },
                        isMailNotification: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        phone_code: {
                            type: Sequelize.STRING(255),
                        },
                        phone_number: {
                            type: Sequelize.STRING(126),
                            unique: true,
                        },
                        confirmation_code: {
                            type: Sequelize.STRING(255),
                        },
                        phone_number_is_verified: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        country_code: {
                            type: Sequelize.STRING(255),
                        },
                        password_hash: {
                            type: Sequelize.STRING(255),
                        },
                        password: {
                            type: Sequelize.STRING(255),
                            allowNull: true,
                        },
                        delete_password_token: {
                            type: Sequelize.STRING(255),
                        },
                        twitter_id: {
                            type: Sequelize.STRING(255),
                        },
                        twitter_username: {
                            type: Sequelize.STRING(126),
                            unique: true,
                        },
                        verified: {
                            type: Sequelize.BOOLEAN,
                        },
                        bot: {
                            type: Sequelize.BOOLEAN,
                        },
                        isDelete: {
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
                    'ALTER TABLE `identities` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'headings',
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
                    'ALTER TABLE `headings` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'answers',
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
                                model: 'headings',
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
                    'ALTER TABLE `answers` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'accessTokens',
                    {
                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER,
                        },
                        identity_id: {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'identities',
                                key: 'id',
                            },
                            onUpdate: 'cascade',
                            onDelete: 'cascade',
                        },
                        client_id: {
                            type: Sequelize.STRING(255),
                        },
                        token: {
                            type: Sequelize.STRING(255),
                        },
                        expired_at: {
                            type: Sequelize.DATE,
                        },
                        meta: {
                            type: Sequelize.STRING(255),
                        },
                        isOneTime: {
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
                    'ALTER TABLE `answers` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'searchHistories',
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
                            onDelete: 'set null',
                        },
                        client_id: {
                            type: Sequelize.STRING(255),
                        },
                        locale: {
                            type: Sequelize.STRING(255),
                        },
                        title: {
                            type: Sequelize.STRING(255),
                        },
                        table_name: {
                            type: Sequelize.STRING(255),
                        },
                        meta: {
                            type: Sequelize.STRING(255),
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
                    'ALTER TABLE `searchHistories` ROW_FORMAT=DYNAMIC;'
                );
            })
            .then(function() {
                return queryInterface.createTable(
                    'developers',
                    {
                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER,
                        },
                        api_key: {
                            type: Sequelize.STRING(126),
                            allowNull: false,
                            unique: true,
                        },
                        email: {
                            type: Sequelize.STRING(126),
                            allowNull: false,
                            unique: true,
                        },
                        token: {
                            type: Sequelize.STRING(255),
                        },
                        email_is_verified: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        last_attempt_verify_email: {
                            type: Sequelize.DATE,
                        },
                        phone_number: {
                            type: Sequelize.STRING(126),
                            unique: true,
                        },
                        phone_number_is_verified: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        last_attempt_verify_phone_number: {
                            type: Sequelize.DATE,
                        },
                        phone_code_attempts: {
                            type: Sequelize.INTEGER,
                            defaultValue: 0,
                        },
                        phone_code: {
                            type: Sequelize.STRING(255),
                        },
                        country_code: {
                            type: Sequelize.STRING(255),
                        },
                        account_is_created: {
                            type: Sequelize.BOOLEAN,
                            defaultValue: false,
                        },
                        confirmation_code: {
                            type: Sequelize.STRING(255),
                        },
                        username: {
                            type: Sequelize.STRING(255),
                        },
                        username_booked_at: {
                            type: Sequelize.DATE,
                        },
                        password_hash: {
                            type: Sequelize.STRING(255),
                        },
                        password: {
                            type: Sequelize.STRING(255),
                            allowNull: true,
                            validate: {
                                min: 8,
                                max: 32,
                            },
                        },
                        verified: {
                            type: Sequelize.BOOLEAN,
                        },
                        bot: {
                            type: Sequelize.BOOLEAN,
                        },
                        locale: {
                            type: Sequelize.STRING(255),
                        },
                        meta: {
                            type: Sequelize.STRING(255),
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
                    'ALTER TABLE `developers` ROW_FORMAT=DYNAMIC;'
                );
            });
    },
    down: function(queryInterface, Sequelize) {
        throw new Error('The initial migration is not revertable');
    },
};
