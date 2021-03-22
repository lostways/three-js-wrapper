import { ThreeJSEntity } from "../../build/three-js-wrapper.module.js";

//Load GLTF Model
export default class LoadGLTFModel extends ThreeJSEntity {
  create() {
    const {
      x = 0,
      y = 0,
      z = 0,
      url = null, //this is required
    } = this.params;

    if (url == null) throw new Error("file location is required");
    
    this.loader.load(url, (gltf) => {
      console.log(gltf);
        
       return gltf.scene; 
    }); 
  }

  update() {
  }
}
