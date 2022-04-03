import { Euler, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Experience from './Experience';
import { Pane } from 'tweakpane';
import gsap from 'gsap';

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
            x: -7.490006497837689,
            y: 1.5277263775531744,
            z: 2.6905331251051967,
          },
          rotation: {
            x: -0.23164261982330583,
            y: -0.9559885267885452,
            z: -0.1903511321947596,
          },
          target: {
            x: -3.4055848816461327,
            y: 0.8656257700835449,
            z: -0.1164444036212996,
          },
        },
        {
          position: {
            x: -6.288161940405448,
            y: 2.8263019063224926,
            z: 5.488566901509377,
          },
          rotation: {
            x: -0.36830801678987823,
            y: -0.7546743966164058,
            z: -0.25846038738994154,
          },
          target: {
            x: -1.861511764258584,
            y: 1.131472489993401,
            z: 1.096883201555355,
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
    // this.setDebug();
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
