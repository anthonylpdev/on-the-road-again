import { Color, Vector3 } from 'three';
import Experience from './Experience';

export default class Car {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.loader.resources;
    this.setModel();
  }

  setModel() {
    this.params = {
      color01: 0x182312,
      color02: 0x325b7c,
      transition: 0,
    };
    this.experience.debug.addInput(this.params, 'color01', { view: 'color' });
    this.experience.debug.addInput(this.params, 'color02', { view: 'color' });
    this.experience.debug.addInput(this.params, 'transition', {
      min: 0,
      max: 1,
      step: 0.1,
    });
    // this.setParams();
    this.experience.debug.on('change', (ev) => {
      this.resources.gltfScene.scene.traverse(({
        isMesh,
        name,
        material,
      }) => {
        if (isMesh) {
          if (name.startsWith('_carosserie_')) {
            switch (ev.presetKey) {
              case 'transition':
                material.userData.shader.uniforms.uTransition.value = ev.value;
                break;
              default:
                // material.userData.shader.uniforms.uColor01 = new Color(ev.value);
                break;
            }
          }
        }
      });
    });

    this.resources.gltfScene.scene.scale.set(2, 2, 2);
    this.resources.gltfScene.scene.traverse(({
      isMesh,
      name,
      material,
    }) => {
      if (isMesh) {
        if (name.startsWith('glasses') || name === '_optik_glass_'
          || name === '_optik_glass_red_') {
          material.transparent = true;
        }

        if (name.startsWith('_carosserie_')) {
          material.onBeforeCompile = (shader) => {
            shader.uniforms.uNoiseTexture = { value: this.resources.noise };
            shader.uniforms.uColor01 = { value: new Color(this.params.color01) };
            shader.uniforms.uColor02 = { value: new Color(this.params.color02) };
            shader.uniforms.uTransition = { value: this.params.transition };

            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <common>',
              `#include <common>
                uniform float uTransition;
                uniform sampler2D uNoiseTexture;
                uniform vec3 uColor01;
                uniform vec3 uColor02;
                vec3 final = vec3(0, 0, 0);
`,
            );

            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <color_fragment>',
              `#include <color_fragment>
                // vec4 toto = texture(uNoiseTexture, vUv);
                final = mix(uColor01, uColor02, uTransition);
                diffuseColor.rgb = final.rgb;`,
            );
            material.userData.shader = shader;
          };
        }
      }
    });

    this.scene.add(this.resources.gltfScene.scene);
  }

  /*setParams() {
    this.resources.gltfScene.scene.traverse(({
      isMesh,
      name,
      material,
    }) => {
      if (isMesh) {
        if (name.startsWith('_carosserie_')) {
          material.onBeforeCompile = (shader) => {
            shader.uniforms.uColor01 = { value: new Color(this.params.color01) };
            shader.uniforms.uColor02 = { value: new Color(this.params.color02) };
            shader.uniforms.uTransition = { value: this.params.transition };

            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <common>',
              `#include <common>
                uniform float uTransition;
                uniform vec3 uColor01;
                uniform vec3 uColor02;
`,
            );

            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <color_fragment>',
              `#include <color_fragment>
                vec3 final = mix(uColor01, uColor02, uTransition);
                diffuseColor.rgb = final.rgb;`,
            );
          };
        }
      }
    });
  }*/
}
