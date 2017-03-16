const {resolve} = require('path');

module.exports = env => ({
    context: resolve('src'),
    entry: "./js/app.js",
    output: {
        path: resolve('dist'),
        filename: "bundle.js",
        publicPath: 'dist/',
        pathinfo: !env.prod,
    },
    devtool: env.prod ?  "source-map" : 'eval',
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});