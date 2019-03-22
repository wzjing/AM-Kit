const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

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
        new MonacoWebpackPlugin({
            languages: ['javascript']
        })
    ],
    resolve: {
        alias: {
            // "vs/basic-languages/src": path.resolve(__dirname, 'node_modules/monaco-languages/release'),
            vs: path.resolve(__dirname, 'vscode')
            // vs: path.resolve(__dirname, 'node_modules/monaco-editor/dev/vs')
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
                    'style-loader',
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
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
};

