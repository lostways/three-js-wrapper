import { ThreeJSEntity } from '../../build/three-js-wrapper.module.js';

//wireframe sphere
export default class WireframeSphere extends ThreeJSEntity {

    create() {
        const {
            x = 0,
            y = 0,
            z = 0,
            radius = 10,
            segments = 16,
            rings = 16,
            color = 0xCC0000
        } = this.params;
      
        let material = new this.THREE.MeshBasicMaterial( { wireframe: true, color: color } );
        let geo = new this.THREE.SphereGeometry(radius,segments,rings);
        let obj3d = new this.THREE.Mesh(geo,material);

        obj3d.position.z = z;
        obj3d.position.y = y;
        obj3d.position.x = x;

        return obj3d;
    }

    update () {
        this.rotation.y -= .005;
    }
 };
