const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const data_config = require('@constants/data_config');

const hashPasswordHook = (identity, options, callback) => {
    if (identity.get('password') == '') return callback(null, options);
    bcrypt.hash(identity.get('password'), 10, (err, hash) => {
        if (err) return callback(err);
        identity.set('password_hash', hash);
        identity.set('password', '');
        return callback(null, options);
    });
};

module.exports = function(sequelize, DataTypes) {
    var Identity = sequelize.define(
        'Identity',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            UserId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                field: 'user_id',
            },
            username: {
                type: DataTypes.STRING(126),
            },
            email: {
                type: DataTypes.STRING(126),
                allowNull: false,
            },
            email_token: {
                type: DataTypes.STRING(255),
            },
            email_is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            mail_notification_token: {
                type: DataTypes.STRING(255),
            },
            isMailNotification: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            phone_code: {
                type: DataTypes.STRING(255),
            },
            phone_number: {
                type: DataTypes.STRING(126),
            },
            confirmation_code: {
                type: DataTypes.STRING(255),
            },
            phone_number_is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            country_code: {
                type: DataTypes.STRING(255),
            },
            password_hash: {
                type: DataTypes.STRING(255),
            },
            password: {
                type: DataTypes.STRING(255),
            },
            delete_password_token: {
                type: DataTypes.STRING(255),
            },
            twitter_id: {
                type: DataTypes.STRING(255),
            },
            twitter_username: {
                type: DataTypes.STRING(126),
            },
            verified: {
                type: DataTypes.BOOLEAN,
            },
            bot: {
                type: DataTypes.BOOLEAN,
            },
            isDelete: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            permission: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: 'identities',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            hooks: {
                beforeCreate: hashPasswordHook,
                beforeUpdate: hashPasswordHook,
            },

            classMethods: {
                associate: function(models) {
                    Identity.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            allowNull: true,
                        },
                    });
                    Identity.hasMany(models.AccessToken, {
                        as: 'AccessTokens',
                        foreignKey: {
                            name: 'identity_id',
                            allowNull: false,
                        },
                    });
                },
            },
        }
    );

    Identity.Instance.prototype.authenticate = async (self, password) => {
        const isValid = await bcrypt.compare(password, self.password_hash);
        return isValid;
    };

    Identity.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            UserId: self.UserId,
            username: self.username,
            email: self.email,
            email_token: self.email_token,
            email_is_verified: self.email_is_verified,
            mail_notification_token: self.mail_notification_token,
            isMailNotification: self.isMailNotification,
            phone_code: self.phone_code,
            phone_number: self.phone_number,
            confirmation_code: self.confirmation_code,
            phone_number_is_verified: self.phone_number_is_verified,
            country_code: self.country_code,
            password_hash: self.password_hash,
            password: self.password,
            delete_password_token: self.delete_password_token,
            twitter_id: self.twitter_id,
            twitter_username: self.twitter_username,
            verified: self.verified,
            bot: self.bot,
            isDelete: self.isDelete,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    return Identity;
};
