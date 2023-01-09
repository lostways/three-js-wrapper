import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

// Tarot Card
export default class TarotCard extends ThreeJSEntity {
  create() {
    const { x = 0, y = 0, z = 0 } = this.params;

    const colorDark = new this.THREE.Color(0xb0b0b0);
    //const colorLight = new this.THREE.Color(0xffffff);

    const textureLoader = new this.THREE.TextureLoader();

    const faceTexture = textureLoader.load("textures/tarot-front.jpg");
    const backTexture = textureLoader.load("textures/tarot-back.jpg");

    var darkMaterial = new this.THREE.MeshPhongMaterial({ color: 0x111111 });
    var faceUpMaterial = new this.THREE.MeshPhongMaterial({
      color: colorDark,
      map: faceTexture,
      shininess: 40,
    });
    var faceDownMaterial = new this.THREE.MeshPhongMaterial({
      color: colorDark,
      map: backTexture,
      shininess: 40,
    });

    const obj3d = new this.THREE.Mesh(
      new this.THREE.BoxBufferGeometry(2, 0.02, 2),
      [
        darkMaterial, // left
        darkMaterial, // right
        faceDownMaterial, // facedown
        faceUpMaterial, // faceup
        darkMaterial, //
        darkMaterial, //
      ]
    );

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
