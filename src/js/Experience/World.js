import Experience from './Experience';
import Car from './Car';
import Panel from './Panel';
import Lines from './Lines';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.loader.resources;
    this.setCar();
    this.setLines();
    // this.setPanel();
  }

  setCar() {
    this.car = new Car();
  }

  setLines() {
    this.lines = new Lines();
  }

  setPanel() {
    this.panel = new Panel();
  }

  update() {
    this.car.update();
  }
}
