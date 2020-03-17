import '../css/base.css';
import Smooth from './components/Smooth';
import Gl from './gl';
import Plane from './gl/Plane';
import Slideshow from './gl/Slideshow';
import { preloadImages } from './utils';

preloadImages().then(() => {
  document.body.classList.remove('loading');
  
  const elements = document.querySelectorAll('.js-plane');
  elements.forEach((el, index) => new Plane().init(el, index));
  const smooth = new Smooth();
});