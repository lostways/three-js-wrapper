import * as SUPER_THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Create our wrapped THREE instance
const WRAPPED_THREE = Object.assign({}, SUPER_THREE,
    { OrbitControls, GLTFLoader }
);

// Export our wrapped THREE instance
export default WRAPPED_THREE;