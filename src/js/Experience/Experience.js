import { Color, Fog, Scene } from 'three';
import { Pane } from 'tweakpane';
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

    this.targetCanvas = _options.target;
    this.setLoader();

    this.loader.manager.onLoad = () => {
      this.setDebug();
      this.setScene();
      this.setCamera();
      this.setWorld();
      this.setRenderer();
      this.setInterface();

      this.resize();
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
    this.scene.background = this.loader.resources.envMap;
    this.scene.environment = this.loader.resources.envMap;
    /*this.fog = new Fog(
      new Color(0x000000),
      5,
      25,
    );
    this.scene.fog = this.fog;*/
    // this.scene.background = this.mainColor;
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

  setDebug() {
    this.debug = new Pane();
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
