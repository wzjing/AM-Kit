const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: ['./src/scripts/index.js'],
    },
    output: {
        globalObject: "self",
        filename: 'scripts/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.pug',
            chunks: ['index']
        }),
        new MiniCssExtraPlugin({
            filename: 'stylesheets/[name].css',
        })
    ],
    resolve: {
        alias: {
            '@': './node_modules'
        },
        extensions: ['.js', '.css']
    },
    node: {
      fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtraPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtraPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
};

