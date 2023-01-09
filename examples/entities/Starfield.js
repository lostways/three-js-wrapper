import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

export default class StarField extends ThreeJSEntity {
  create() {
    const { speed = 1 } = this.params;

    this.speed = speed;
    this.stars = [];

    return new this.THREE.Group();
  }

  async generateStars() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for (var z = -1000; z < 1000; z += 20) {
      // Make a sphere (exactly the same as before).
      var geometry = new this.THREE.SphereGeometry(0.5, 32, 32);
      var material = new this.THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
      });
      var sphere = new this.THREE.Mesh(geometry, material);

      // This time we give the sphere random x and y positions between -500 and 500
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;

      // Then set the z position to where it is in the loop (distance of camera)
      sphere.position.z = z;

      // scale it up a bit
      sphere.scale.x = sphere.scale.y = 2;

      //add the sphere to the scene
      this.object3d.add(sphere);

      //finally push it to the stars array
      this.stars.push(sphere);
    }
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  update(event) {
    // loop through each star
    for (var i = 0; i < this.stars.length; i++) {
      let star = this.stars[i];

      // and move it forward
      star.position.z += (i / 10) * this.speed;

      // if the particle is too close move it to the back
      if (star.position.z > 1000) star.position.z -= 2000;
    }
  }
}
