import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as path from 'path';
import * as webpack from 'webpack';
import { DIST_DIR } from './config';

const dllName = "dll";
const vendors = [
    "@blueprintjs/core",
    "@blueprintjs/icons",
    "mobx",
    "mobx-react",
    "react",
    "react-dom",
    "react-color",
    "react-rnd",
    "stats.js",
    "pako",
    "monotone-convex-hull-2d",
    "dxf-parser",
    "dwg2dxf",
    "xaop",
    "react-split",
    "js-angusj-clipper/web",
    "react-window",
    //如果你想调试threejs的代码,那么你应该注释掉下面的代码,然后重新构建dll
    "three",
    "three/examples/jsm/loaders/FBXLoader",
    "three/examples/jsm/postprocessing/EffectComposer",
    "three/examples/jsm/postprocessing/Pass",
    "three/examples/jsm/shaders/CopyShader",
    "three/examples/jsm/postprocessing/RenderPass",
    "three/examples/jsm/postprocessing/SMAAPass",
    "three/examples/jsm/renderers/SVGRenderer.js",
    "three/examples/jsm/helpers/RectAreaLightHelper",
    "three/examples/jsm//lines/LineMaterial",
    "three/examples/jsm/lines/LineGeometry",
    "three/examples/jsm/lines/Line2",
];

const config: webpack.Configuration = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, DIST_DIR),//虽然不需要提供 但是如果不提供CleanWebpackPlugin就坏了
        filename: "[contenthash].dll.js",
        library: dllName,
    },
    devtool: "source-map",
    entry: { "lib": vendors, },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, `${DIST_DIR}manifest.json`),
            name: dllName,
            context: __dirname,
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["*.dll.js", "*.dll.js.map"]
        }),
    ],
};

export default config;
