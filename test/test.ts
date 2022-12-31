import ThreeJSWrapper from '../src/ThreeJSWrapper';
import { assert } from 'chai';

let testCanvas : HTMLCanvasElement;

before(() => {
    testCanvas = document.createElement('canvas');
    testCanvas.width = 100;
    testCanvas.height = 100;
    document.body.appendChild(testCanvas);
});

after(() => {
    document.body.removeChild(testCanvas);
});

describe('ThreeJSWrapper', () => {
    it('should check that canvas is set', () => {
        assert.throws(() => {
            // @ts-expect-error
            let threeJsWrapper = new ThreeJSWrapper('hello');
        }, 'canvas is required to construct wrapper');
    });

    it('should be able to instantiate', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.equal(typeof threeJsWrapper,"object");
        assert.isFunction(threeJsWrapper.start);
    });

    it('should set dimentions to canvas', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.equal(threeJsWrapper.dimensions.width, testCanvas.width);
        assert.equal(threeJsWrapper.dimensions.height, testCanvas.height);
    });

    it('should set default camera', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.instanceOf(threeJsWrapper.camera, ThreeJSWrapper.THREE.PerspectiveCamera);
    });

    it('should set default scene', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.instanceOf(threeJsWrapper.scene, ThreeJSWrapper.THREE.Scene);
    });

    it('should set default renderer', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.instanceOf(threeJsWrapper.renderer, ThreeJSWrapper.THREE.WebGLRenderer);
    });

    it('should set default controls', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.instanceOf(threeJsWrapper.controls, ThreeJSWrapper.THREE.OrbitControls);
    });

    it('should set default loader', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.instanceOf(threeJsWrapper.loader, ThreeJSWrapper.THREE.GLTFLoader);
    });

    it('should set default clock', () => {
        let threeJsWrapper = new ThreeJSWrapper(testCanvas);
        assert.instanceOf(threeJsWrapper.clock, ThreeJSWrapper.THREE.Clock);
    });

});
