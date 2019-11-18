import data_config from '@constants/data_config';
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
    var Community = sequelize.define(
        'Community',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            CategoryId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'categories',
                    key: 'id',
                },
                field: 'category_id',
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            body: {
                type: DataTypes.TEXT('long'),
            },
            picture: {
                type: DataTypes.BLOB('long'),
            },
            heading_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            answer_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
            tableName: 'communities',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            charset: 'utf8mb4',
            classMethods: {
                associate: function(models) {
                    Community.hasMany(models.CommunityHeading);
                    Community.belongsTo(models.Category, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'category_id',
                            allowNull: true,
                        },
                    });
                },
            },
        }
    );

    Community.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            CategoryId: self.CategoryId,
            body: self.body,
            picture: self.picture,
            heading_count: self.heading_count,
            answer_count: self.answer_count,
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

    return Community;
};
