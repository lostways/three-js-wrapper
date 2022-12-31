const liveServer = require("live-server");

const params = {
    port: 8181, // Set the server port. Defaults to 8080.
    root: "./test",
    mount: [
        ['/mocha', './node_modules/mocha'],
        ['/chai', './node_modules/chai'],
        ['/three', './node_modules/three'],
        ['/build', './build'],
    ],
};

liveServer.start(params);
