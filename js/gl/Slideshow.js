import * as THREE from 'three';
import Gl from './index'
import GlObject from './GlObject'
import vertexShader from './glsl/vertex-02.glsl'
import fragmentShader from './glsl/fragment-02.glsl'
import gsap from 'gsap';
import disp from '../../img/disp-02.png';

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});

export default class extends GlObject {
  init(el) {
    super.init(el);

    this.geometry = planeGeometry;
    this.material = planeMaterial.clone();

    this.material.uniforms = {
      uCurrTex: { value: 0 },
      uNextTex: { value: 0 },
      uDisp: { value: new THREE.TextureLoader().load(disp) },
      uMeshSize: { value: [this.rect.width, this.rect.height] },
      uImageSize: { value: [0, 0] },
      uTime: { value: 0 },
      uProg: { value: 0 },
    };

    this.textures = [];

    this.state = {
      animating: false,
      current: 0
    };

    this.navItems = document.querySelectorAll('.slideshow__nav-item');

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.mesh);

    Gl.scene.add(this);

    this.loadTextures();
    this.addEvents();
  }

  loadTextures() {
    const manager = new THREE.LoadingManager(() => {
      // Set first texture as default
      this.material.uniforms.uCurrTex.value = this.textures[0];
    });
    const loader = new THREE.TextureLoader(manager);
    const imgs = [...this.el.querySelectorAll('img')];

    imgs.forEach(img => {
      loader.load(img.src, texture => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        this.material.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight];
        this.textures.push(texture);
      })
    });
  }

  switchTextures(index) {
    if(this.state.animating) return;

    this.state.animating = true;

    this.navItems[this.state.current].classList.remove('slideshow__nav-item--current');
    this.navItems[index].classList.add('slideshow__nav-item--current');
    this.state.current = index;

    this.material.uniforms.uNextTex.value = this.textures[index];

    const tl = gsap.timeline({
      onComplete: () => {
        this.state.animating = false;
        this.material.uniforms.uCurrTex.value = this.textures[index];
      }
    });

    tl
      .fromTo(this.material.uniforms.uProg, {
        value: 0
      }, {
        value: 1,
        duration: 2,
        ease: 'expo.inOut',
      }, 0);
  }

  addEvents() {
    this.navItems.forEach((el, i) => {
      el.addEventListener('click', () => {
        this.switchTextures(i);
      });
    });
  }

  updateTime(time) {
    this.material.uniforms.uTime.value = time;
  }

  resize() {
    super.resize();
    if (!this.material) return;
    this.material.uniforms.uMeshSize.value.x = this.rect.width;
    this.material.uniforms.uMeshSize.value.y = this.rect.height;
  }
}