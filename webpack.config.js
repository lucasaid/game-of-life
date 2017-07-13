var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

 module.exports = {
     entry: './source/js/main.ts',
     output: {
         path: path.resolve(__dirname, 'public'),
         filename: 'main.bundle.js'
     },
     resolve: {
        extensions: ['.scss', '.ts', '.js']
     },
     module: {
         loaders: [
             { test: /\.ts?$/, loader: "ts-loader" },
             {
               test: /\.scss$/,
               loader: 'sass-loader'
             },
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map',
     devServer: {
       publicPath: "/",
       contentBase: "./public",
     },
 };
