const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const writeStats = require('./utils/write-stats');
const es6_modules = require('./utils/es6_modules');
const alias = require('./alias');

const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const webpack_isomorphic_tools_plugin =
    new Webpack_isomorphic_tools_plugin(require('./webpack-isotools-config'))
        .development();

const css_loaders = [
    {
        loader: 'style-loader',
    },
    {
        loader: 'css-loader',
    },
    {
        loader: 'autoprefixer-loader'
    }
]

const scss_loaders = [
    {
        loader: 'css-loader',
    },
    {
        loader: 'autoprefixer-loader'
    },
    {
        loader: 'sass-loader'
    }
]

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/frontend/infrastructure/Main.js'],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'bytebuffer',
            'immutable',
            'autolinker',
            'pako',
            'remarkable',
            'picturefill'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].js',
        publicPath: '/assets/'
    },
    module: {
        exprContextRegExp: /$^/,
        exprContextCritical: false,
        rules: [
            {test: /\.(jpe?g|png)/, use: 'url-loader?limit=4096'},
            {test: /\.json$/, use: 'json-loader'},
            {
                test: /\.js$|\.jsx$/,
                exclude: {
                  include: /(node_modules|bower_compontents)/,
                  // exclude: es6_modules,
                },
                use: 'babel-loader',
            },
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {
                test: require.resolve("blueimp-file-upload"),
                use: "imports?define=>false"
            },
            {
                test: /\.css$/,
                use: css_loaders
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: scss_loaders
                })
            },
            {
                test: /\.md/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        function () {
            this.plugin('done', writeStats);
        },
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
           names: 'vendor',
           chunks: ['app', 'vendor'],
           minChunks: Infinity
        }),
        webpack_isomorphic_tools_plugin,
        new ExtractTextPlugin('[name]-[chunkhash].css')
    ],
    resolve: {
        alias,
        extensions: ['.js', '.json', '.jsx'],
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules'
        ]
    },
    node: {
        // net: true,
        child_process: "empty",
        tls: "empty",
        dns: "empty",
        fs: "empty",
        __dirname: true,
    },
    externals: {
        newrelic: true,
    },
};
