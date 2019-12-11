import data_config from '@constants/data_config';
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
    var Template = sequelize.define(
        'Template',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            body: {
                type: DataTypes.TEXT('long'),
            },
            picture: {
                type: DataTypes.BLOB('long'),
            },
            count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
            isBot: {
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
            tableName: 'templates',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            charset: 'utf8mb4',
            classMethods: {
                associate: function(models) {
                    Template.hasMany(models.Heading);
                },
            },
        }
    );

    Template.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            body: self.body,
            picture: self.picture,
            count: self.count,
            tweet_url: self.tweet_url,
            locale: self.locale,
            country_code: self.country_code,
            isHide: self.isHide,
            isBot: self.isBot,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    return Template;
};
