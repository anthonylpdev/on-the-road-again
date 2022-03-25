import gsap from 'gsap';
import Experience from './Experience';

export default class Interface {
  constructor() {
    this.experience = new Experience();
    this.setColorSwitch();
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
    // this.experience.debug.refresh();
  }
}
