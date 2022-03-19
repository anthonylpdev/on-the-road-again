import {
  LoadingManager,
  TextureLoader,
} from 'three';
import {
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader';

export default class Loader {
  constructor() {
    this.resources = [];

    this.setManager();

    this.setLoaders();
    this.loadResource();
  }

  async setManager() {
    this.manager = new LoadingManager();
  }

  setLoaders() {
    this.textureLoader = new TextureLoader(this.manager);
    this.GLTFLoader = new GLTFLoader(this.manager);
  }

  loadResource() {
    const list = [
      {
        name: 'baseImg',
        type: 'texture',
        path: 'assets/img.jpeg',
      },
    ];

    for (const current of list) {
      switch (current.type) {
        case 'texture':
          this.textureLoader.load(current.path, (currentResource) => {
            this.resources = {
              ...this.resources,
              [current.name]: currentResource,
            };
          });
          break;
        default:
          break;
      }
    }
  }
}
