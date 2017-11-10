var del = require('del');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    return gulp.src(['src/**/*.ts'], { base: 'src' })
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: "CommonJS",
            noImplicitAny: true,
            target: "ES6"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return del([
        'dist/**/*'
    ]);
});
