import data_config from '@constants/data_config';
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
    var Answer = sequelize.define(
        'Answer',
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
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            HeadingId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'headings',
                    key: 'id',
                },
                field: 'heading_id',
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            body: {
                type: DataTypes.TEXT('long'),
            },
            picture: {
                type: DataTypes.BLOB('long'),
            },
            tweet_url: {
                type: DataTypes.STRING(255),
            },
            locale: {
                type: DataTypes.STRING(255),
            },
            country_code: {
                type: DataTypes.STRING(255),
            },
            //global colomn
            isMyAnswer: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isHide: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isPrivate: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            valid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            permission: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: 'answers',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,

            classMethods: {
                associate: function(models) {
                    Answer.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'user_id',
                            allowNull: true,
                        },
                    });
                    Answer.belongsTo(models.Heading, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'heading_id',
                            allowNull: false,
                        },
                    });
                },
            },
        }
    );

    Answer.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            UserId: self.UserId,
            HeadingId: self.HeadingId,
            body: self.body,
            picture: self.picture,
            tweet_url: self.tweet_url,
            locale: self.locale,
            country_code: self.country_code,
            isMyAnswer: self.isMyAnswer,
            isHide: self.isHide,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    return Answer;
};
