import { ThreeJSEntity } from '../../build/three-js-wrapper.module.js';

//normal box
export default class NormalBox extends ThreeJSEntity {
    create (){
        const {
            width = 1,
            height = 1,
            depth = 1,
            x = 0,
            y = 0,
            z = 0,
        } = this.params;

        let material = new this.THREE.MeshNormalMaterial();
        let geo = new this.THREE.BoxGeometry(width,height,depth);
        let obj3d = new this.THREE.Mesh(geo,material);

        obj3d.position.z = z;
        obj3d.position.y = y;
        obj3d.position.x = x;

        return obj3d;
    }

    update () {
        this.rotation.y += .01;
        this.rotation.x += .02;
    }
 };
