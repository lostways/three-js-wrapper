import ThreeJSWrapper from "../src/ThreeJSWrapper";
import ThreeJSEntity from "../src/ThreeJSEntity";
import TestEntity from "./entities/TestEntity";
import * as sinon from "sinon";
import { assert } from "chai";

let testCanvas: HTMLCanvasElement;
let threeJsWrapper: ThreeJSWrapper;

before(() => {
  const style = document.createElement("style");
  style.innerHTML = `
    html,body {
      margin: 0;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  `;
  document.head.appendChild(style);
});

beforeEach(() => {
  testCanvas = document.createElement("canvas");
  testCanvas.width = 100;
  testCanvas.height = 100;
  document.body.appendChild(testCanvas);

  threeJsWrapper = new ThreeJSWrapper(testCanvas);
});

afterEach(() => {
  document.body.removeChild(testCanvas);
  sinon.restore();
});

describe("ThreeJSWrapper", () => {
  it("should check that canvas is set", () => {
    assert.throws(() => {
      // @ts-expect-error
      let invalidThreeJsWrapper = new ThreeJSWrapper("hello");
    }, "canvas is required to construct wrapper");
  });

  it("should be able to instantiate", () => {
    assert.equal(typeof threeJsWrapper, "object");
    assert.isFunction(threeJsWrapper.start);
  });

  it("should set dimentions to canvas", () => {
    assert.equal(threeJsWrapper.dimensions.width, testCanvas.width);
    assert.equal(threeJsWrapper.dimensions.height, testCanvas.height);
  });

  it("should set default camera", () => {
    assert.instanceOf(
      threeJsWrapper.camera,
      ThreeJSWrapper.THREE.PerspectiveCamera
    );
  });

  it("should set default scene", () => {
    assert.instanceOf(threeJsWrapper.scene, ThreeJSWrapper.THREE.Scene);
  });

  it("should set default renderer", () => {
    assert.instanceOf(
      threeJsWrapper.renderer,
      ThreeJSWrapper.THREE.WebGLRenderer
    );
  });

  it("should set default controls", () => {
    assert.instanceOf(
      threeJsWrapper.controls,
      ThreeJSWrapper.THREE.OrbitControls
    );
  });

  it("should set default loader", () => {
    assert.instanceOf(threeJsWrapper.loader, ThreeJSWrapper.THREE.GLTFLoader);
  });

  it("should set default clock", () => {
    assert.instanceOf(threeJsWrapper.clock, ThreeJSWrapper.THREE.Clock);
  });


  it("should fullscreen canvas when fullscreen is called", () => {
    // assert that canvas is not fullscreen
    assert.equal(threeJsWrapper.canvas.width, 100);
    assert.equal(threeJsWrapper.canvas.height, 100);

    // fullscreen canvas
    threeJsWrapper.fullscreen();

    // assert that canvas is fullscreen
    assert.equal(threeJsWrapper.canvas.width, window.innerWidth);
    assert.equal(threeJsWrapper.canvas.height, window.innerHeight);
  });

  it("should resize the scene when resize is called", () => {
    // assert that canvas is not fullscreen
    assert.equal(threeJsWrapper.canvas.width, 100);
    assert.equal(threeJsWrapper.canvas.height, 100);

    // assert that camera aspect is not fullscreen
    assert.notEqual(
      threeJsWrapper.camera.aspect,
      window.innerWidth / window.innerHeight
    );

    // assert that renderer is not fullscreen
    assert.equal(threeJsWrapper.renderer.domElement.width, 100);
    assert.equal(threeJsWrapper.renderer.domElement.height, 100);

    // resize the scene
    threeJsWrapper.resize();

    // assert that canvas is fullscreen
    assert.equal(threeJsWrapper.canvas.width, window.innerWidth);
    assert.equal(threeJsWrapper.canvas.height, window.innerHeight);

    // assert that camera is fullscreen
    assert.equal(
      threeJsWrapper.camera.aspect,
      window.innerWidth / window.innerHeight
    );

    // assert that renderer is fullscreen
    assert.equal(
      threeJsWrapper.renderer.domElement.width,
      window.document.body.offsetWidth
    );
    assert.equal(
      threeJsWrapper.renderer.domElement.height,
      window.document.body.offsetHeight
    );
  });

  it("should resize the scene when window is resized", () => {
    // bind resize event
    threeJsWrapper.bindEventListeners();

    // assert that canvas is not fullscreen
    assert.equal(threeJsWrapper.canvas.width, 100);
    assert.equal(threeJsWrapper.canvas.height, 100);

    // assert that camera aspect is not fullscreen
    assert.notEqual(
      threeJsWrapper.camera.aspect,
      window.innerWidth / window.innerHeight
    );

    // assert that renderer is not fullscreen
    assert.equal(threeJsWrapper.renderer.domElement.width, 100);
    assert.equal(threeJsWrapper.renderer.domElement.height, 100);

    // resize the scene
    window.dispatchEvent(new Event("resize"));

    // assert that canvas is fullscreen
    assert.equal(threeJsWrapper.canvas.width, window.innerWidth);
    assert.equal(threeJsWrapper.canvas.height, window.innerHeight);

    // assert that camera is fullscreen
    assert.equal(
      threeJsWrapper.camera.aspect,
      window.innerWidth / window.innerHeight
    );

    // assert that renderer is fullscreen
    assert.equal(
      threeJsWrapper.renderer.domElement.width,
      window.document.body.offsetWidth
    );
    assert.equal(
      threeJsWrapper.renderer.domElement.height,
      window.document.body.offsetHeight
    );
  });

  it("should start", () => {
    const resizeSpy = sinon.spy(threeJsWrapper, "resize");
    const bindEventsSpy = sinon.spy(threeJsWrapper, "bindEventListeners");
    const renderSpy = sinon.spy(threeJsWrapper, "render");
    const loopSpy = sinon.spy(threeJsWrapper, "loop");

    // assert that isRunning is false
    assert.equal(threeJsWrapper.isRunning, false);

    // start
    threeJsWrapper.start();

    // assert that resize is called
    assert.equal(resizeSpy.callCount, 1);

    // assert that bindEvents is called
    assert.equal(bindEventsSpy.callCount, 1);

    // assert that render is called twice
    assert.equal(renderSpy.callCount, 2);

    // assert that loop is called
    assert.equal(loopSpy.callCount, 1);

    // assert that isRunning is true
    assert.equal(threeJsWrapper.isRunning, true);
  });

  it("should add entity to scene", () => {
    const entity: ThreeJSEntity = new TestEntity({});

    assert.equal(threeJsWrapper.scene.children.length, 0);

    threeJsWrapper.addEntity(entity);
    assert.equal(threeJsWrapper.scene.children.length, 1);
  });

  it("should remove entity from scene", () => {
    const entity: ThreeJSEntity = new TestEntity({});

    threeJsWrapper.addEntity(entity);
    assert.equal(threeJsWrapper.scene.children.length, 1);

    threeJsWrapper.removeEntity(entity);
    assert.equal(threeJsWrapper.scene.children.length, 0);
  });

  it("should throw error when removing invalid entity", () => {
    assert.throws(() => {
      // @ts-expect-error
      threeJsWrapper.removeEntity("hello");
    }, "Can't remove invalid ThreeJSEntity");
  });

  it("should throw error when removing entity that is not in scene", () => {
    assert.throws(() => {
      const entity: ThreeJSEntity = new TestEntity({});
      threeJsWrapper.removeEntity(entity);
    }, "Can't remove entity that is not in scene");
  });

  it("should call update on all entities when update is called", () => {
    const updateSpy = sinon.spy(TestEntity.prototype, "update");
    const entity: ThreeJSEntity = new TestEntity({});

    threeJsWrapper.addEntity(entity);
    threeJsWrapper.update();

    assert.equal(updateSpy.callCount, 1);
    assert.equal(updateSpy.firstCall.args[0].type, "update");
    assert.equal(updateSpy.firstCall.args[0].delta, 0);
  });

  it("should start the animation loop when loop is called", () => {
    const renderSpy = sinon.spy(threeJsWrapper, "render");
    const updateSpy = sinon.spy(threeJsWrapper, "update");
    const animationFrameSpy = sinon.spy(window, "requestAnimationFrame");

    threeJsWrapper.loop();

    assert.equal(animationFrameSpy.callCount, 1);
    assert.equal(updateSpy.callCount, 1);
    assert.equal(renderSpy.callCount, 1);
  });
});
