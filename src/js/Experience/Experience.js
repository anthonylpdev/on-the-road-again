import { Color, Fog, Scene } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Loader from './Loader';
import World from './World';
import Interface from './Interface';

export default class Experience {
  constructor(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    window.xp = this;

    this.targetCanvas = _options.target;
    this.setLoader();

    this.loader.manager.onLoad = () => {
      this.setScene();
      this.setCamera();
      this.setWorld();
      this.setRenderer();
      this.setInterface();

      this.resize();
      window.experience = this;
      window.addEventListener('resize', () => {
        this.resize();
      });

      this.update();
    };
  }

  setInterface() {
    this.interface = new Interface();
  }

  setScene() {
    this.scene = new Scene();
    const colorMain = new Color('#999');
    this.scene.environment = this.loader.resources.envMap;
    this.fog = new Fog(
      colorMain,
      10,
      80,
    );
    this.scene.fog = this.fog;
    this.scene.background = colorMain;
  }

  setCamera() {
    this.camera = new Camera();
  }

  setLoader() {
    this.loader = new Loader();
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
    this.camera.update();
    this.renderer.update();
    this.world.update();
    window.requestAnimationFrame(this.update.bind(this));
  }
}
