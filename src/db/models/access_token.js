import data_config from '@constants/data_config';
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

module.exports = function(sequelize, DataTypes) {
    var AccessToken = sequelize.define(
        'AccessToken',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            IdentityId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'identites',
                    key: 'id',
                },
                field: 'identity_id',
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            token: {
                type: DataTypes.STRING(255),
            },
            client_id: {
                type: DataTypes.STRING(255),
            },
            expired_at: {
                type: DataTypes.DATE,
            },
            meta: {
                type: DataTypes.STRING(255),
            },
            isOneTime: {
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
            tableName: 'accessTokens',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,

            classMethods: {
                associate: function(models) {
                    AccessToken.belongsTo(models.Identity, {
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

    AccessToken.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            IdentityId: self.IdentityId,
            token: self.token,
            client_id: self.client_id,
            expired_at: self.expired_at,
            meta: self.meta,
            isOneTime: self.isOneTime,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    return AccessToken;
};
