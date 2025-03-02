// Karma configuration
// Generated on Fri Dec 30 2022 23:38:00 GMT-0800 (Pacific Standard Time)
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "..",

    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ["mocha"],

    // list of files / patterns to load in the browser
    files: [
      // Add the actual Three.js libraries first
      {
        pattern: "node_modules/three/build/three.module.js",
        type: "module",
      },
      {
        pattern: "node_modules/three/examples/jsm/controls/OrbitControls.js",
        type: "module",
      },
      {
        pattern: "node_modules/three/examples/jsm/loaders/GLTFLoader.js",
        type: "module",
      },

      { pattern: "build/three-js-wrapper.module.js", type: "module" },
      { pattern: "test/entities/*.js", type: "module" },
      { pattern: "test/*.js", type: "module" },
    ],
    // Set up a proxy to map bare imports to actual locations
    proxies: {
      "/three": "/base/node_modules/three/build/three.module.js",
      "/three/examples/jsm/controls/OrbitControls.js":
        "/base/node_modules/three/examples/jsm/controls/OrbitControls.js",
      "/three/examples/jsm/loaders/GLTFLoader.js":
        "/base/node_modules/three/examples/jsm/loaders/GLTFLoader.js",
    },
    // list of files / patterns to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ["mocha"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,
    client: {
      mocha: {
        timeout: 6000,
      },
    },
  });
};
