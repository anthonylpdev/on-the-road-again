import {
  LoadingManager,
  TextureLoader,
  CubeTextureLoader,
  sRGBEncoding
} from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
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
    this.FBXLoader = new FBXLoader(this.manager);
    this.GLTFLoader = new GLTFLoader(this.manager);
    this.CubeTextureLoader = new CubeTextureLoader(this.manager);
    this.DDSLoader = new DDSLoader(this.manager);
  }

  loadResource() {
    const list = [
      {
        name: 'gltfScene',
        type: 'gltf',
        path: 'assets/5008.glb',
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
        case 'dds':
          this.DDSLoader.load(current.path, (currentResource) => {
            this.resources = {
              ...this.resources,
              [current.name]: currentResource,
            };
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
