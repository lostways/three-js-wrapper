// src/ThreeJSEntity.js
import ThreeJSWrapper from "./ThreeJSWrapper.js";

//Entity base class
export default class ThreeJSEntity {
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
