import ThreeJSWrapper from './ThreeJSWrapper.js';

//Entity base class
export default class ThreeJSEntity {
    
    /**
     * 
     * @param {Object} params
     * @return {Object3D}
     */
    constructor (params = {}){
        this.THREE = ThreeJSWrapper.THREE;
        
        const Obj3d = this.create(params);
        
        Obj3d.addEventListener('update', this.update);

        return Obj3d;
    }

    /**
     * Override to create entity obj3d
     * @abstract
     * @param {object} params
     * @return {Object3D}
     */
    create (params = {}) {
        throw new Error('Entities must have a create method');
    }

    /**
     * Override to define animations
     */
    update () {}
};