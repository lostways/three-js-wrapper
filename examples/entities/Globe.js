import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

//Globe
export default class Globe extends ThreeJSEntity {
  create() {
    const { x = 0, y = 0, z = 0 } = this.params;

    //texture loader
    this.textureLoader = new this.THREE.TextureLoader();

    this.x = x;
    this.y = y;
    this.z = z;

    return new this.THREE.Group();
  }

  async initModel() {
    const earthMap = this.textureLoader.load("textures/globe/earthmap4k.jpg");
    const earthBump = this.textureLoader.load("textures/globe/earthbump4k.jpg");
    const cloudsMap = this.textureLoader.load(
      "textures/globe/earthclouds4k.png",
    );

    //materials
    const materialEarth = new this.THREE.MeshPhongMaterial({
      specular: 0x222222,
      shininess: 15,
      bumpMap: earthBump,
      bumpScale: 25,
      map: earthMap,
    });

    const materialClouds = new this.THREE.MeshPhongMaterial({
      specular: 0x222222,
      shininess: 15,
      opacity: 0.8,
      transparent: true,
      map: cloudsMap,
    });

    const geometry = new this.THREE.SphereGeometry(0.5, 14, 14).translate(
      0,
      0.1,
      0,
    );
    const earth = new this.THREE.Mesh(geometry, materialEarth);
    const cloudGeometry = new this.THREE.SphereGeometry(0.55, 14, 14).translate(
      0,
      0.1,
      0,
    );
    const clouds = new this.THREE.Mesh(cloudGeometry, materialClouds);

    this.object3d.add(earth);
    this.object3d.add(clouds);

    this.object3d.position.z = this.z;
    this.object3d.position.y = this.y;
    this.object3d.position.x = this.x;
  }

  update(event) {
    event.target.children[0].rotation.y -= 0.001;
    event.target.children[1].rotation.y -= 0.002;
  }
}
