import Experience from './Experience';
import * as verticesLines from '../../json/export_lines_positions.json';
import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from 'three';

export default class Lines {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setModel();
  }

  setModel() {
    this.material = new LineBasicMaterial({
      color: '#F00',
    });
    this.material.onBeforeCompile((shader) => {
      console.log(shader);
    });
    this.lines = [];

    const nbVertices = 11;
    const nbCoord = nbVertices * 3;
    const rawData = verticesLines.default.data;
    let points = [];

    for (let i = 0; i < rawData.length - 1; i += nbVertices * 3) {
      for (let j = 0; j < nbCoord - 1; j += 3) {
        points.push(new Vector3(
          rawData[j],
          rawData[j + 1],
          rawData[j + 2],
        ));
      }
      const geometry = new BufferGeometry().setFromPoints(points);
      const line = new Line(geometry, this.material);
      line.rotation.set(-Math.PI * 0.5, 0, 0);
      line.position.set(0.8, 0.6, 0);
      line.scale.set(1.5,1.5,1.5);
      this.scene.add(line);
      points = [];
    }
  }
}
