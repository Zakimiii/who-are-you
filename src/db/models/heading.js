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
            text: {
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
                defaultValue: 1,
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
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
        },
        {
            tableName: 'headings',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,

            classMethods: {
                associate: function(models) {
                    Heading.belongsTo(models.Identity, {
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

    Heading.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            UserId: self.UserId,
            text: self.text,
            locale: self.locale,
            country_code: self.country_code,
            answer_count: self.answer_count,
            count: self.count,
            isHide: self.isHide,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    return Heading;
};
