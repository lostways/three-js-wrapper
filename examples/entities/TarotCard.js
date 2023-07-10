import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

// Tarot Card
export default class TarotCard extends ThreeJSEntity {
  create() {
    const { x = 0, y = 0, z = 0 } = this.params;

    const colorSide = new this.THREE.Color(0x111111);

    const textureLoader = new this.THREE.TextureLoader();

    const faceTexture = textureLoader.load("textures/tarot-front.jpg");
    const backTexture = textureLoader.load("textures/tarot-back.jpg");

    var sideMaterial = new this.THREE.MeshPhongMaterial({
      color: colorSide,
      shininess: 0,
    });

    var faceUpMaterial = new this.THREE.MeshStandardMaterial({
      color: 0x666666,
      map: faceTexture,
      roughness: 0.3,
    });
    var faceDownMaterial = new this.THREE.MeshStandardMaterial({
      color: 0x666666,
      map: backTexture,
      roughness: 0.3,
    });

    const obj3d = new this.THREE.Mesh(new this.THREE.BoxGeometry(2, 0.01, 2), [
      sideMaterial, // left
      sideMaterial, // right
      faceDownMaterial, // facedown
      faceUpMaterial, // faceup
      sideMaterial, // top
      sideMaterial, // bottom
    ]);

    obj3d.scale.x = 0.65;
    obj3d.castShadow = true;
    obj3d.rotation.x = -(Math.PI / 2);
    obj3d.position.z = z;
    obj3d.position.y = y;
    obj3d.position.x = x;

    return obj3d;
  }

  update(event) {
    event.target.rotation.z += 0.01;
    //event.target.rotation.x += 0.01;
  }
}
