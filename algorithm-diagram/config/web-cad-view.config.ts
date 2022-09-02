var path = require('path');
var HtmlWebPackPlugin = require("html-webpack-plugin");
var AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const webpack = require('webpack');
module.exports = {
    entry: "./src/webview.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",
    resolve: {
        alias: {},
        extensions: [".ts", ".tsx", ".js", "json"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.[(png)|(jpg)|(obj)]$/, loader: "file-loader" },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({ use: 'css-loader' })
            // },
            {
                test: /\.less$/,
                use:
                    [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        {
                            loader: "less-loader",
                            options:
                            {
                                strictMath: true,
                                noIeCompat: true
                            }
                        }
                    ]
            }
        ]
    },
    // Other options...
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 7777
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.resolve(__dirname, "./manifest.json"))
        }),
        new HtmlWebPackPlugin(
            {
                title: "webCAD",
                template: 'index.html'
            }),
        new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, "./dist/dll.js") }),
        // new ExtractTextPlugin({ filename: 'styles.css' }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            ReactDOM: 'react-dom',
            React: 'react',
            THREE: "three",
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
