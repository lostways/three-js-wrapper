import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import ThreeJSEntity from "./ThreeJSEntity";

export default class ThreeJSWrapper {
  public canvas: HTMLCanvasElement;
  public dimensions: { width: number; height: number };
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;
  public loader: GLTFLoader;

  constructor(canvas: HTMLCanvasElement) {
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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //loader
    this.loader = new GLTFLoader();
  }

  //static THREE instance
  static get THREE() {
    return THREE;
  }

  //add an entity to the scene
  addEntity(entity: ThreeJSEntity) {
    this.scene.add(entity.object3d);
  }

  //start the animation loop
  start() {
    this.resize();
    this.bindEventListeners();
    this.renderer.render(this.scene, this.camera);
    this.loop();
  }

  //update the scene animation
  update() {
    this.scene.children.forEach((ent) => {
      ent.dispatchEvent({ type: "update" });
    });
  }

  //the animation loop
  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.update();
    this.renderer.render(this.scene, this.camera);
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
  buildRenderer(): THREE.WebGLRenderer {
    let { width, height } = this.dimensions;
    let renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    renderer.setSize(width, height);
    return renderer;
  }

  //build our camera
  buildCamera(): THREE.PerspectiveCamera {
    let { width, height } = this.dimensions;
    let fov = 75;
    let aspect = width / height;
    let near = 0.1;
    let far = 1000;

    return new THREE.PerspectiveCamera(fov, aspect, near, far);
  }
}
