import nodeResolve from '@rollup/plugin-node-resolve';

export default {
    plugins: [
        nodeResolve({
            preferBuiltins: false
        })
    ],
    input: 'build/index.js',
    output: {
        file: './bundle.js',
    }
}
