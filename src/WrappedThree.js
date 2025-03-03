import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Wrap our THREE instance
const WrappedThree = Object.assign({}, THREE, {
  OrbitControls,
  GLTFLoader,
});

export { THREE };

// Export our wrapped THREE instance
export default WrappedThree;
