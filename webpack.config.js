const path = require('path');

module.exports = {
    entry:  './src/scripts/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/scripts'),
        publicPath: '/scripts/'
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000
    },
    mode: "production",
    devtool: "sourcemap"
};

