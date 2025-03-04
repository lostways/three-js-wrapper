# three.js wrapper
![tests](https://github.com/lostways/three-js-wrapper/actions/workflows/tests.yml/badge.svg)
[![npm version](https://badge.fury.io/js/three-js-wrapper.svg)](https://badge.fury.io/js/three-js-wrapper)
[![license: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Three.js wrapper provies a simple lightweight framework for using Three.js to add 3d objects and animations to your project.

https://threejswrapper.com/

## Installation

You can install using npm
```bash
npm install three-js-wrapper
```

Import into your project
```JavaScript
import ThreeJSWrapper from 'three-js-wrapper';
```

or you can import the minified JS directly into your site
```html
<script src="js/three-js-wrapper.min.js"></script>
```

Built and minified library is located in the /build directory

## Usage

### Define an Entity

Entities are objects that will be placed in your scene via the wrapper. Every entity exposes a `create` and `update` method. 

`create` returns a ThreeJS Object3D object.

`update` gets called once per animation frame.

Rotating Wireframe Sphere Example:

```JavaScript
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

    update (event) {
        event.target.rotation.y -= .005;
    }
 };
 ```
 
 ### Add Entity to wrapper and start
 
 Example that uses the WireframeSphere Entity:
 
 ```JavaScript
import ThreeJSWrapper from '../build/three-js-wrapper.module.js';
import WireframeSphere from './entities/WireframeSphere.js';

let canvas = document.getElementById("canvas");
let wrapper = new ThreeJSWrapper(canvas);

//create entitites
let sphere = new WireframeSphere({z:-25});

//add enitities
wrapper.addEntity(sphere);

//position controls
wrapper.controls.target.set(0,0,-25);

//start wrapper 
wrapper.start();
```

For more examples see the [examples](examples/) directory.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Start by installing dependencies
```bash
yarn install 
```

All source files are located in the /src directory. Examples are in the /examples directory. To build the source run:
```bash
npm run build
```

Start sever to view examples
```bash
npm run serve
```

Run tests ([mocha](https://github.com/mochajs/mocha)/[karma](https://github.com/karma-runner/karma)/[puppeteer](https://github.com/puppeteer/puppeteer))
```bash
npm run test
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
