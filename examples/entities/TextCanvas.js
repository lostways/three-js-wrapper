import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

//Text Canvas
export default class TextCanvas extends ThreeJSEntity {
  create() {
    const {
      x = 0,
      y = 0,
      z = 0,
      color = 0xcc0000,
      size = 48,
      text = "",
    } = this.params;

    //used for animation
    this.theta = 0;
   
    const labelGeometry = new this.THREE.PlaneGeometry(1, 1);
    const canvas = this.makeTextCanvas(text, size, color);
    const texture = new this.THREE.CanvasTexture(canvas);

    // because our canvas is likely not a power of 2
    // in both dimensions set the filtering appropriately.
    texture.minFilter = this.THREE.LinearFilter;
    texture.wrapS = this.THREE.ClampToEdgeWrapping;
    texture.wrapT = this.THREE.ClampToEdgeWrapping;

    const labelMaterial = new this.THREE.MeshBasicMaterial({
      map: texture,
      side: this.THREE.DoubleSide,
      transparent: true,
    });

    let obj3d = new this.THREE.Mesh(labelGeometry, labelMaterial);

    obj3d.position.z = z;
    obj3d.position.y = y;
    obj3d.position.x = x;

    const labelBaseScale = 0.005;
    obj3d.scale.x = canvas.width * labelBaseScale;
    obj3d.scale.y = canvas.height * labelBaseScale;

    return obj3d;
  }

  makeTextCanvas(text, size = 128, fgcolor = "white") {
    const borderSize = 2;
    const ctx = document.createElement("canvas").getContext("2d");
    const font = `${size}px bold sans-serif`;
    ctx.font = font;

    // measure how long the name will be
    const doubleBorderSize = borderSize * 2;
    const width = ctx.measureText(text).width + doubleBorderSize;
    const height = size + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // need to set font again after resizing canvas
    ctx.font = font;
    ctx.textBaseline = "top";

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = fgcolor;
    ctx.fillText(text, borderSize, borderSize);

    return ctx.canvas;
  }

  update(event) {
    this.theta += 0.05;
    event.target.rotation.y = Math.sin(this.theta) / 4;
  }
}
