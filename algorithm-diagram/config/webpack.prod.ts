import { CleanWebpackPlugin } from "clean-webpack-plugin";
import TerserPlugin from 'terser-webpack-plugin';
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: webpack.Configuration = merge(
    common,
    {
        mode: "production",
        devtool: "source-map",

        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        ecma: 2020,
                        sourceMap: true,
                        keep_classnames: true,
                    }
                }),
            ]
        },

        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["*.main.js*", "*.worker.js*", "*.wasm", "*.LICENSE.txt"]
            }),
        ]
    }
);

export default config;
