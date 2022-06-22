import * as webpack from 'webpack';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';
//hmr
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const config: webpack.Configuration = merge(
    common,
    {
        mode: "development",
        output: { pathinfo: false },
        devtool: "eval-source-map",
        //https://www.webpackjs.com/configuration/stats/
        stats: "errors-only" || {
            assets: false,
            timings: false,

            builtAt: false,
            cachedAssets: false,
            hash: false,
            modules: false,
            performance: false,
            entrypoints: false,

            // 添加 children 信息
            children: false,
            // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
            chunks: false,
            // 将构建模块信息添加到 chunk 信息
            chunkModules: false,
            // 添加 chunk 和 chunk merge 来源的信息
            chunkOrigins: false,

            reasons: false,
            source: false
        },
        devServer: {
            static: false,
            port: 7778,
            host: "0.0.0.0",
            hot: true,
            proxy: {
                "/api": {
                    target: "https://cad.leye.site",
                    pathRewrite: { '^/api': '' },
                    secure: false,
                    headers: {
                        Host: 'cfcad.cn',
                        Origin: "https://cfcad.cn"
                    }
                }
            }
        },
        optimization: {
            moduleIds: "named",
        },
        //hmr
        plugins: [
            new ReactRefreshWebpackPlugin()
        ],
    } as Configuration
);

export default config;
