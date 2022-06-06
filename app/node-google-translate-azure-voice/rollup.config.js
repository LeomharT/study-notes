import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

export default {
    plugins: [
        commonjs(),
        json(),
        nodeResolve({ preferBuiltins: true }),
        typescript({
            exclude: "node_modules/**",
            typescript: require("typescript")
        })
    ],
    input: './src/index.ts',
    output: {
        inlineDynamicImports: true,
        file: './bundle.mjs',
        format: 'es'
    }
};
