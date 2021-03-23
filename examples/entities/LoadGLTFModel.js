import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

//Load GLTF Model
export default class LoadGLTFModel extends ThreeJSEntity {
  create() {
    const {
      x = 0,
      y = 0,
      z = 0,
      model = null, //this is required
    } = this.params;

    if (model == null) throw new Error("file location is required");

    const obj3d = model.scene.children[0];
    const clip = model.animations[0];
    const mixer = new this.THREE.AnimationMixer(obj3d);
    const action = mixer.clipAction(clip);
    action.play();

    obj3d.position.x = x;
    obj3d.position.y = y;
    obj3d.position.z = z;
    
    obj3d.mixer = mixer;

    return obj3d; 
  }

  update() {
    this.mixer.update(.025);
    this.rotation.y -= .005;
  }
}
