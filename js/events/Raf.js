import gsap from 'gsap';
import Events from './Events';
import { lerp } from '../utils'

class Raf {
  constructor() {
    this.target = 0;
    this.current = 0;
    this.currentRounded = 0;
    this.ease = 0.115;

    this.init();
  }

  tick() {
    this.current = lerp(this.current, this.target, this.ease);
    this.currentRounded = Math.round(this.current * 100) / 100;

    Events.emit('tick', {
      target: this.target,
      current: this.currentRounded,
    });
  }

  onScroll({ y }) {
    this.target = y;
  }

  on() {
    gsap.ticker.add(this.tick.bind(this));
    Events.on('scroll', this.onScroll.bind(this));
  }

  init() {
    this.on();
  }
}

export default new Raf();
