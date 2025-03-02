import ThreeJSWrapper from "./ThreeJSWrapper";
import { ExtendedTHREE } from "./WrappedThree";
import { Object3D } from "three";

interface Entity {
  create(): Object3D;
  update(): void;
}

//Entity base class
export default class ThreeJSEntity implements Entity {
  public object3d: Object3D;
  public params: Record<string, any>;
  protected THREE: ExtendedTHREE;

  constructor(params: Record<string, any> = {}) {
    this.params = params;
    this.THREE = ThreeJSWrapper.THREE;
    this.object3d = this.create();
    this.object3d.addEventListener("update", this.update.bind(this));
  }

  /**
   * Override to create Object3D
   */
  create(): Object3D {
    throw new Error("Entities must have a create method");
  }

  /**
   * Override to define animations
   */
  update(): void { }
}
