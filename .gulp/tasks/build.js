var fs = require('fs');

var paths = require('../paths');

var gulp = require('gulp');

var assign = Object.assign || require('object.assign');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var data = require('gulp-data');
var jade = require('gulp-jade');
var less = require('gulp-less');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
var rjs = require('gulp-rjs');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-babel');

var babelOptions = require('../babel-options');
var jadeOptions = require('../jade-options');
var lessOptions = require('../less-options');

gulp.task('build-index-jade', function() {
    return gulp.src(paths.jadeIndex)
        .pipe(jade(jadeOptions))
        .pipe(changed('.', {extension: '.html'}))
        .pipe(gulp.dest('.'))
});


/*
 * transpiles changed es6 files to SystemJS format
 * the plumber() call prevents 'pipe breaking' caused
 * by errors from other gulp plugins
 * https://www.npmjs.com/package/gulp-plumber
 */
gulp.task('build-com-js', function() {
    return gulp.src(paths.com.js)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(to5(assign({}, babelOptions, {modules: 'system'})))
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(paths.output));
});


gulp.task('build-com-jade', function() {
    return gulp.src(paths.com.jade)
        .pipe(data(function(file) {
            try {
                return require(file.path + '.json');
            } catch (e) {
                return {};
            }
        }))
        .pipe(jade(jadeOptions))
        .pipe(changed(paths.output, {extension: '.html'}))
        .pipe(gulp.dest(paths.output))
});

// copies changed html files to the output directory
gulp.task('build-com-html', function() {
    return gulp.src(paths.com.html)
        .pipe(changed(paths.output, {extension: '.html'}))
        .pipe(gulp.dest(paths.output));
});



// copies changed css files to the output directory
gulp.task('build-css', function() {
    return gulp.src(paths.assets.css)
        .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.assets.output.styles))
        .pipe(browserSync.stream());
});

gulp.task('build-less', function() {
    return gulp.src(paths.assets.less)
        .pipe(less(lessOptions))
        .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.assets.output.styles))
        .pipe(browserSync.stream());
});


gulp.task('build-js', function() {
    return gulp.src(paths.assets.js)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(paths.assets.output.scripts, {extension: '.js'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(to5())
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(paths.assets.output.scripts));
});

gulp.task('copy-images-styles', function() {
    return gulp.src(paths.assets.stylesImages)
        // .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.assets.output.stylesImages))
        .pipe(browserSync.stream());
});

gulp.task('copy-images-content', function() {
    return gulp.src(paths.assets.contentImages)
        // .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.assets.output.contentImages))
        .pipe(browserSync.stream());
});

gulp.task('copy-plugins', function() {
    return gulp.src(paths.assets.plugins)
        // .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.assets.output.plugins))
        // .pipe(browserSync.stream())
        ;
});

gulp.task('copy-fonts', function() {
    return gulp.src(paths.assets.fonts)
        // .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.assets.output.fonts))
        .pipe(browserSync.stream());
});

// gulp.task('copy-plugins-js', function() {
//     return gulp.src(paths.assets.pluginsJs)
//         // .pipe(changed(paths.output, {extension: '.css'}))
//         .pipe(gulp.dest(paths.assets.output.plugins))
//         .pipe(rjs({baseUrl:paths.assets.output.plugins}));
// });

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    [
        'build-index-jade',
        'build-com-js', 'build-com-html', 'build-com-jade',
        'build-css', 'build-less', 'build-js',
        'copy-images-styles', 'copy-images-content', 'copy-plugins', 'copy-fonts'//, 'copy-plugins-js'
    ],
    callback
  );
});
