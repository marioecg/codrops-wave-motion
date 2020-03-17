import '../css/base.css';
import Smooth from './components/Smooth';
import Gl from './gl';
import Plane from './gl/Plane';
import Slideshow from './gl/Slideshow';
import { preloadImages } from './utils';

preloadImages().then(() => {
  document.body.classList.remove('loading');
  
  const element = document.querySelector('.js-slideshow');
  const slideshow = new Slideshow().init(element);
  const smooth = new Smooth();
});