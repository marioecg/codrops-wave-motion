precision mediump float;

varying vec2 vUv;

uniform float uTime;

void main() {
  vec3 pos = position;

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}