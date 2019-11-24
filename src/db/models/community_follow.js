import { Map } from 'immutable';
import data_config from '@constants/data_config';

module.exports = function(sequelize, DataTypes) {
    var CommunityFollow = sequelize.define(
        'CommunityFollow',
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
            VotedId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'communities',
                    key: 'id',
                },
                field: 'voted_id',
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
            tableName: 'communityFollows',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            classMethods: {
                associate: function(models) {
                    CommunityFollow.belongsTo(models.User, {
                        foreignKey: {
                            name: 'voter_id',
                            allowNull: false,
                        },
                    });
                    CommunityFollow.belongsTo(models.Community, {
                        foreignKey: {
                            name: 'voted_id',
                            allowNull: false,
                        },
                    });
                },
            },
        }
    );

    CommunityFollow.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            VoterId: self.VoterId,
            VotedId: self.VotedId,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    CommunityFollow.Instance.prototype.toMap = self => {
        return Map({
            id: self.id,
            VoterId: self.VoterId,
            VotedId: self.VotedId,
            isPrivate: self.isPrivate,
            valid: self.valid,
            permission: self.permission,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        });
    };

    return CommunityFollow;
};
