import * as path from 'path';
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import WebpackBar from 'webpackbar';

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

const config: webpack.Configuration = merge(
    {
        // mode: "production",
        mode: "development",
        entry: "./src/api.ts",
        stats: {
            modules: true,
        },
        devtool: "source-map",
        externals: {
            'three': "THREE"
        },
        //输出设置
        output: {
            filename: "webcad-api.js",
            path: path.resolve(__dirname, "../dist/umd/"),
            library: "webcad-api",
            libraryTarget: "umd"
        },
        resolve: {
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
                    test: /\.(glsl|vs|fs)$/,
                    loader: 'shader-loader'
                }
            ]
        },
        plugins: [
            new WebpackBar()
        ],
        node: false
    }
);

export default config;
