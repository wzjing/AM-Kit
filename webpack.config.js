const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/scripts/index.js',
        pager: './src/scripts/pager.js'
    },
    output: {
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
        new HtmlWebpackPlugin({
            filename: "pager.html",
            template: "./src/pager.pug",
            chunks: ['pager']
        }),
        new MiniCssExtraPlugin({
            filename: 'stylesheets/[name].css',
        })
    ],
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
                    'sass-loader'
                ]
            }
        ]
    },
};

