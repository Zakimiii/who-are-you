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
            locale: {
                type: DataTypes.STRING(255),
            },
            country_code: {
                type: DataTypes.STRING(255),
            },
            //global colomn
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
                    Answer.belongsTo(models.Identity, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'identity_id',
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
            locale: self.locale,
            country_code: self.country_code,
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
