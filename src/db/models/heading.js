import data_config from '@constants/data_config';
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
    var Heading = sequelize.define(
        'Heading',
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
            TemplateId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'templates',
                    key: 'id',
                },
                field: 'template_id',
                onUpdate: 'cascade',
                onDelete: 'set null',
            },
            VoterId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                field: 'voter_id',
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            body: {
                type: DataTypes.TEXT('long'),
            },
            locale: {
                type: DataTypes.STRING(255),
            },
            country_code: {
                type: DataTypes.STRING(255),
            },
            picture: {
                type: DataTypes.BLOB('long'),
            },
            tweet_url: {
                type: DataTypes.STRING(255),
            },
            answer_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            //global colomn
            isHide: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isBot: {
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
            tableName: 'headings',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            charset: 'utf8mb4',
            classMethods: {
                associate: function(models) {
                    Heading.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'user_id',
                            allowNull: false,
                        },
                    });
                    Heading.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'voter_id',
                            allowNull: true,
                        },
                        as: 'Voter',
                    });
                    Heading.belongsTo(models.Template, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'template_id',
                            allowNull: true,
                        },
                    });
                    Heading.hasMany(models.Answer);
                },
            },
        }
    );

    Heading.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            UserId: self.UserId,
            VoterId: self.VoterId,
            TemplateId: self.TemplateId,
            body: self.body,
            locale: self.locale,
            tweet_url: self.tweet_url,
            picture: self.picture,
            country_code: self.country_code,
            answer_count: self.answer_count,
            isHide: self.isHide,
            isBot: self.isBot,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    return Heading;
};
