import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
    this.instance.position.x = -13.0793;
    this.instance.position.y = 4.5144;
    this.instance.position.z = 6.3488;

    this.instance.rotation.x = -0.37231796;
    this.instance.rotation.y = 0.78882532;
    this.instance.rotation.z = -0.27031080;

    // this.instance.rotation.reorder('YXZ');
    this.resize();
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.experience.targetCanvas);
    this.controls.enabled = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
    this.controls.enableDamping = true;
    this.controls.target = new Vector3(0, 0, -6);
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
