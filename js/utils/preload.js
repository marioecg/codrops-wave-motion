const imagesLoaded = require('imagesloaded');

// Preload images
export function preloadImages() {
    return new Promise((resolve, reject) => {
        imagesLoaded(document.querySelectorAll('.item__img, .slideshow__img'), {background: true}, resolve);
    });
};

/*
export function preload() {
  const paths = [...document.querySelectorAll('.item__img')].map(image => image.src);
  return Promise.all(paths.map(checkImage));
}

export const checkImage = path => new Promise(resolve => {
  const img = new Image();
  img.onload = () => resolve({ path, status: 'ok' });
  img.onerror = () => resolve({ path, status: 'error' });
  img.src = path;
});
*/