import Experience from './Experience';
import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, sRGBEncoding, VideoTexture } from 'three';

export default class Panel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.loader.resources;
    this.setModel();
  }

  setModel() {
    this.geometry = new PlaneBufferGeometry(19.20*2, 10.80*2);

    const video = document.getElementById('panel-texture');
    const texture = new VideoTexture(video);
    texture.encoding = sRGBEncoding;
    this.material = new MeshBasicMaterial({
      map: texture,
      toneMapped: false,
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 5.4, -20);
    this.scene.add(this.mesh);
  }
}
