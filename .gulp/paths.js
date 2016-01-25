
var appRoot = 'src/';

var appOutput = 'dist/';

module.exports = {

    root: appRoot + '../',

    jadeIndex: './index.jade',

    assets: {
        css:    appRoot + 'assets/styles/**/*.css',
        less:   appRoot + 'assets/styles/**/*.less',
        sass:   appRoot + 'assets/styles/**/*.sass',
        scss:   appRoot + 'assets/styles/**/*.scss',
        stylus: appRoot + 'assets/styles/**/*.stylus',

        dart:   appRoot + "assets/scripts/**/*.dart",
        coffee: appRoot + "assets/scripts/**/*.coffee",
        js:     appRoot + "assets/scripts/**/*.js",
        ts:     appRoot + "assets/scripts/**/*.ts",

        output: {
            styles:  appOutput + 'assets/styles/',
            scripts: appOutput + 'assets/scripts/',
        }
    },

    com: {
        html: appRoot + '**/*.html',
        jade: appRoot + "**/*.jade",

        dart:   appRoot + "**/*.dart",
        coffee: appRoot + "**/*.coffee",
        js:     appRoot + "**/*.js",
        ts:     appRoot + "**/*.ts",
    },

    output: appOutput,

    exportSrv: './export/',

    doc: './doc',
    e2eSpecsSrc: 'test/e2e/src/**/*.js',
    e2eSpecsDist: 'test/e2e/dist/'
};
