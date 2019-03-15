const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require('del');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const path = require('path');

function copy() {
    return gulp.src(['./src/**/*.css'], {base: './src'})
        .pipe(gulp.dest('./dist'));
}

function compilePug() {
    return gulp.src(['./src/**/*.pug'], {base: './src'})
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./dist'));
}

function clean() {
    return del(['./dist/**', '!./dist']);
}

function run() {
    console.log(`Mode: ${webpackConfig.mode}`);
    return new Promise(resolve => {
        new webpackDevServer(webpack(webpackConfig), {
            publicPath: webpackConfig.output.publicPath,
            contentBase: './dist',
            stats: {
                colors: true
            }
        }).listen('80', 'localhost', (err) => {
            if (err) throw Error(err)
        })
    })
}

// let build = gulp.series(clean, gulp.parallel(compilePug, copy), gulp.parallel(server, watchPug, watchJsCss));
let build = gulp.series(clean, gulp.parallel(compilePug, copy), run);

exports.copy = copy;
exports.compilePug = compilePug;
exports.clean = clean;

exports.default = build;

