import ThreeJSWrapper from "./ThreeJSWrapper.js";
import { Object3D, Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Entity {
  create(): Object3D | Group;
  update(): void;
}

//Entity base class
export default class ThreeJSEntity implements Entity {
  public object3d: Object3D | Group;
  public params: Object;
  protected THREE: Object;
  protected loader: Object;

  constructor(params = {}) {
    this.params = params;
    this.THREE = ThreeJSWrapper.THREE;
    this.loader = new GLTFLoader();
    this.object3d = this.create();
    //this.object3d.addEventListener("update", this.update);
  }

  /**
   * Override to create Object3D
   */
  create(): Object3D | Group {
    throw new Error("Entities must have a create method");
  }

  /**
   * Override to define animations
   */
  update(): void {}
}

