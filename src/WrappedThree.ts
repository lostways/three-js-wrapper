import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export type ExtendedTHREE = typeof THREE & {
  OrbitControls: typeof OrbitControls;
  GLTFLoader: typeof GLTFLoader;
};

// Wrap the original THREE instance
const WrappedThree = THREE as ExtendedTHREE;
WrappedThree.OrbitControls = OrbitControls;
WrappedThree.GLTFLoader = GLTFLoader;

// Re-export the original THREE instance
export { THREE };

// Export our wrapped THREE instance
export default WrappedThree;
