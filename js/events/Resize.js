import Events from './Events';

class Resize {
  constructor() {
    this.init();
  }

  onResize() {
    Events.emit('resize');
  }

  on() {
    window.addEventListener('resize', this.onResize);
  }

  init() {
    this.on();
  }
}

export default new Resize();
