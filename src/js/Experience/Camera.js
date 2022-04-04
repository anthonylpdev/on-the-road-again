import { Euler, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from 'tweakpane';
import gsap from 'gsap';
import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.params = {
      camera: [
        {
          position: {
            x: -12.8511,
            y: 12.5877,
            z: -0.0037,
          },
          rotation: {
            x: -1.5708,
            y: 0,
            z: 0,
          },
          target: {
            x: -2.8511,
            y: 3.7524,
            z: -0.0038,
          },
        },
        {
          position: {
            x: -1.3502802316350355,
            y: 1.2684559167220804,
            z: 9.478290928080444,
          },
          rotation: {
            x: -0.045502937968823313,
            y: 0.009438972168573909,
            z: 0.000429791232007977,
          },
          target: {
            x: -1.4336802316337736,
            y: 0.8665559167227498,
            z: 0.6519909280804118,
          },
        },
        {
          position: {
            x: -6.917355302559441,
            y: 2.5688539035237277,
            z: 4.574560184070792,
          },
          rotation: {
            x: -0.4063933425730152,
            y: -0.9008613488340403,
            z: -0.32534769564925003,
          },
          target: {
            x: -1.8522134516138302,
            y: 0.9827784277563462,
            z: 0.8890118031854758,
          },
        },
        {
          position: {
            x: -2.8511,
            y: 12.5877,
            z: -0.0037,
          },
          rotation: {
            x: -1.5708,
            y: 0,
            z: 0,
          },
          target: {
            x: -2.8511,
            y: 3.7524,
            z: -0.0038,
          },
        },
      ],
    };
    this.setInstance();
    this.setControls();
    this.setDebug();
  }

  setDebug() {
    this.pane = new Pane();
    this.pane
      .addInput({
        camera: 0,
      }, 'camera', {
        min: 0,
        max: this.params.camera.length - 1,
        step: 1,
      });
    this.pane
      .addInput({
        orbit: this.controls.enabled,
      }, 'orbit');
    this.pane.on('change', (ev) => {
      if (ev.last) {
        switch (ev.presetKey) {
          case 'camera':
            this.nextCamera = this.params.camera[ev.value];
            break;
          case 'orbit':
            this.controls.enabled = ev.value;
            break;
          default:
            break;
        }
      }
    });
  }

  setInstance() {
    const initialCamera = this.params.camera[0];
    this.instance = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 500);

    this.nextCamera = {
      position: new Vector3(
        initialCamera.position.x,
        initialCamera.position.y,
        initialCamera.position.z,
      ),
      rotation: new Euler(
        initialCamera.rotation.x,
        initialCamera.rotation.y,
        initialCamera.rotation.z,
      ),
      target: new Vector3(
        initialCamera.target.x,
        initialCamera.target.y,
        initialCamera.target.z,
      ),
    };

    this.resize();
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.experience.targetCanvas);
    this.controls.enabled = false;
    this.controls.enableZoom = true;
    this.controls.autoRotate = false;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
    this.controls.enableDamping = true;
    this.controls.target.set(
      this.params.camera[0].x,
      this.params.camera[0].y,
      this.params.camera[0].z,
    );
    this.controls.update();
  }

  switchCamera(_id) {
    this.nextCamera = this.params.camera[_id];
  }

  resize() {
    this.instance.aspect = window.innerWidth / window.innerHeight;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (this.controls.enabled) {
      this.controls.update();
    } else {
      gsap.to(this.instance.position, {
        ease: 'power2.out',
        duration: 2,
        x: this.nextCamera.position.x,
        y: this.nextCamera.position.y,
        z: this.nextCamera.position.z,
      });
      gsap.to(this.controls.target, {
        ease: 'power2.out',
        duration: 2,
        x: this.nextCamera.target.x,
        y: this.nextCamera.target.y,
        z: this.nextCamera.target.z,
      });
      gsap.to(this.instance.rotation, {
        ease: 'power2.out',
        duration: 2,
        x: this.nextCamera.rotation.x,
        y: this.nextCamera.rotation.y,
        z: this.nextCamera.rotation.z,
      });
    }
  }
}
