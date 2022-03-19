import {
  ShaderMaterial,
  PlaneBufferGeometry,
  Mesh,
  DoubleSide,
} from 'three';
import Experience from './Experience';
import vs from '../../glsl/plane-vert.glsl';
import fs from '../../glsl/plane-frag.glsl';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setDummy();
  }

  setDummy() {
    this.geometry = new PlaneBufferGeometry(19.2, 28.8, 10, 10);
    this.material = new ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        uTexture: { value: this.experience.loader.resources.baseImg },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: DoubleSide,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
}
