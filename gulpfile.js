const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const del = require('del');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

function clean() {
    return del(['./dist/**', '!./dist']);
}

function css() {
    return gulp.src(['./src/**/*.css'], {base: './src'})
        .pipe(sass())
        .pipe(gulp.dest('./dist'));
}

function html() {
    return gulp.src(['./src/**/*.pug'], {base: './src'})
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./dist'));
}

function server() {
    return new Promise(resolve => {
        new webpackDevServer(webpack(webpackConfig), {
            publicPath: webpackConfig.output.publicPath,
            contentBase: './dist',
            stats: {
                colors: true
            }
        }).listen('80', 'localhost', (err) => {
            if (err) throw Error(err);
            resolve()
        })
    })
}

let build = gulp.series(clean, gulp.parallel(html, css));
let run = gulp.series(build, server);

exports.clean = clean;
exports.build = build;

exports.default = run;

