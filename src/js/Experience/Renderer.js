import { WebGLRenderer } from 'three';
import Experience from './Experience';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      canvas: this.experience.targetCanvas,
    });
    this.resize();
  }

  resize() {
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.instance.render(this.experience.scene, this.experience.camera.instance);
  }
}
