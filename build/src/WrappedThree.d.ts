import * as SUPER_THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
type WrappedThree = typeof SUPER_THREE & {
    OrbitControls: typeof OrbitControls;
    GLTFLoader: typeof GLTFLoader;
};
declare const WrappedThree: typeof SUPER_THREE & {
    OrbitControls: typeof OrbitControls;
    GLTFLoader: typeof GLTFLoader;
};
export default WrappedThree;
//# sourceMappingURL=WrappedThree.d.ts.map