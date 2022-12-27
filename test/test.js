const assert = require('assert');
const { JSDOM } = require('jsdom');
const { default: ThreeJSWrapper } = require('../build/three-js-wrapper');

let window;
beforeEach(() => {
    window = (new JSDOM(`<canvas id="canvas"></canvas>`, { runScripts: "dangerously"})).window;
});

describe('ThreeJSWrapper', () => {
    it('should check that canvas is set', () => {
        assert.throws(() => {
            let threeJsWrapper = new ThreeJSWrapper('hello');
        }, Error('canvas is required to construct wrapper'));
    });

    it('should be able to instantiate', () => {
        const canvas = window.document.getElementById('canvas');
        let threeJsWrapper = new ThreeJSWrapper(canvas);
        assert.equal(typeof threeJsWrapper, 'ThreeJSWrapper');
    });

});
