import esbuild from 'esbuild';
import inlineImage from 'esbuild-plugin-inline-image';
import { sassPlugin } from 'esbuild-sass-plugin';

console.time('build');

await esbuild.build({
    entryPoints: ['index.tsx'],
    bundle: true,
    outdir: 'dist',
    plugins: [
        sassPlugin(),
        inlineImage()
    ],
    watch: true,
    minify: true
}).catch(err => { console.log(err); });

console.timeEnd('build');
