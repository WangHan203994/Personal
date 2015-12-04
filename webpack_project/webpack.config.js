/**
 * Author : ginko
 * Date : 15/12/4
 * Description :
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/main.js'),
        // 当 React 作为一个 node 模块安装的时候，
        // 我们可以直接指向它，就比如 require('react')
        vendor: ['react','react-dom']
    },
    module:{
        loaders:[
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                query: {
                    presets: ['react', "es2015"]
                },
                exclude: [ node_modules_dir ]
            },{
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    //plugins : [
    //    new HtmlWebpackPlugin({
    //        title : 'react_project',
    //        filename : 'index.html',
    //        inject : [
    //            'http://localhost:8080/webpack-dev-server.js'
    //        ]
    //    })
    //]
    plugins : [
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ],
    devServer: {
        contentBase: './dist'
    },
    //externals: {
    //    'react': 'window.React',
    //    'react-dom': 'window.ReactDOM'
    //},
    output: {
        path: 'dist',
        filename: 'app.bundle.js',
        chunkFilename: '[name].js'
    }
};