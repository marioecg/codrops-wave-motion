import imagesLoaded from 'imagesloaded';
import { Events } from '../events';

export default class Smooth {
  constructor() {
    this.bindMethods();

    this.dom = {
      el: document.querySelector('[data-scroll]'),
      content: document.querySelector('[data-scroll-content]')
    };

    this.init();
  }

  bindMethods() {
    ['scroll', 'run', 'resize']
      .forEach((fn) => this[fn] = this[fn].bind(this));
  }

  setStyles() {
    Object.assign(this.dom.el.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden'        
    });
  }

  setHeight() {
    document.body.style.height = `${this.dom.content.offsetHeight}px`;
  }

  resize() {
    this.setHeight();
    this.scroll();
  }

  preload() {
    imagesLoaded(this.dom.content, (instance) => this.setHeight());
  }

  scroll() {
    this.data.current = window.scrollY;
  }

  run({ current, target }) {    
    const diff = target - current;
    const acc = diff / window.innerWidth;
    const velo =+ acc;
    
    this.dom.content.style.transform = `translate3d(0, -${current}px, 0)`;
  }

  on() { 
    this.setStyles();
    this.setHeight();
    Events.on('tick', this.run);
    Events.on('resize', this.resize);    
  }

  off() {
    Events.off('tick', this.run);
    Events.off('resize', this.resize);
  }

  destroy() {
    document.body.style.height = '';

    this.data = null;

    this.removeEvents();
    this.cancelAnimationFrame();
  }

  resize() {
    this.setHeight();
  }

  init() {
    this.preload();
    this.on();
  }
}