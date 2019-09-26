module.exports = function(sequelize, DataTypes) {
    var SearchHistory = sequelize.define(
        'SearchHistory',
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
            },
            title: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            meta: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            table_name: {
                type: DataTypes.STRING(255),
            },
        },
        {
            tableName: 'searchHistories',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            classMethods: {
                associate: function(models) {
                    SearchHistory.belongsTo(models.User, {
                        onDelete: 'CASCADE',
                        foreignKey: {
                            allowNull: true,
                        },
                    });
                },
            },
        }
    );

    SearchHistory.Instance.prototype.toJSON = self => {
        return {
            UserId: self.UserId,
            title: self.title,
            meta: self.meta,
            table_name: self.table_name,
        };
    };

    return SearchHistory;
};
