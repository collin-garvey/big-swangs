var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var paths = {
    scripts: ['src/js/**/*.js'],
    styles: ['src/scss/*.scss']
};

var onError = function(err) {
    console.log(err);
};

gulp.task('styles', function(){
    return gulp.src(paths.styles)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ onLast: true, message: 'Styles compiled.' }))
        .on('error', notify.onError("Error: <%= error.message %>"));
});

gulp.task('scripts', function(){
    return gulp.src(paths.scripts)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ onLast: true, message: 'Scripts compiled.' }))
        .on('error', notify.onError("Error: <%= error.message %>"));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);