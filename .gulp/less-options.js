var paths = require('./paths');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

module.exports = {
    'paths': [paths.assets.less],
    'plugins': [autoprefix]
};
