//npm run api
//npm run apid
//把es.js的mobx的删除了.
//删除Require(*.vs)

//这个现在已经变成了官方插件,但是现在有BUG,等它修复好,就可以改成这个 https://github.com/rollup/plugins/issues/243
// import typescript from '@rollup/plugin-typescript';


//参考:https://juejin.im/post/6844903968766689294
import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
// import dts from "rollup-plugin-dts";
import shader from 'rollup-plugin-shader';

export default [{
    input: "./src/api.ts",
    plugins: [
        typescript({
            exclude: "node_modules/**",
            typescript: require("typescript")
        }),
        sourceMaps(),
        shader({
            // 这个不行(不能搞定require(.vs)) 必须手动删除
            // All match files will be parsed by default,
            // but you can also specifically include/exclude files
            include: ['**/*.vs', '**/*.fs'],   // default: [ '**/*.glsl', '**/*.vs', '**/*.fs' ]
            exclude: ['node_modules/**'],
            // specify whether to remove comments
            removeComments: true,   // default: true
        })
    ],
    output: [
        {
            format: "cjs",
            file: "./api/api.cjs.js",
            sourcemap: true
        },
        {
            format: "es",
            file: "./api/api.esm.js",
            sourcemap: true
        }
    ]
},
    // {
    //     这个也不能用,因为它会把所有的给依赖进来,而且因为生成的d.ts有问题
    //     input: "./api/types/src/api.d.ts",
    //     output: [{ file: "./api/types/api.d.ts", format: "es" }],
    //     plugins: [dts()],
    // },
];
