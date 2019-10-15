import { Map } from 'immutable';
import data_config from '@constants/data_config';

module.exports = function(sequelize, DataTypes) {
    var Withdrawal = sequelize.define(
        'Withdrawal',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            twitter_username: {
                type: DataTypes.STRING(255),
            },
            twitter_id: {
                type: DataTypes.STRING(255),
            },
            valid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: 'withdrawals',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            classMethods: {
                associate: function(models) {},
            },
        }
    );

    Withdrawal.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            twitter_username: self.twitter_username,
            twitter_id: self.twitter_id,
            valid: self.valid,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        };
    };

    Withdrawal.Instance.prototype.toMap = self => {
        return Map({
            id: self.id,
            twitter_username: self.twitter_username,
            twitter_id: self.twitter_id,
            valid: self.valid,
            createdAt: self.createdAt,
            updatedAt: self.updatedAt,
        });
    };

    return Withdrawal;
};
