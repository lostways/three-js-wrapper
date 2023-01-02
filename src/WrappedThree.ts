import * as SUPER_THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// create type for our wrapped THREE instance
type WrappedThree = typeof SUPER_THREE & {
    OrbitControls: typeof OrbitControls;
    GLTFLoader: typeof GLTFLoader;
};

// Create our wrapped THREE instance
const WrappedThree = Object.assign({}, SUPER_THREE, {
    OrbitControls,
    GLTFLoader,
});

// Export our wrapped THREE instance
export default WrappedThree;
