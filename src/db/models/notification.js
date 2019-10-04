import data_config from '@constants/data_config';
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
    var Notification = sequelize.define(
        'Notification',
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
            template: {
                type: DataTypes.STRING(255),
            },
            target_table: {
                type: DataTypes.STRING(255),
            },
            target_id: {
                type: DataTypes.INTEGER,
            },
            url: {
                type: DataTypes.STRING(255),
            },
            isChecked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: 'notifications',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            charset: 'utf8mb4',
            classMethods: {
                associate: function(models) {
                    Notification.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            name: 'user_id',
                            allowNull: false,
                        },
                    });
                },
            },
        }
    );

    Notification.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            UserId: self.UserId,
            template: self.template,
            target_table: self.target_table,
            target_id: self.target_id,
            url: self.url,
            isChecked: self.isChecked,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    return Notification;
};
