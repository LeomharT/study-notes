import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'

export default {
    plugins: [
        nodeResolve(),
        commonjs(),
        json()
    ],
    input: 'build/index.js',
    output: {
        inlineDynamicImports: true,
        file: 'bundle.mjs',
    }
}
