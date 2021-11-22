import { ThreeJSEntity } from '../../build/three-js-wrapper.module.js';
import { TeapotGeometry } from '../geometries/TeapotGeometry.js';

//Utah Teapot
export default class UtahTeapot extends ThreeJSEntity {

    create() {
        const {
            x = 0,
            y = 0,
            z = 0,
            size = 25,
            segments = -1,
            bottom = true,
            lid = true,
            body = true,
            fitLid = false,
            blinn = true,
        } = this.params;
      
       
        const diffuseColor = new this.THREE.Color();
        const specularColor = new this.THREE.Color();
        const materialColor = new this.THREE.Color();

        materialColor.setRGB( 1.0, 1.0, 1.0 );

        let material = new this.THREE.MeshBasicMaterial( { wireframe: true, color: 0xCC0000 } );
        let flatMaterial = new this.THREE.MeshPhongMaterial( { color: materialColor, specular: 0x000000, flatShading: true, side: this.THREE.DoubleSide } ); 
        let phongMaterial = new this.THREE.MeshPhongMaterial( { color: materialColor, side: this.THREE.DoubleSide } );

        diffuseColor.setHSL(0.121,0.73,0.66);
        specularColor.setRGB( 1, 1, 1);

        phongMaterial.shininess = 40;
        phongMaterial.color.copy(diffuseColor);
        phongMaterial.specular.copy(diffuseColor);


        let geo = new TeapotGeometry(
          size,
          segments,
          bottom,
          lid,
          body,
          fitLid,
          blinn);

        let obj3d = new this.THREE.Mesh(geo,phongMaterial);

        obj3d.position.z = z;
        obj3d.position.y = y;
        obj3d.position.x = x;

        return obj3d;
    }

    update (event) {
        event.target.rotation.y -= .005;
    }
 };
