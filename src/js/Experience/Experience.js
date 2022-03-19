import { Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Loader from './Loader';
import World from './World';

export default class Experience {
  constructor(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    this.targetCanvas = _options.target;
    this.setLoader();

    this.loader.manager.onLoad = () => {
      this.setScene();
      this.setCamera();
      this.setWorld();
      this.setRenderer();

      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });

      this.update();
    };
  }

  setListener() {
    window.addEventListener('resize', () => {
      this.camera.resize();
      this.renderer.resize();
    });
    window.addEventListener('dblclick', () => {
      const fullscreenElement = document.fullscreenElement
          || document.webkitFullscreenElement;
      if (!fullscreenElement) {
        if (this.targetCanvas.requestFullscreen) {
          this.targetCanvas.requestFullscreen();
        } else if (this.targetCanvas.webkitRequestFullscreen) {
          this.targetCanvas.webkitRequestFullscreen();
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    });
  }

  setScene() {
    this.scene = new Scene();
    this.scene.background = this.loader.resources.envMap;
    this.scene.environment = this.loader.resources.envMap;
  }

  setCamera() {
    this.camera = new Camera();
  }

  setLoader() {
    this.loader = new Loader();
    /* this.loader.manager.onLoad = () => {
      console.log(this.loader.manager.resources);
    } */
    /* this.loader.manager.onLoad = () => {
      console.log(this.loader.manager.resources);
      // this.experience.resources
      // console.log(this.resources);
    } */
  }

  setWorld() {
    this.world = new World();
  }

  setRenderer() {
    this.renderer = new Renderer({
      canvas: this.targetCanvas,
      scene: this.scene,
      camera: this.camera.instance,
    });
  }

  resize() {
    this.renderer.resize();
    this.camera.resize();
  }

  update() {
    this.renderer.update();
    this.camera.update();
    window.requestAnimationFrame(this.update.bind(this));
  }
}
