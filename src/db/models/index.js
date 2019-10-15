var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
var db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

const models = [
    require('./user')(sequelize, Sequelize),
    require('./identity')(sequelize, Sequelize),
    require('./heading')(sequelize, Sequelize),
    require('./answer')(sequelize, Sequelize),
    require('./search_history')(sequelize, Sequelize),
    require('./access_token')(sequelize, Sequelize),
    require('./developer')(sequelize, Sequelize),
    require('./notification')(sequelize, Sequelize),
    require('./follow')(sequelize, Sequelize),
    require('./withdrawal')(sequelize, Sequelize),
];

models.forEach(model => {
    db[model.name] = model;
});

models.forEach(model => {
    if (db[model.name].associate) {
        // console.log('entered', model.name);
        db[model.name].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (env === 'development' || env === 'staging') {
    // in dev, sync all table schema automatically for convenience
    sequelize.sync();
}

function esc(value, max_length = 256) {
    if (!value) return '';
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value;
    if (typeof value !== 'string') return '(object)';
    let res = value
        .substring(0, max_length - max_length * 0.2)
        .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
            switch (char) {
                case '\0':
                    return '\\0';
                case '\x08':
                    return '\\b';
                case '\x09':
                    return '\\t';
                case '\x1a':
                    return '\\z';
                case '\n':
                    return '\\n';
                case '\r':
                    return '\\r';
                // case '\'':
                // case "'":
                // case '"':
                // case '\\':
                // case '%':
                //     return '\\' + char; // prepends a backslash to backslash, percent, and double/single quotes
            }
            return '-';
        });
    return res.length < max_length ? res : '-';
}

db.esc = esc;

db.escAttrs = function(attrs) {
    const res = {};
    Object.keys(attrs).forEach(key => (res[key] = esc(attrs[key])));
    return res;
};

module.exports = db;
