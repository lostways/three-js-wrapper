import { ThreeJSEntity } from '../../build/three-js-wrapper.module.js';

//wireframe sphere
export default class NormalBox extends ThreeJSEntity {
    create (
        {
            width = 1,
            height = 1,
            depth = 1,
            x = 0,
            y = 0,
            z = 0,
        } = {} 
    ){
        this.material = new this.THREE.MeshNormalMaterial();
        this.geo = new this.THREE.BoxGeometry(width,height,depth);
        this.obj3d = new this.THREE.Mesh(this.geo,this.material);

        this.obj3d.position.z = z;
        this.obj3d.position.y = y;
        this.obj3d.position.x = x;

        return this.obj3d;
    }

    update () {
        this.rotation.y += .01;
        this.rotation.x += .02;
    }
 };