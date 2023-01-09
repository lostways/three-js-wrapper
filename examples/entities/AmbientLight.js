import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

//Ambient Light
export default class AmbientAndSpotLight extends ThreeJSEntity {
  create() {
    const {} = this.params;

    const ambientLight = new this.THREE.HemisphereLight(
      "white",
      "darkslategrey",
      5
    );

    return ambientLight;
  }

  update() {}
}
