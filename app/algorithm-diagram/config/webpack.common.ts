import AddAssetHtmlPlugin from "add-asset-html-webpack-plugin";
import CleanTerminalPlugin from "clean-terminal-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import * as path from 'path';
import * as webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { DIST_DIR } from "./config";

export const buildVersion = new Date().toLocaleString();

function resolve(fileName: string)
{
    return path.resolve(__dirname, fileName);
}

const TS_LOADER = [
    { loader: 'cache-loader', options: { cacheDirectory: "node_modules/.cache_loader" } },
    {
        loader: 'ts-loader',
        options: {
            transpileOnly: true,
            experimentalWatchApi: true,
        },
    }
];

const config: webpack.Configuration = {
    cache: {
        type: 'filesystem',
    },
    entry: "./src/index.tsx",
    output: {
        filename: "[contenthash].main.js",
        path: resolve(DIST_DIR),//虽然不需要提供 但是如果不提供CleanWebpackPlugin就坏了
        publicPath: "",
        globalObject: "this"
    },
    resolve: {
        // alias: {
        //     "dat.gui": resolve('../node_modules/dat.gui/build/dat.gui.js'),
        // },
        extensions: [".ts", ".tsx", ".js", "json"]
    },
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'worker-loader', },
                    ...TS_LOADER
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: TS_LOADER,
            },
            {
                test: /\.[(png)|(obj)|(json)]$/,
                loader: "file-loader"
            },
            //样式加载 css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //样式加载 less
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader', options: { sourceMap: false } },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                strictMath: true,
                                noIeCompat: true
                            }
                        }
                    }
                ]
            },
            //字体加载 blueprint
            {
                test: /\.(ttf|eot|svg|FBX)$/,
                use: {
                    loader: 'file-loader',
                    options: { name: 'fonts/[contenthash].[ext]' }
                }
            },
            //字体加载 blueprint
            {
                test: /\.(woff|woff2|jpg|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[contenthash].[ext]',
                        limit: 5000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            {
                test: /\.(glsl|vs|fs)$/,
                loader: 'shader-loader'
            }
        ]
    },
    externals: {
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: "webCAD",
            template: resolve('../src/index.html')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(`${DIST_DIR}/manifest.json`)
        }),
        new AddAssetHtmlPlugin(
            [
                {
                    filepath: "./src/loading.css",
                    typeOfAsset: "css",
                },
                {
                    filepath: "./node_modules/normalize.css/normalize.css",
                    typeOfAsset: "css",
                },
                {
                    filepath: "./node_modules/@blueprintjs/core/lib/css/blueprint.css",
                    typeOfAsset: "css",
                },
                { glob: "./dist/*.dll.js", },
            ]
        ),
        new webpack.ProvidePlugin({
            ReactDOM: 'react-dom',
            React: 'react',
            THREE: "three"
        }),
        new webpack.DefinePlugin({ 'process': "globalThis", version: JSON.stringify(buildVersion) }),
        new CleanTerminalPlugin(),

        new WebpackBar()
        // new HardSourceWebpackPlugin(),
        // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    ],
    node: false
};

export default config;
