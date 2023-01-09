import ThreeJSEntity from "../../src/ThreeJSEntity";

// TestEntity
export default class TestEntity extends ThreeJSEntity {
  create() {
    let obj3d = new this.THREE.Object3D();
    obj3d.name = "TestEntity";
    return obj3d;
  }

  update() {}
}
