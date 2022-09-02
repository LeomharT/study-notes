const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['index.tsx'],
    bundle: true,
    outfile: './public/bundle.js',
    watch: true,
}).catch(err => { console.log(err); });
