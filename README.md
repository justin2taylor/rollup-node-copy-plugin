# Rollup Smart Node Copy Plugin

For problem Node.js modules that won't bundle with Rollup, a brute force copy method is required.
Instead of manually entering all the dependenices needed, simply input each of the trouble modules
you need, and that module with it's dependencies will be copied into your target node_modules directory.

# Usage

`yarn add rollup-node-copy-plugin -D`

```
import nodeCopy from 'rollup-node-copy-plugin';
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
