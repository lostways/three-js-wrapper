import { ExtendedTHREE } from "./WrappedThree";
import { Object3D } from "three";
interface Entity {
    create(): Object3D;
    update(): void;
}
export default class ThreeJSEntity implements Entity {
    object3d: Object3D;
    params: Record<string, any>;
    protected THREE: ExtendedTHREE;
    constructor(params?: Record<string, any>);
    /**
     * Override to create Object3D
     */
    create(): Object3D;
    /**
     * Override to define animations
     */
    update(): void;
}
export {};
//# sourceMappingURL=ThreeJSEntity.d.ts.map