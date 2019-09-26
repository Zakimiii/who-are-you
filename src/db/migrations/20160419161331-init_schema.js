const uuidv4 = require('uuid/v4');

const max_decimal_range = 65;
const min_decimal_range = 4;

module.exports = {
    up: function(queryInterface, Sequelize) {
        //This table is for rendering user data.
        // return queryInterface.sequelize
        //     .query(
        //         `ALTER DATABASE ${queryInterface.sequelize.config.database}
        //     CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
        //     )
        //     .then(() => {
        //         return queryInterface.createTable(
        //             'users',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 username: {
        //                     type: Sequelize.STRING(126),
        //                     unique: true,
        //                 },
        //                 nickname: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 detail: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 picture_small: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 picture_large: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 eth_address: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 token_balance: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 post_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 upvote_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 view_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 follow_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 follower_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 label_stock_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 request_upvote_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 request_post_vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 // base score(A score)
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 locale: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 timezone: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 verified: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 bot: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 sign_up_meta: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `users` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         //This table is high security user data .
        //         return queryInterface.createTable(
        //             'accounts',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 name: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 first_name: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 last_name: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 birthday: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 address: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 gender: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 // eth_wallet_address: {
        //                 //     type: Sequelize.STRING(255),
        //                 // },
        //                 owner_private_key: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 // wallet_private_key: {
        //                 //     type: Sequelize.STRING(255),
        //                 // },
        //                 active_key: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 posting_key: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 memo_key: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                     allowNull: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `accounts` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         //TODODODO: This table will remove.
        //         return queryInterface.createTable(
        //             'arecs',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 uid: { type: Sequelize.STRING(255) },
        //                 contact_email: { type: Sequelize.STRING(255) },
        //                 account_name: { type: Sequelize.STRING(255) },
        //                 provider: { type: Sequelize.STRING(255) },
        //                 email_confirmation_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 validation_code: { type: Sequelize.STRING(255) },
        //                 request_submitted_at: { type: Sequelize.DATE },
        //                 owner_key: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 old_owner_key: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 new_owner_key: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 memo_key: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 remote_ip: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 status: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `arecs` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         //This Table is for OAuth.
        //         return queryInterface.createTable(
        //             'identities',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 email: {
        //                     type: Sequelize.STRING(126),
        //                     allowNull: false,
        //                     unique: true,
        //                 },
        //                 token: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 email_is_verified: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 last_attempt_verify_email: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 phone_number: {
        //                     type: Sequelize.STRING(126),
        //                     unique: true,
        //                 },
        //                 phone_number_is_verified: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 last_attempt_verify_phone_number: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 phone_code_attempts: {
        //                     type: Sequelize.INTEGER,
        //                     defaultValue: 0,
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 phone_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 account_is_created: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 confirmation_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 username: {
        //                     type: Sequelize.STRING(126),
        //                     unique: true,
        //                 },
        //                 username_booked_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 password_hash: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 password: {
        //                     type: Sequelize.STRING(255),
        //                     allowNull: true,
        //                 },
        //                 verified: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 bot: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `identities` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'contents',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 parent_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'contents',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'set null',
        //                 },
        //                 // content sum score(C score)
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 author_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 author_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_author_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_author_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voters_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voters_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voters_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voters_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 url: {
        //                     type: Sequelize.STRING(126),
        //                     //unique: true,
        //                 },
        //                 title: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 body: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 locale: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 path: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 //Status colomn
        //                 isStory: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 isNsfw: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 isHide: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allowEdit: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allowDelete: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allowReply: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allow_votes: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allow_curation_rewards: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 //Payout colomn
        //                 last_payout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 last_score_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 hasPendingPayout: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 deadline_cashout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 max_accepted_payout: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 //global colomn
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `contents` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'upvotes',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 voter_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 voted_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'contents',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 // vote score(B score)
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 author_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 author_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_author_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_author_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voter_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voter_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voter_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voter_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 type: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 //Payout colomn
        //                 last_score_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 last_payout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 hasPendingPayout: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 deadline_cashout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 max_accepted_payout: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `upvotes` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'downvotes',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 voter_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 voted_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'contents',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 // vote score(-B score)
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 type: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `downvotes` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'reposts',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 voter_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 voted_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'contents',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 locale: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 author_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 author_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_author_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_author_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voter_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voter_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voter_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voter_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 //Payout colomn
        //                 last_score_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 last_payout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 hasPendingPayout: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 deadline_cashout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 max_accepted_payout: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `reposts` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'follows',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 voter_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 votered_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `follows` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'labels',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 title: {
        //                     type: Sequelize.STRING(126),
        //                     defaultValue: '',
        //                     unique: true,
        //                 },
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 locale: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `labels` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'labelings',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 label_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'labels',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 content_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'contents',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 url: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 color: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 bot: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `labelings` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'viewHistories',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 content_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'contents',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 residence_time: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `viewHistories` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'searchHistories',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'set null',
        //                 },
        //                 locale: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 title: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `searchHistories` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'interests',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 label_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'labels',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 //@action: this is a string of like or post or repost or stock or import or task...
        //                 action: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 url: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 color: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 //@isCorrect: this is label for AI.
        //                 isCorrect: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `interests` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'homeLabels',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 label_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'labels',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 url: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 color: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING,
        //                 },
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 start_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 end_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 repeat_span: {
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 remind: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `homeLabels` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'requests',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 content_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'contents',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'set null',
        //                 },
        //                 voter_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 votered_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 // content sum score(C score)
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 answer_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 answer_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_answer_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_answer_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voters_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voters_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voters_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voters_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 isResolved: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 isAccepted: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 isAnswered: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 vector: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 url: {
        //                     type: Sequelize.STRING(126),
        //                     //unique: true,
        //                 },
        //                 title: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 body: {
        //                     type: Sequelize.TEXT('long'),
        //                 },
        //                 locale: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 //Status colomn
        //                 isNsfw: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 isHide: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allowEdit: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allowDelete: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allowReply: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allow_votes: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 allow_curation_rewards: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 //Payout colomn
        //                 last_score_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 last_payout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 hasPendingPayout: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 deadline_cashout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 max_accepted_payout: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 //global colomn
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `requests` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'requestUpvotes',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 voter_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 voted_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'requests',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 // vote score(B score)
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 answer_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 answer_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_answer_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_answer_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voter_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 voter_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voter_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 last_payout_voter_pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 answer_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 type: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 //Payout colomn
        //                 last_score_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 last_payout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 hasPendingPayout: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 deadline_cashout_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 max_accepted_payout: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `requestUpvotes` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'requestDownvotes',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 voter_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 voted_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'requests',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 // vote score(-B score)
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                     defaultValue: 0,
        //                 },
        //                 type: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `requestDownvotes` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'labelStocks',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 label_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'labels',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'cascade',
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `labelStocks` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'developers',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 api_key: {
        //                     type: Sequelize.STRING(126),
        //                     allowNull: false,
        //                     unique: true,
        //                 },
        //                 email: {
        //                     type: Sequelize.STRING(126),
        //                     allowNull: false,
        //                     unique: true,
        //                 },
        //                 token: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 email_is_verified: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 last_attempt_verify_email: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 phone_number: {
        //                     type: Sequelize.STRING(126),
        //                     unique: true,
        //                 },
        //                 phone_number_is_verified: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 last_attempt_verify_phone_number: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 phone_code_attempts: {
        //                     type: Sequelize.INTEGER,
        //                     defaultValue: 0,
        //                 },
        //                 phone_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 account_is_created: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 confirmation_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 username: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 username_booked_at: {
        //                     type: Sequelize.DATE,
        //                 },
        //                 password_hash: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 password: {
        //                     type: Sequelize.STRING(255),
        //                     allowNull: true,
        //                     validate: {
        //                         min: 8,
        //                         max: 32,
        //                     },
        //                 },
        //                 verified: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 bot: {
        //                     type: Sequelize.BOOLEAN,
        //                 },
        //                 locale: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `developers` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'platforms',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 totalScore: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 totalPureScore: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 inflateTotalScore: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 inflateTotalPureScore: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `platforms` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.createTable(
        //             'rewards',
        //             {
        //                 id: {
        //                     allowNull: false,
        //                     autoIncrement: true,
        //                     primaryKey: true,
        //                     type: Sequelize.INTEGER,
        //                 },
        //                 user_id: {
        //                     type: Sequelize.INTEGER,
        //                     references: {
        //                         model: 'users',
        //                         key: 'id',
        //                     },
        //                     onUpdate: 'cascade',
        //                     onDelete: 'set null',
        //                 },
        //                 amount: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 totalScore: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 totalPureScore: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 score_rate: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 pure_score_rate: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 intervalSupply: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 interval: {
        //                     type: Sequelize.DECIMAL(
        //                         max_decimal_range,
        //                         min_decimal_range
        //                     ),
        //                 },
        //                 txnHash: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPending: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 isSuccess: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 country_code: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 meta: {
        //                     type: Sequelize.STRING(255),
        //                 },
        //                 isPrivate: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 valid: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 permission: {
        //                     type: Sequelize.BOOLEAN,
        //                     defaultValue: false,
        //                 },
        //                 created_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //                 updated_at: {
        //                     allowNull: false,
        //                     type: Sequelize.DATE,
        //                 },
        //             },
        //             {
        //                 engine: 'InnoDB ROW_FORMAT=DYNAMIC',
        //             }
        //         );
        //     })
        //     .then(function() {
        //         return queryInterface.sequelize.query(
        //             'ALTER TABLE `rewards` ROW_FORMAT=DYNAMIC;'
        //         );
        //     })
        //     .then(function() {
        //         queryInterface.addIndex('users', ['username']);
        //         queryInterface.addIndex('users', ['nickname']);
        //     })
        //     .then(function() {
        //         queryInterface.addIndex('accounts', ['name']);
        //     })
        //     .then(function() {
        //         queryInterface.addIndex('identities', ['username']);
        //         queryInterface.addIndex('identities', ['email']);
        //         queryInterface.addIndex('identities', ['phone_number']);
        //     })
        //     .then(function() {
        //         // queryInterface.addIndex('contents', ['title']);
        //         // queryInterface.addIndex('contents', ['body']);
        //         queryInterface.addIndex('contents', ['score']);
        //     })
        //     .then(function() {
        //         // queryInterface.addIndex('labels', ['title'], {
        //         //     indicesType: 'UNIQUE',
        //         // });
        //     })
        //     .catch(e => {
        //         if (e) throw e;
        //     });
    },
    down: function(queryInterface, Sequelize) {
        throw new Error('The initial migration is not revertable');
    },
};
