import {
  ShaderMaterial,
  PlaneBufferGeometry,
  Mesh,
  DoubleSide,
  AmbientLight,
  Color
} from 'three';
import Experience from './Experience';
import vs from '../../glsl/plane-vert.glsl';
import fs from '../../glsl/plane-frag.glsl';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    // this.setDummy();
    this.setCar();
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

  setCar() {
    const gltf = this.experience.loader.resources.gltfScene;
    gltf.scene.scale.set(3, 3, 3);
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMap = this.experience.loader.resources.envMap;
        // child.material.needsUpdate = true;
        // child.castShadow = true;
        // child.receiveShadow = true;
        // child.envMapIntensity = 2.5;

        switch (child.name) {
          case 'plast_mat', '_carosserie_no_sym', '_carosserie_':
            // child.material.color = new Color(0xffff00);
            child.material.map = this.experience.loader.resources.carOcclu;
            break;
          default:
            break;
        }
        // console.log(child);
      }
    });
    this.scene.add(gltf.scene);
    /*glb.children.forEach((obj) => {
      obj.scale.set(0.1, 0.1, 0.1);
    });*/
    // this.scene.add(this.experience.loader.resources.fbxScene);
    // this.scene.add(new AmbientLight(0x404040));
  }
}
