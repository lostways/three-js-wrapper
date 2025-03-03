import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

//Ambien and Spot Light
export default class AmbientAndSpotLight extends ThreeJSEntity {
  create() {
    const { spot = 4, ambeint = 5 } = this.params;

    const ambientLight = new this.THREE.HemisphereLight(
      "white",
      "darkslategrey",
      ambeint,
    );

    const mainLight = new this.THREE.DirectionalLight("white", spot);
    mainLight.position.set(10, 10, 10);

    let obj3d = new this.THREE.Group();
    obj3d.add(ambientLight);
    obj3d.add(mainLight);

    return obj3d;
  }

  update() {}
}
