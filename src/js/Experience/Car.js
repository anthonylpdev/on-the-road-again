import { Color, sRGBEncoding, Vector3 } from 'three';
import Experience from './Experience';

export default class Car {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.loader.resources;
    this.setModel();
    this.setDebug();
  }

  setModel() {
    this.params = {
      color01: 0x182312,
      color02: 0x325b7c,
      progression: -1,
    };

    this.resources.gltfScene.scene.scale.set(2, 2, 2);
    this.resources.gltfScene.scene.traverse((child) => {
      if (child.isMesh) {
        // material.wireframe = true;
        if (child.name.startsWith('glasses') || child.name === '_optik_glass_'
          || child.name === '_optik_glass_red_') {
          child.material.transparent = true;
        }

        if (child.name.startsWith('_carosserie_')) {
          child.material.outputEncoding = sRGBEncoding;
          child.material.onBeforeCompile = (shader) => {
            shader.uniforms.uColor01 = { value: new Color(this.params.color01) };
            shader.uniforms.uColor02 = { value: new Color(this.params.color02) };
            shader.uniforms.uProgression = { value: this.params.progression };

            shader.vertexShader = shader.vertexShader.replace(
              '#include <common>',
              `#include <common>
               varying vec3 vPosition;
`,
            );

            shader.vertexShader = shader.vertexShader.replace(
              '#include <worldpos_vertex>',
              `#include <worldpos_vertex>
               vPosition = worldPosition.xyz;
`,
            );

            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <common>',
              `#include <common>
                uniform float uProgression;
                uniform vec3 uColor01;
                uniform vec3 uColor02;
                varying vec3 vPosition;
                
                vec3 final = vec3(0, 0, 0);
`,
            );

            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <color_fragment>',
              `#include <color_fragment>
                float mask = min(max(smoothstep(-1.0, 1.0, vPosition.x / 5.) + uProgression, 0.0), 1.0);
                final = mix(uColor01, uColor02, mask);
                diffuseColor.rgb = vec3(final);`,
            );

            child.material.userData.shader = shader;
          };
        }
      }
    });

    this.scene.add(this.resources.gltfScene.scene);
  }

  setDebug() {
    this.experience.debug.addInput(this.params, 'color01', { view: 'color' });
    this.experience.debug.addInput(this.params, 'color02', { view: 'color' });
    this.experience.debug.addInput(this.params, 'progression', {
      min: -1,
      max: 1,
      step: 0.001,
    });
    this.experience.debug.on('change', (ev) => {
      this.params[ev.presetKey] = ev.value;
    });
  }

  setParams(_key, _value) {
    this.resources.gltfScene.scene.traverse(({
      isMesh,
      name,
      material,
    }) => {
      if (isMesh) {
        if (name.startsWith('_carosserie_')) {
          switch (_key) {
            case 'color01':
              material.userData.shader.uniforms.uColor01.value.set(_value);
              break;
            case 'color02':
              material.userData.shader.uniforms.uColor02.value.set(_value);
              break;
            case 'progression':
              material.userData.shader.uniforms.uProgression.value = _value;
              break;
            default:
              break;
          }
        }
      }
    });
  }

  update() {
    for (const [key, value] of Object.entries(this.params)) {
      this.setParams(key, value);
    }
  }
}
