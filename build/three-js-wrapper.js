'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var THREE = require('three');
var OrbitControls_js = require('three/examples/jsm/controls/OrbitControls.js');
var GLTFLoader_js = require('three/examples/jsm/loaders/GLTFLoader.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var THREE__namespace = /*#__PURE__*/_interopNamespaceDefault(THREE);

// Wrap our THREE instance
const WrappedThree$1 = Object.assign({}, THREE__namespace, {
  OrbitControls: OrbitControls_js.OrbitControls,
  GLTFLoader: GLTFLoader_js.GLTFLoader,
});

class ThreeJSWrapper {
  //constructor
  // @param {HTMLCanvasElement} canvas - The canvas element to render to
  constructor(canvas) {
    if (!(canvas && typeof canvas === "object")) {
      throw new Error("canvas is required to construct wrapper");
    }

    //canvas
    this.canvas = canvas;

    //dimensions
    this.dimensions = {
      width: canvas.width,
      height: canvas.height,
    };

    //camera
    this.camera = this.buildCamera();

    //scene
    this.scene = new WrappedThree$1.Scene();

    //renderer
    this.renderer = this.buildRenderer();

    //controls
    this.controls = new WrappedThree.OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    //loader
    this.loader = new WrappedThree.GLTFLoader();

    //clock
    this.clock = new WrappedThree$1.Clock();

    //running flag
    this.isRunning = false;
  }

  //static THREE instance
  static get THREE() {
    return WrappedThree$1;
  }

  //add an entity to the scene
  // @param {ThreeJSEntity} entity - The entity to add
  addEntity(entity) {
    this.scene.add(entity.object3d);
  }

  //remove en entity from the scene
  // @param {ThreeJSEntity} entity - The entity to remove
  removeEntity(entity) {
    if (
      !(
        entity &&
        typeof entity === "object" &&
        entity.object3d instanceof WrappedThree$1.Object3D
      )
    ) {
      throw new Error("Can't remove invalid ThreeJSEntity");
    }

    if (!this.scene.children.includes(entity.object3d)) {
      throw new Error("Can't remove entity that is not in scene");
    }

    let object3d = entity.object3d;

    if (object3d instanceof WrappedThree$1.Mesh) {
      if (object3d.geometry) {
        object3d.geometry.dispose();
      }

      if (object3d.material) {
        if (object3d.material instanceof Array) {
          object3d.material.forEach((material) => material.dispose());
        } else {
          object3d.material.dispose();
        }
      }
    }

    this.scene.remove(entity.object3d);
  }

  //start the animation loop
  start() {
    this.resize();
    this.bindEventListeners();
    this.render();
    this.loop();
    this.isRunning = true;
  }

  //render the scene
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  //update the scene animation
  update() {
    let delta = this.clock.getDelta();
    this.scene.children.forEach((ent) => {
      ent.dispatchEvent({ type: "update", delta: delta });
    });
  }

  //the animation loop
  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.update();
    this.render();
  }

  //resize the scene to the current canvas size
  resize() {
    this.fullscreen();

    let { width, height } = this.canvas;

    this.dimensions.width = width;
    this.dimensions.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  //fullscreen the canvas
  fullscreen() {
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  //event listeners
  bindEventListeners() {
    window.onresize = this.resize.bind(this);
  }

  //build our three js renderer
  // @returns {THREE.WebGLRenderer} - The renderer
  buildRenderer() {
    let { width, height } = this.dimensions;
    let renderer = new WrappedThree$1.WebGLRenderer({ canvas: this.canvas });
    renderer.setSize(width, height);
    return renderer;
  }

  //build our camera
  // @returns {THREE.PerspectiveCamera} - The camera
  buildCamera() {
    let { width, height } = this.dimensions;
    let fov = 75;
    let aspect = width / height;
    let near = 0.1;
    let far = 1000;

    return new WrappedThree$1.PerspectiveCamera(fov, aspect, near, far);
  }
}

// src/ThreeJSEntity.js

//Entity base class
class ThreeJSEntity {
  constructor(params = {}) {
    this.params = params;
    this.THREE = ThreeJSWrapper.THREE;
    this.object3d = this.create();
    this.object3d.addEventListener("update", this.update.bind(this));
  }

  /**
   * Override to create Object3D
   */
  create() {
    throw new Error("Entities must have a create method");
  }

  /**
   * Override to define animations
   * @param {Object} event - Update event containing delta time
   */
  update(event) {}
}

Object.defineProperty(exports, "GLTFLoader", {
  enumerable: true,
  get: function () { return GLTFLoader_js.GLTFLoader; }
});
exports.ThreeJSEntity = ThreeJSEntity;
exports.default = ThreeJSWrapper;
//# sourceMappingURL=three-js-wrapper.js.map
