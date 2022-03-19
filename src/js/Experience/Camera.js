import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 5, 50);
    this.instance.position.x = 0;
    this.instance.position.y = 0;
    this.instance.position.z = 20;
    this.resize();
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.experience.targetCanvas);
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
    this.controls.enableDamping = true;
    this.controls.update();
  }

  resize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
