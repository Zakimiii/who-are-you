const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const hashPasswordHook = (developer, options, callback) => {
    if (developer.get('password') == '') return callback(null, options);
    bcrypt.hash(developer.get('password'), 10, (err, hash) => {
        if (err) return callback(err);
        developer.set('password_hash', hash);
        developer.set('password', '');
        return callback(null, options);
    });
};

module.exports = function(sequelize, DataTypes) {
    var Developer = sequelize.define(
        'Developer',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            api_key: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: uuidv4(),
                unique: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                defaultValue: '',
            },
            token: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            email_is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            last_attempt_verify_email: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
            phone_number: {
                type: DataTypes.STRING(255),
                unique: true,
                defaultValue: uuidv4(),
            },
            phone_number_is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            last_attempt_verify_phone_number: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
            phone_code_attempts: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            country_code: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            phone_code: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            account_is_created: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            confirmation_code: {
                type: DataTypes.STRING(255),
                defaultValue: '',
            },
            username: {
                type: DataTypes.STRING(255),
                unique: true,
                defaultValue: '',
            },
            username_booked_at: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
            password_hash: {
                type: DataTypes.STRING(255),
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
                validate: {
                    min: 8,
                    max: 32,
                },
            },
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            bot: {
                type: DataTypes.BOOLEAN,
            },
            permission: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: 'developers',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
            underscored: true,
            hooks: {
                beforeCreate: hashPasswordHook,
                beforeUpdate: hashPasswordHook,
            },

            classMethods: {
                associate: function(models) {},
            },
        }
    );

    Developer.Instance.prototype.authenticate = async (self, password) => {
        const isValid = await bcrypt.compare(password, self.password_hash);
        return isValid;
    };

    Developer.Instance.prototype.toJSON = self => {
        return {
            id: self.id,
            api_key: self.api_key,
            email: self.email,
            token: self.token,
            email_is_verified: self.email_is_verified,
            last_attempt_verify_email: self.last_attempt_verify_email,
            phone_number: self.phone_number,
            phone_number_is_verified: self.phone_number_is_verified,
            last_attempt_verify_phone_number:
                self.last_attempt_verify_phone_number,
            phone_code_attempts: self.phone_code_attempts,
            phone_code: self.phone_code,
            country_code: self.country_code,
            username: self.username,
            permission: self.permission,
            account_is_created: self.account_is_created,
            confirmation_code: self.confirmation_code,
            username_booked_at: self.username_booked_at,
            password_hash: self.password_hash,
            password: self.password,
            verified: self.verified,
            bot: self.bot,
            permission: self.permission,
        };
    };

    Developer.Instance.prototype.last_step = self => {};

    return Developer;
};
