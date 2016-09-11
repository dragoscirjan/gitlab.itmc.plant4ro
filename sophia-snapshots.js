

const path = require('path');
// const Sophia = require('sophia').Sophia;
const Sophia = require(path.join(__dirname, '../itmcdev-sophia/index')).Sophia;
const htmlSnapshots = require('html-snapshots');

const options = {
    match: /^http(s?):\/\/planteazapentruromania.ro/i,
    maxDepth: 2,
    indexMode: Sophia.INDEX_URL_MODE_QTREE,
    selectors: {
        __default: '.navbar-toggler:not(.spinner)'
    }
};

Sophia.getInstance()
    .indexUrls('https://planteazapentruromania.ro', options)
    .then((urls) => {
        console.log(urls);
        console.log(urls.length);
        // var result = htmlSnapshots.run({
        //     input: 'array',
        //     source: urls,
        //     outputDir: './snapshots',
        //     outputDirClean: true,
        //     selector: options.selectors
        // });
    });
