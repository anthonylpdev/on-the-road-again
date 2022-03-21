import Experience from './Experience';
import Car from './Car';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.loader.resources;
    this.setCar();
  }

  setCar() {
    this.car = new Car();
  }
}
