import {
  DepthTexture,
  LinearFilter,
  RGBAFormat, sRGBEncoding, Vector3,
  WebGLMultisampleRenderTarget,
  WebGLRenderTarget,
} from 'three';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import Experience from './Experience';

export default class Postprocessing {
  constructor() {
    this.experience = new Experience();
    this.renderer = this.experience.renderer.instance;
    this.setRenderTarget();
    this.setPasses();
  }

  setRenderTarget() {
    this.options = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      samples: 0,
    };

    if (this.renderer.capabilities.isWebGL2) {
      this.options.samples = 2;
    }

    // this.options.depthTexture = new DepthTexture(window.innerWidth, window.innerHeight);

    this.renderTarget = new WebGLRenderTarget(
      800,
      600,
      this.options,
    );

    this.effectComposer = new EffectComposer(this.renderer, this.renderTarget);
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.effectComposer.setSize(window.innerWidth, window.innerHeight);
  }

  setPasses() {
    const renderPass = new RenderPass(this.experience.scene, this.experience.camera.instance);
    this.effectComposer.addPass(renderPass);

    // Tin pass
    const TintShader = {
      uniforms:
        {
          tDiffuse: { value: null },
          // uDepthTexture: { value: this.options.depthTexture },
          uTint: { value: null },
        },
      vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        // uniform sampler2D uDepthTexture;
        uniform vec3 uTint;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb += uTint;

            gl_FragColor = color;
        }
    `,
    };

    const tintPass = new ShaderPass(TintShader);
    tintPass.material.uniforms.uTint.value = new Vector3(0, 0, 0);
    this.effectComposer.addPass(tintPass);

    if (this.renderer.getPixelRatio() === 1
      && !this.renderer.capabilities.isWebGL2) {
      const smaaPass = new SMAAPass();
      this.effectComposer.addPass(smaaPass);
    }
  }

  update() {
    this.effectComposer.render();
  }
}
