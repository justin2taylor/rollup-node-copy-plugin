# Rollup Plugin Node Copy

For problem Node.js modules that won't bundle with Rollup, a brute force copy method is required.
Instead of manually entering all the dependenices needed, simply input each of the trouble modules
you need, and that module with it's dependencies will be copied into your target node_modules directory.

# Usage

`yarn add rollup-plugin-node-copy -D`

```
import nodeCopy from 'rollup-plugin-node-copy';

[...]

plugins: [
    nodeCopy({
        packages: ['jimp'],
        src: './',
        keepDevDependencies: false,
        dest: 'public/web',
    }),
]
```
