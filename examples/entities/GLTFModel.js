import {
  ThreeJSEntity,
  GLTFLoader,
} from "../../build/three-js-wrapper.module.js";

//Load GLTF Model
export default class GLTFModel extends ThreeJSEntity {
  create() {
    const { x = 0, y = 0, z = 0 } = this.params;

    this.loader = new GLTFLoader();

    this.x = x;
    this.y = y;
    this.z = z;

    return new this.THREE.Group();
  }

  async loadModel(url) {
    const model = await this.loader.loadAsync(url);

    const obj3d = model.scene.children[0];
    const clip = model.animations[0];
    const mixer = new this.THREE.AnimationMixer(obj3d);
    const action = mixer.clipAction(clip);

    this.mixer = mixer;

    action.play();

    obj3d.position.x = this.x;
    obj3d.position.y = this.y;
    obj3d.position.z = this.z;

    this.object3d.add(obj3d);
  }

  update(event) {
    this.mixer.update(event.delta);
    event.target.children[0].rotation.y -= 0.005;
  }
}
