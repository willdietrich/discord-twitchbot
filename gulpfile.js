let del = require('del');
let gulp = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');
let tsProject = ts.createProject("tsconfig.json");

gulp.task('default', function () {
    return gulp.src(['src/**/*.ts'], { base: 'src' })
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return del([
        'dist/**/*'
    ]);
});
