import Experience from './Experience';
import * as verticesLines from '../../json/export_lines_positions.json';

export default class Lines {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setModel();
  }

  setModel() {
    for (const vert of verticesLines.default.data) {
      console.log(vert);
    }
  }
}
