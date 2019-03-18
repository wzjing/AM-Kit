let config = require('./webpack.config');

Object.assign(config, {
    devServer: {
        port: 80,
        contentBase: './dist'
    },
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    }
});

module.exports = config;