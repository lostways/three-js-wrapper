import { ThreeJSEntity } from '../../build/three-js-wrapper.module.js';

//wireframe sphere
export default class WireframeSphere extends ThreeJSEntity {
    create (
        {
            x = 0,
            y = 0,
            z = 0,
            radius = 10,
            segments = 16,
            rings = 16,
            color = 0xCC0000
        } = {} 
    ){
        this.material = new this.THREE.MeshBasicMaterial( { wireframe: true, color: color } );
        this.geo = new this.THREE.SphereGeometry(radius,segments,rings);
        this.obj3d = new this.THREE.Mesh(this.geo,this.material);

        this.obj3d.position.z = z;
        this.obj3d.position.y = y;
        this.obj3d.position.x = x;

        return this.obj3d;
    }

    update () {
        this.rotation.y -= .005;
    }
 };