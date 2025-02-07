const webpack = require('webpack');
module.exports = {
    entry: "./ex05/webpack",
    output: {
        path: "./ex05/webpack/dist",
        filename: "main.js",
        publishPath: "dist"
    },
    mode: "development",
    devtool: "source-map",
}