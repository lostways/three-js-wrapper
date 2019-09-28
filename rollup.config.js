import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: 'index.js',
        plugins: [resolve(),buble()],
        treeshake: false,
        output: [
            {
                format: 'cjs',
                file: 'build/three-js-wrapper.js'
            }
        ]
    },
    {
        input: 'index.js',
        plugins: [resolve(),buble()],
        treeshake: false,
        output: [
            {
                format: 'esm',
                file: 'build/three-js-wrapper.module.js'
            }
        ]
    },
    {

        input: 'index.js',
        plugins: [resolve(),buble(),uglify()],
        treeshake: false,
        output: [
            {
                format: 'cjs',
                file: 'build/three-js-wrapper.min.js',
                compact: true
            }
        ]
    }
]