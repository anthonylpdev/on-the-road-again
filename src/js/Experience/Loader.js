import {
  LoadingManager,
  TextureLoader,
  CubeTextureLoader,
  sRGBEncoding,
} from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
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

  setManager() {
    this.manager = new LoadingManager();
  }

  setLoaders() {
    this.textureLoader = new TextureLoader(this.manager);
    this.CubeTextureLoader = new CubeTextureLoader(this.manager);
    this.GLTFLoader = new GLTFLoader(this.manager);
    this.DRACOLoader = new DRACOLoader(this.manager);
    this.DRACOLoader.setDecoderConfig({ type: 'js' });
    this.DRACOLoader.setDecoderPath('/');
    this.GLTFLoader.setDRACOLoader(this.DRACOLoader);
  }

  loadResource() {
    const list = [
      {
        name: 'gltfScene',
        type: 'gltf',
        path: 'assets/5008-optim.glb',
      },
      {
        name: 'envMap',
        type: 'cube',
        path: [
          'assets/px.png',
          'assets/nx.png',
          'assets/py.png',
          'assets/ny.png',
          'assets/pz.png',
          'assets/nz.png',
        ],
      },
    ];

    for (const current of list) {
      switch (current.type) {
        case 'texture':
          this.textureLoader.load(current.path, (currentResource) => {
            currentResource.encoding = sRGBEncoding;
            this.resources = {
              ...this.resources,
              [current.name]: currentResource,
            };
          });
          break;
        case 'draco':
          this.DRACOLoader.load(current.path, (currentResource) => {
            currentResource.encoding = sRGBEncoding;
            this.resources = {
              ...this.resources,
              [current.name]: currentResource,
            };
            this.DRACOLoader.dispose();
          });
          break;
        case 'cube':
          this.CubeTextureLoader.load(current.path, (currentResource) => {
            currentResource.encoding = sRGBEncoding;
            this.resources = {
              ...this.resources,
              [current.name]: currentResource,
            };
          });
          break;
        default:
          this.GLTFLoader.load(current.path, (currentResource) => {
            this.resources = {
              ...this.resources,
              [current.name]: currentResource,
            };
          });
          break;
      }
    }
  }
}
