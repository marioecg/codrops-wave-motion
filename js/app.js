import '../css/base.css';
import Smooth from './components/Smooth';
import Gl from './gl';
import Plane from './gl/Plane';
import Slideshow from './gl/Slideshow';
import { preload } from './utils';

preload().then(() => {
  if(window.location.pathname === '/') {
    const elements = document.querySelectorAll('.js-plane');
    elements.forEach((el, index) => new Plane().init(el, index));
    const smooth = new Smooth();
  } else {
    const element = document.querySelector('.js-slideshow');
    const slideshow = new Slideshow().init(element);
  }
});