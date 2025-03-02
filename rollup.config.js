import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default [
  // ESM build
  {
    input: "index.js",
    output: {
      format: "esm",
      file: "build/three-js-wrapper.module.js",
      sourcemap: true,
      exports: "named",
    },
    external: ["three", /three\/examples\/jsm\/.*/],
    plugins: [resolve()],
  },

  // UMD build (minified)
  {
    input: "index.js",
    output: {
      format: "umd",
      file: "build/three-js-wrapper.min.js",
      name: "ThreeJSWrapper",
      sourcemap: true,
      exports: "named",
      globals: {
        three: "THREE",
        "three/examples/jsm/controls/OrbitControls": "THREE.OrbitControls",
        "three/examples/jsm/loaders/GLTFLoader": "THREE.GLTFLoader",
      },
    },
    external: ["three", /three\/examples\/jsm\/.*/],
    plugins: [resolve(), terser()],
  },

  // CJS build
  {
    input: "index.js",
    output: {
      format: "cjs",
      file: "build/three-js-wrapper.js",
      sourcemap: true,
      exports: "named",
    },
    external: ["three", /three\/examples\/jsm\/.*/],
    plugins: [resolve()],
  },
];
