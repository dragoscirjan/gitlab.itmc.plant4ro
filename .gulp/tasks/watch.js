var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function() {

    gulp.watch(paths.jadeIndex,  ['build-index-jade', browserSync.reload]).on('change', reportChange);

    // gulp.watch(paths.coffee, ['build-coffee', browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.dart,   ['build-dart',   browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.js,     ['build-js',     browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.ts      ['build-ts',     browserSync.reload]).on('change', reportChange);

    gulp.watch(paths.html,   ['build-html',   browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.jade,   ['build-jade',   browserSync.reload]).on('change', reportChange);


    gulp.watch(paths.assets.css,    ['build-assets-css',    browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.assets.less,   ['build-assets-less',   browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.sass,   ['build-assets-sass',   browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.scss,   ['build-assets-scss',   browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.stylus, ['build-assets-stylus', browserSync.reload]).on('change', reportChange);

    // gulp.watch(paths.assets.coffee, ['build-assets-coffee', browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.dart,   ['build-assets-dart',   browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.assets.js,     ['build-assets-js',     browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.ts,     ['build-assets-ts',     browserSync.reload]).on('change', reportChange);

});
