import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from "rollup-plugin-uglify";

export default [
    {
        input: 'src/ThreeJSWrapper.js',
        plugins: [resolve(),buble()],
        output: [
            {
                globals: () => 'THREE',
                format: 'umd',
                name: 'ThreeJSWrapper',
                file: 'build/three-js-wrapper.js'
            }
        ]
    },
    {
        input: 'src/ThreeJSWrapper.js',
        plugins: [resolve(),buble()],
        output: [
            {
                globals: () => 'THREE',
                format: 'esm',
                file: 'build/three-js-wrapper.module.js'
            }
        ]
    },
    {

        input: 'src/ThreeJSWrapper.js',
        plugins: [resolve(),buble(),uglify()],
        output: [
            {
                globals: () => 'THREE',
                format: 'umd',
                name: 'ThreeJSWrapper',
                file: 'build/three-js-wrapper.min.js',
                compact: true
            }
        ]
    },

]