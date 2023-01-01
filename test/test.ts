import ThreeJSWrapper from '../src/ThreeJSWrapper';
import ThreeJSEntity from '../src/ThreeJSEntity';
import TestEntity from './entities/TestEntity';
import { assert } from 'chai';

let testCanvas : HTMLCanvasElement;
let threeJsWrapper : ThreeJSWrapper;

beforeEach(() => {
    testCanvas = document.createElement('canvas');
    testCanvas.width = 100;
    testCanvas.height = 100;
    document.body.appendChild(testCanvas);

    threeJsWrapper = new ThreeJSWrapper(testCanvas);
});

afterEach(() => {
    document.body.removeChild(testCanvas);
});

describe('ThreeJSWrapper', () => {
    it('should check that canvas is set', () => {
        assert.throws(() => {
            // @ts-expect-error
            let invalidThreeJsWrapper = new ThreeJSWrapper('hello');
        }, 'canvas is required to construct wrapper');
    });

    it('should be able to instantiate', () => {
        assert.equal(typeof threeJsWrapper,"object");
        assert.isFunction(threeJsWrapper.start);
    });

    it('should set dimentions to canvas', () => {
        assert.equal(threeJsWrapper.dimensions.width, testCanvas.width);
        assert.equal(threeJsWrapper.dimensions.height, testCanvas.height);
    });

    it('should set default camera', () => {
        assert.instanceOf(threeJsWrapper.camera, ThreeJSWrapper.THREE.PerspectiveCamera);
    });

    it('should set default scene', () => {
        assert.instanceOf(threeJsWrapper.scene, ThreeJSWrapper.THREE.Scene);
    });

    it('should set default renderer', () => {
        assert.instanceOf(threeJsWrapper.renderer, ThreeJSWrapper.THREE.WebGLRenderer);
    });

    it('should set default controls', () => {
        assert.instanceOf(threeJsWrapper.controls, ThreeJSWrapper.THREE.OrbitControls);
    });

    it('should set default loader', () => {
        assert.instanceOf(threeJsWrapper.loader, ThreeJSWrapper.THREE.GLTFLoader);
    });

    it('should set default clock', () => {
        assert.instanceOf(threeJsWrapper.clock, ThreeJSWrapper.THREE.Clock);
    });

    it('should add entity to scene', () => {
        let entity : ThreeJSEntity  = new TestEntity({});
        assert.equal(threeJsWrapper.scene.children.length, 0);
        threeJsWrapper.addEntity(entity);
        assert.equal(threeJsWrapper.scene.children.length, 1);
    });

    it('should remove entity from scene', () => {
        let entity : ThreeJSEntity  = new TestEntity({});
        threeJsWrapper.addEntity(entity);
        assert.equal(threeJsWrapper.scene.children.length, 1);
        threeJsWrapper.removeEntity(entity);
        assert.equal(threeJsWrapper.scene.children.length, 0);
    });

    it('should throw error when removing invalid entity', () => {
        assert.throws(() => {
            // @ts-expect-error
            threeJsWrapper.removeEntity('hello');
        }, "Can't remove invalid ThreeJSEntity");
    });

    it('should throw error when removing entity that is not in scene', () => {
        assert.throws(() => {
            let entity : ThreeJSEntity  = new TestEntity({});
            threeJsWrapper.removeEntity(entity);
        }, "Can't remove entity that is not in scene");
    });

    /**
    it('should start animation loop', () => {
        assert.equal(threeJsWrapper.isRunning, false);
        threeJsWrapper.start();
        assert.equal(threeJsWrapper.isRunning, true);
    });
    **/


});
