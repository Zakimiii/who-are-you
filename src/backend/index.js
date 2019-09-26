const path = require('path');
const ROOT = path.join(__dirname, '../..');
const ROOT_DIR = process.env.NODE_ENV === 'production' ? 'lib' : 'src';
const extension = require(`${ROOT}/${ROOT_DIR}/application/extension`);

// Tell `require` calls to look into `/app` also
// it will avoid `../../../../../` require strings

// use Object.assign to bypass transform-inline-environment-variables-babel-plugin (process.env.NODE_PATH= will not work)
Object.assign(process.env, { NODE_PATH: path.resolve(__dirname, '..') });

require('module').Module._initPaths();

// Load Intl polyfill
// require('utils/intl-polyfill')(require('./config/init').locales);

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const WebpackIsomorphicToolsConfig = require('../../webpack/webpack-isotools-config');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
    WebpackIsomorphicToolsConfig
);

global.webpackIsomorphicTools.server(ROOT, () => {
    try {
        require('./webserver/server');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});
