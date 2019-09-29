const data_config = require('@constants/data_config');
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(
        'User',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            username: {
                type: DataTypes.STRING(126),
            },
            nickname: {
                type: DataTypes.STRING(255),
            },
            detail: {
                type: DataTypes.TEXT('long'),
            },
            picture_small: {
                type: DataTypes.STRING(255),
            },
            picture_large: {
                type: DataTypes.STRING(255),
            },
            notification_id: {
                type: DataTypes.STRING(255),
            },
            locale: {
                type: DataTypes.STRING(255),
            },
            country_code: {
                type: DataTypes.STRING(255),
            },
            timezone: {
                type: DataTypes.STRING(255),
            },
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            bot: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isPrivate: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            permission: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Heading);
                    User.hasMany(models.SearchHistory);
                    User.hasMany(models.Answer);
                    User.hasOne(models.Identity);
                    User.hasMany(models.Heading, {
                        as: 'VoteHeadings',
                        foreignKey: {
                            name: 'voter_id',
                            allowNull: true,
                        },
                    });
                },
            },
        }
    );

    User.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            username: self.username,
            nickname: self.nickname,
            detail: self.detail,
            picture_small: self.picture_small,
            picture_large: self.picture_large,
            locale: self.locale,
            country_code: self.country_code,
            timezone: self.timezone,
            verified: self.verified,
            bot: self.bot,
            isPrivate: self.isPrivate,
            permission: self.permission,
            notification_id: self.notification_id,
            created_at: self.created_at,
            updated_at: self.updated_at,
        };
    };

    return User;
};
