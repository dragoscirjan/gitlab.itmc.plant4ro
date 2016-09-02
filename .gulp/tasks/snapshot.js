var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var mkdir = require('mkdir-recursive');
var paths = require('../paths');
var path = require('path');
var sm = sm = require('sitemap');

var Dalia = require('dalia').Dalia;

var baseUrl = 'http://planteazapentruromania.local';

var options = {
    match: new RegExp(baseUrl, 'i'),
    // maxDepth: 0,
    maxDepth: 2,
    selectors: {
        __default: '.au-target'
    },
    checkInterval: 500
}

var sitemapOptions = {
    hostname: baseUrl,
    cacheTime: 600000, // 600 sec - cache purge period
    urls: []
};

gulp.task('snapshot', function() {

    del(paths.snapshots);

    var dalia = Dalia.getInstance();

    // dalia.on('dalia:pre:urlValidate', function(self, options, ourl) {
    //   ourl.url = ourl.url.replace(/#.*/g, '').replace(/\/$/g, '');
    // });

    dalia.on('dalia:phantom:resultDiscovered', function(self, options, cUrl, result) {
        var url = cUrl.url
            .replace(/^http(s?):\/\//, '')
            .replace('/\?.*/g', '++')
            .split('/');
        url.shift();
        url.unshift('snapshots');

        var outputPath = path.join(url.join('/').replace('/#', ''));
        self.getLogger().info('Creating directory for', outputPath);

        mkdir.mkdirSync(outputPath);
        self.getLogger().info('Created', outputPath);

        outputPath = path.join(outputPath, 'index.html');
        self.getLogger().info('Writing', JSON.stringify(cUrl), 'to', outputPath);

        fs.writeFileSync(outputPath, result.content);
        self.getLogger().info('Url', JSON.stringify(cUrl), 'written to', outputPath);
    });

    return dalia
        .indexUrls(baseUrl, options)
        .then(function(urls) {
            // sitemapOptions.urls = urls.map(url => { return { url: url.replace(/^http(s?):\/\/[^\/]*/, ''), changefreq: 'weekly', priority: 0.8 } });
            sitemapOptions.urls = urls.map(function(url) { return { url: url, changefreq: 'weekly', priority: 0.8 } });
            var sitemap = sm.createSitemap(sitemapOptions);
            fs.writeFileSync(path.join(paths.root, '../sitemap.xml'), sitemap.toString());
            console.log(JSON.stringify(urls), 'have been indexed');

            return urls;
        }, function(err) { console.log(err.toString()); })
        .then(function(urls) {
            var robotsSitemapOptions = sitemapOptions;
            robotsSitemapOptions.urls = urls.map(function(url) { return { url: url.replace(baseUrl + '/', paths.snapshots), changefreq: 'weekly', priority: 0.8 } });
            var sitemap = sm.createSitemap(robotsSitemapOptions);
            fs.writeFileSync(path.join(paths.root, '../robots-sitemap.xml'), sitemap.toString());
            console.log('Robots sitemap has been created');
        }, function(err) { console.log(err.toString()); })
        .catch(function(err){ console.log(err.toString()); });
});
