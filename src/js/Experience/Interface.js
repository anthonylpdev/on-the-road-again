import gsap from 'gsap';
import Experience from './Experience';
import Scroll from './Scroll';

export default class Interface {
  constructor() {
    this.experience = new Experience();
    this.setColorSwitch();
    this.setScroll();
    this.setTimelines();
    this.setIntroduction();
    this.setListeners();
  }

  setColorSwitch() {
    this.btnColorSwitch = document.querySelectorAll('button.color-switch');
    this.btnColorSwitch.forEach((el, index) => {
      const color = el.getAttribute('data-color');
      el.style.backgroundColor = `#${color}`;
      switch (index) {
        case 0:
          this.experience.world.car.params.color01 = parseInt(color, 16);
          break;
        case 1:
          this.experience.world.car.params.color02 = parseInt(color, 16);
          break;
        default:
          break;
      }

      el.addEventListener('click', (ev) => {
        ev.preventDefault();
        const target = parseInt(el.getAttribute('data-color'), 16);
        const tl = gsap.timeline();
        tl
          .to(this.experience.world.car.params, {
            color02: target,
            duration: 0,
          })
          .to(this.experience.world.car.params, {
            progression: 1,
            ease: 'power2.out',
          })
          .to(this.experience.world.car.params, {
            color01: target,
            duration: 0,
          })
          .to(this.experience.world.car.params, {
            progression: -1,
            duration: 0,
          })
          .play();
      });
    });
  }

  setScroll() {
    this.scroll = new Scroll();
  }

  setIntroduction() {
    this.tl.intro.play();
    document.querySelector('#loader')
      .addEventListener('click', () => {
        gsap
          .timeline()
          .to('#loader', {
            alpha: 0,
            duration: 0.5,
          })
          .to('#loader', {
            display: 'none',
            duration: 0,
          })
          .fromTo('.anim-intro', {
            alpha: 0,
          }, {
            alpha: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power4.out',
            onStart: () => {
              this.experience.camera.switchCamera(1);
            },
          });
      });
  }

  setTimelines() {
    this.tl = {};
    this.tl.openConfig = gsap.timeline();
    this.tl.openConfig
      .to('.anim-intro', {
        alpha: 0,
      })
      .to('.anim-intro', {
        display: 'none',
        duration: 0,
      })
      .to('.config-dom', {
        display: 'flex',
        duration: 0,
      })
      .addLabel('startAnim')
      .to('ul.config-dom li', {
        alpha: 1,
        stagger: 0.05,
        duration: 3,
        ease: 'power4.out',
      }, 'startAnim')
      .to('.btn-close', {
        alpha: 1,
        duration: 0.2,
      }, 'startAnim')
      .pause();
    this.tl.intro = gsap.timeline();
    const duration = 0.4;
    this.tl.intro
      .to('#loading > span', {
        y: -24,
        stagger: duration / 8,
        duration,
        ease: 'power4.out',
      })
      .to('#loaded > span', {
        y: -24,
        stagger: duration / 8,
        duration,
        ease: 'power4.out',
      })
      .pause();
  }

  setListeners() {
    document.querySelector('#switch-to-config')
      .addEventListener('click', () => {
        this.experience.interface.tl.openConfig.play();
        this.experience.camera.switchCamera(2);
      });
    document.querySelector('#btn-close')
      .addEventListener('click', () => {
        this.experience.interface.tl.openConfig.timeScale(4)
          .reverse();
        this.experience.camera.switchCamera(1);
      });
  }

  resize() {
    this.scroll.resize();
  }

  update() {
    this.scroll.update();
  }
}
