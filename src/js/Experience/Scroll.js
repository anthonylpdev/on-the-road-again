import { lerp } from 'three/src/math/MathUtils';
import Experience from './Experience';

export default class Scroll {
  constructor() {
    this.experience = new Experience();
    this.domWrapper = document.querySelector('.scroll-wrapper');
    this.currentPosition = 0;
    this.targetPosition = 0;
    this.easing = 0.075;
    this.resize();
  }

  resize() {
    this.domWrapperSize = this.domWrapper.getBoundingClientRect();
    document.body.style.height = `${this.domWrapperSize.height}px`;
  }

  update() {
    this.targetPosition = window.scrollY;
    if (Math.abs(this.targetPosition - this.currentPosition) > 10) {
      this.currentPosition = lerp(this.currentPosition, this.targetPosition, this.easing);
    }
    this.domWrapper.style.transform = `translate3d(0,${-this.currentPosition}px, 0)`;
  }
}
