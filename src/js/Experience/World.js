import Experience from './Experience';
import Car from './Car';
import { AxesHelper, GridHelper, Vector3 } from 'three';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.scene.rotation.reorder('YXZ');

    // const targetAxis = new Vector3(0, 1, 0);
    // this.scene.rotateOnWorldAxis(targetAxis, - Math.PI / 2);

    this.resources = this.experience.loader.resources;
    this.setCar();

    // this.scene.add(new AxesHelper(10));
    // this.scene.add(new GridHelper(10));
  }

  setCar() {
    this.car = new Car();
  }

  update() {
    this.car.update();
  }
}
