import WrappedThree from "./WrappedThree.js";

export default class ThreeJSWrapper {
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
    this.scene = new THREE.Scene();

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
    this.clock = new THREE.Clock();

    //running flag
    this.isRunning = false;
  }

  //static THREE instance
  static get THREE() {
    return THREE;
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
        entity.object3d instanceof THREE.Object3D
      )
    ) {
      throw new Error("Can't remove invalid ThreeJSEntity");
    }

    if (!this.scene.children.includes(entity.object3d)) {
      throw new Error("Can't remove entity that is not in scene");
    }

    let object3d = entity.object3d;

    if (object3d instanceof THREE.Mesh) {
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
    let renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
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

    return new THREE.PerspectiveCamera(fov, aspect, near, far);
  }
}
