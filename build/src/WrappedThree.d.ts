import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export type ExtendedTHREE = typeof THREE & {
    OrbitControls: typeof OrbitControls;
    GLTFLoader: typeof GLTFLoader;
};
declare const WrappedThree: ExtendedTHREE;
export { THREE };
export default WrappedThree;
//# sourceMappingURL=WrappedThree.d.ts.map