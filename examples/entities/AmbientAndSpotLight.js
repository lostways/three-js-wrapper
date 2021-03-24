import { ThreeJSEntity } from '../../build/three-js-wrapper.module.js';

//Ambien and Spot Light
export default class AmbientAndSpotLight extends ThreeJSEntity {
    create (){
        const {
        } = this.params;

        
        const ambientLight = new this.THREE.HemisphereLight(
          'white',
          'darkslategrey',
          5,
        );

        const mainLight = new this.THREE.DirectionalLight('white', 4);
        mainLight.position.set(10, 10, 10);
        
        let obj3d = new this.THREE.Group();
        obj3d.add(ambientLight);
        obj3d.add(mainLight);

        return obj3d;
    }

    update () {
    }
 };
