import Events from './Events';

class Scroll {
  constructor() {
    this.init();
  }

  onScroll() {
    Events.emit('scroll', { y: window.scrollY });
  }

  on() {
    window.addEventListener('scroll', this.onScroll);
  }

  init() {
    this.on();
  }
}

export default new Scroll();