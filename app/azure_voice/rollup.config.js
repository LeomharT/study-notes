import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
export default {
    plugins: [
        nodeResolve({
            preferBuiltins: true
        }),
        commonjs()
    ],
    input: 'build/index.js',
    output: {
        file: 'bundle.js',
    }
}
