import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader as GLTFLoader_2 } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OrbitControls as OrbitControls_2 } from 'three/examples/jsm/controls/OrbitControls';
import * as SUPER_THREE from 'three';
import { three } from 'three';

declare interface Entity {
    create(): Object3D;
    update(): void;
}

export { GLTFLoader }

export declare class ThreeJSEntity implements Entity {
    object3d: Object3D;
    params: Object;
    protected THREE: WrappedThree;
    constructor(params?: {});
    /**
     * Override to create Object3D
     */
    create(): Object3D;
    /**
     * Override to define animations
     */
    update(): void;
}

declare class ThreeJSWrapper {
    canvas: HTMLCanvasElement;
    dimensions: {
        width: number;
        height: number;
    };
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: InstanceType<typeof WrappedThree.OrbitControls>;
    loader: InstanceType<typeof WrappedThree.GLTFLoader>;
    clock: THREE.Clock;
    isRunning: boolean;
    constructor(canvas: HTMLCanvasElement);
    static get THREE(): three & {
        OrbitControls: OrbitControls_2;
        GLTFLoader: GLTFLoader_2;
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
export default ThreeJSWrapper;

declare type WrappedThree = typeof SUPER_THREE & {
    OrbitControls: typeof OrbitControls;
    GLTFLoader: typeof GLTFLoader;
};

declare const WrappedThree: typeof SUPER_THREE & {
    OrbitControls: typeof OrbitControls;
    GLTFLoader: typeof GLTFLoader;
};

export { }
