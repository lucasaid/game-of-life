var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

 module.exports = {
     entry: './source/js/main.js',
     output: {
         path: path.resolve(__dirname, 'public'),
         filename: 'main.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             },
             {
                 test: /\.scss$/,
                 loader: ExtractTextPlugin.extract(['css','sass','style'])
             }
         ]
     },
     plugins: [
         new ExtractTextPlugin('public/style.css')
     ],
     stats: {
         colors: true
     },
     devtool: 'source-map',
     devServer: {
       publicPath: "/",
       contentBase: "./public",
     },
 };
