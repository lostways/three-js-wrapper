import THREE from "./WrappedThree";
import ThreeJSEntity from "./ThreeJSEntity";
export default class ThreeJSWrapper {
    canvas: HTMLCanvasElement;
    dimensions: {
        width: number;
        height: number;
    };
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: InstanceType<typeof THREE.OrbitControls>;
    loader: InstanceType<typeof THREE.GLTFLoader>;
    clock: THREE.Clock;
    isRunning: boolean;
    constructor(canvas: HTMLCanvasElement);
    static get THREE(): typeof import("three") & {
        OrbitControls: typeof import("three/examples/jsm/controls/OrbitControls").OrbitControls;
        GLTFLoader: typeof import("three/examples/jsm/loaders/GLTFLoader").GLTFLoader;
    };
    addEntity(entity: ThreeJSEntity): void;
    removeEntity(entity: ThreeJSEntity): void;
    start(): void;
    render(): void;
    update(): void;
    loop(): void;
    resize(): void;
    fullscreen(): void;
    bindEventListeners(): void;
    buildRenderer(): THREE.WebGLRenderer;
    buildCamera(): THREE.PerspectiveCamera;
}
//# sourceMappingURL=ThreeJSWrapper.d.ts.map