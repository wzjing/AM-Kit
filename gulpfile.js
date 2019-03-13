const gulp = require('gulp');
const connect = require('gulp-connect');
const pug = require('gulp-pug');
const del = require('del');
const watch = require('gulp-watch');

function copy() {
    return gulp.src(['./src/**/*.css', './src/**/*.js'], {base: './src'})
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
}

function compilePug() {
    return gulp.src(['./src/**/*.pug'], {base: './src'})
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
}

function clean() {
    return del(['./dist/*'], {read: false, allowEmpty: true});
}

function server() {
    return connect.server({
        root: './dist',
        host: '0.0.0.0',
        port: 80,
        debug: true,
        livereload: true
    });
}

function watchPug() {
    return watch('./src/**/*.pug', gulp.parallel(compilePug));
}

function watchJsCss() {
    return watch(['./src/**/*.js', './src/**/*.css'], gulp.parallel(copy));
}

let build = gulp.series(clean, gulp.parallel(compilePug, copy), gulp.parallel(server, watchPug, watchJsCss));

exports.copy = copy;
exports.compilePug = compilePug;
exports.clean = clean;
exports.server = server;
exports.watchPug = watchPug;
exports.watchJsCss = watchJsCss;

exports.default = build;

