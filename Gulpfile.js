var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: ['src/js/**/*.js'],
    styles: ['src/scss/*.scss']
};

gulp.task('styles', function(){
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);