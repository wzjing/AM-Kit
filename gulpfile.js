const gulp = require('gulp')
const pump = require('pump')
const connect = require('gulp-connect')
const pug = require('gulp-pug')
const clean = require('gulp-clean')
const watch = require('gulp-watch')

function finish(err) {
    if (err !== undefined) {
        console.log(err.red)
    }
}

gulp.task('copy', () => {
    return pump(
        gulp.src(['./src/**/*.css', './src/**/*.js'], { base: './src' }),
        gulp.dest('./dist'),
        connect.reload(),
        finish
    )
})

gulp.task('pug', () => {
    return pump(
        gulp.src(['./src/**/*.pug'], { base: './src' }),
        pug({ pretty: true }),
        gulp.dest('./dist'),
        connect.reload(),
        finish
    )
});

gulp.task('clean', () => {
    return pump(
        gulp.src(['./dist/*'], { read: false, allowEmpty: true }),
        clean(),
        finish
    )
});

gulp.task('server', () => {
    return connect.server({
        root: './dist',
        host: '0.0.0.0',
        port: 80,
        debug: true,
        livereload: true
    })
})

gulp.task('watchPug', () => {
	return watch('./src/**/*.pug', gulp.parallel('pug'))
})

gulp.task('watchJsCss', () => {
	return watch(['./src/**/*.js', './src/**/*.css'], gulp.parallel('copy'))
})

gulp.task('default', gulp.series('clean', gulp.parallel('pug', 'copy'), gulp.parallel('server', 'watchPug', 'watchJsCss')))
