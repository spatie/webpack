module.exports = require('../webpack.config')({
    entry: {
        'js/app': './resources/js/app.js',
        'css/app': './resources/css/app.css',
    },

    output: {
        // This line isn't necessary in a default Laravel installation
        path: `${__dirname}/public`,
    },
});
