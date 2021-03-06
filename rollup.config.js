import resolve from '@rollup/plugin-node-resolve';
import uglify from '@lopatnov/rollup-plugin-uglify';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'index.ts',
        plugins: [typescript(),resolve()],
        treeshake: false,
        output: [
            {
                format: 'cjs',
                file: 'build/three-js-wrapper.js',
                exports: 'named'
            }
        ]
    },
    {
        input: 'index.ts',
        plugins: [typescript(),resolve()],
        treeshake: false,
        output: [
            {
                format: 'esm',
                file: 'build/three-js-wrapper.module.js',
                exports: 'named'
            }
        ]
    },
    {

        input: 'index.ts',
        plugins: [typescript(),resolve(),uglify()],
        treeshake: false,
        output: [
            {
                format: 'cjs',
                file: 'build/three-js-wrapper.min.js',
                compact: true,
                exports: 'named'
            }
        ]
    }
]
