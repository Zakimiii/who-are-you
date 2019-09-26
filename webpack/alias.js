const path = require('path');

const ROOT_DIR = (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging'
) ? 'src' : 'lib';

function resolveFrontPath(...rest) {
    return path.join(__dirname, '..', ROOT_DIR, 'frontend', ...rest);
}

function resolveBackPath(...rest) {
    return path.join(__dirname, '..', ROOT_DIR,'backend', ...rest);
}

function resolveDBPath(...rest) {
    return path.join(__dirname, '..', ROOT_DIR, 'db', ...rest);
}

function resolveApplicationPath(...rest) {
    return path.join(__dirname, '..', ROOT_DIR, 'application', ...rest);
}

module.exports = {
    //config alias
    react: path.join(__dirname, '../node_modules', 'react'),
    assets: path.join(__dirname, '..', ROOT_DIR, 'assets'),
    src: path.join(__dirname, '..', ROOT_DIR),
    app: path.join(__dirname, '..', ROOT_DIR, 'frontend'),
    db: path.join(__dirname, '..', ROOT_DIR, 'db'),
    'babel-register': 'babel-core/register.js',
    '@assets': path.join(__dirname, '..', ROOT_DIR, 'assets'),

    //Application section
    '@utils': resolveApplicationPath('utils'),
    '@constants': resolveApplicationPath('constants'),
    '@locales': resolveApplicationPath('locales'),
    '@network': resolveApplicationPath('network'),
    '@extension': resolveApplicationPath('extension'),
    '@env': resolveApplicationPath('env', process.env.NODE_ENV),

    //DB section
    '@test_data': resolveDBPath('test_data'),
    '@models': resolveDBPath('models'),

    //backend section
    '@validations': resolveBackPath('validations'),
    '@handlers': resolveBackPath('data', 'handlers'),
    '@datastore': resolveBackPath('data', 'datastore'),
    '@webserver': resolveBackPath('webserver'),

    //frontend section
    '@components': resolveFrontPath('presentation', 'components'),
    '@infrastructure': resolveFrontPath('infrastructure'),
    '@cards': resolveFrontPath('presentation', 'components', 'cards'),
    '@modules': resolveFrontPath('presentation', 'components', 'modules'),
    '@elements': resolveFrontPath('presentation', 'components', 'elements'),
    '@pages': resolveFrontPath('presentation', 'components', 'pages'),
    '@entity': resolveFrontPath('domain', 'entity'),
    '@usecase': resolveFrontPath('domain', 'usecase'),
    '@repository': resolveFrontPath('domain', 'repository'),
    '@redux': resolveFrontPath('presentation', 'redux'),
};
