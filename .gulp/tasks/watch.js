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

    // gulp.watch(paths.jadeIndex,  ['build-index-jade', browserSync.reload]).on('change', reportChange);

    // gulp.watch(paths.com.coffee, ['build-com-coffee', browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.com.dart,   ['build-com-dart',   browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.com.js,     ['build-com-js',     browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.com.ts      ['build-com-ts',     browserSync.reload]).on('change', reportChange);

    gulp.watch(paths.com.html,   ['build-com-html',   browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.com.jade,   ['build-com-jade',   browserSync.reload]).on('change', reportChange);


    gulp.watch(paths.assets.css,    ['build-css',    browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.assets.less,   ['build-less',   browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.sass,   ['build-sass',   browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.scss,   ['build-scss',   browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.stylus, ['build-stylus', browserSync.reload]).on('change', reportChange);

    // gulp.watch(paths.assets.coffee, ['build-coffee', browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.dart,   ['build-dart',   browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.assets.js,     ['build-js',     browserSync.reload]).on('change', reportChange);
    // gulp.watch(paths.assets.ts,     ['build-ts',     browserSync.reload]).on('change', reportChange);

});
