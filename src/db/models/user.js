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
            heading_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            answer_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            twitter_id: {
                type: DataTypes.STRING(255),
            },
            twitter_username: {
                type: DataTypes.STRING(255),
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
            charset: 'utf8mb4',
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Heading);
                    User.hasMany(models.SearchHistory);
                    User.hasMany(models.Answer);
                    User.hasMany(models.CommunityAnswer, {
                        as: 'CommunityAnswers',
                        foreignKey: {
                            name: 'user_id',
                            allowNull: true,
                        },
                    });
                    User.hasOne(models.Identity);
                    User.hasOne(models.Notification);
                    User.hasMany(models.Heading, {
                        as: 'VoteHeadings',
                        foreignKey: {
                            name: 'voter_id',
                            allowNull: true,
                        },
                    });
                    User.hasMany(models.CommunityHeading, {
                        as: 'VoteCommunityHeadings',
                        foreignKey: {
                            name: 'voter_id',
                            allowNull: true,
                        },
                    });
                    User.hasMany(models.Follow, {
                        foreignKey: {
                            name: 'voter_id',
                            allowNull: false,
                        },
                    });
                    User.hasMany(models.Follow, {
                        foreignKey: {
                            name: 'votered_id',
                            allowNull: false,
                        },
                    });
                    User.belongsToMany(models.User, {
                        as: 'Followers',
                        through: 'Follow',
                        foreignKey: 'voter_id',
                        otherKey: 'votered_id',
                    });
                    User.belongsToMany(models.User, {
                        as: 'Follows',
                        through: 'Follow',
                        foreignKey: 'votered_id',
                        otherKey: 'voter_id',
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
            twitter_id: self.twitter_id,
            twitter_username: self.twitter_username,
            heading_count: self.heading_count,
            answer_count: self.answer_count,
            created_at: self.created_at,
            updated_at: self.updated_at,
        };
    };

    return User;
};
