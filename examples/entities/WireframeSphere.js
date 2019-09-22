//wireframe sphere
export default class WireframeSphere {
    constructor (
        ThreeJSWrapper,
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
        let THREE = ThreeJSWrapper.THREE;
        this.material = new THREE.MeshBasicMaterial( { wireframe: true, color: color } );
        this.geo = new THREE.SphereGeometry(radius,segments,rings);
        this.obj3d = new THREE.Mesh(this.geo,this.material);

        this.obj3d.position.z = z;
        this.obj3d.position.y = y;
        this.obj3d.position.x = x;
        
        this.obj3d.addEventListener('update', function () {
            this.rotation.y -= .005;    
        });

        return this.obj3d;
    }
 };