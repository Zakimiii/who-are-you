import { Map } from 'immutable';
import data_config from '@constants/data_config';

module.exports = function(sequelize, DataTypes) {
    var Follow = sequelize.define(
        'Follow',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            VoterId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                field: 'voter_id',
            },
            VoteredId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                field: 'votered_id',
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
            tableName: 'follows',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            classMethods: {
                associate: function(models) {
                    Follow.belongsTo(models.User, {
                        foreignKey: {
                            name: 'voter_id',
                            allowNull: false,
                        },
                    });
                    Follow.belongsTo(models.User, {
                        foreignKey: {
                            name: 'votered_id',
                            allowNull: false,
                        },
                    });
                },
            },
        }
    );

    Follow.Instance.prototype.toJSON = self => {
        return {
            VoterId: self.VoterId,
            VoteredId: self.VoteredId,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
        };
    };

    Follow.Instance.prototype.toMap = self => {
        return Map({
            VoterId: self.VoterId,
            VoteredId: self.VoteredId,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
        });
    };

    return Follow;
};
