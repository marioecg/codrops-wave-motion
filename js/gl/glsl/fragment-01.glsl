precision mediump float;

varying vec2 vUv;
varying float wave;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uProg;
uniform float uIndex;
  
void main() {
  vec2 uv = vUv;
  vec2 dUv = vec2(uv.x, uv.y);
  vec3 texture;
  
  if (uIndex < 3.) {
    float w = wave;
    float r = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.05).r;
    float g = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.0).g;
    float b = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * -0.02).b;
    texture = vec3(r, g, b);    
  } else if (uIndex < 6.) {
    float count = 10.;
    float smoothness = 0.5;
    float pr = smoothstep(-smoothness, 0., dUv.y - (1. - uProg) * (1. + smoothness));
    float s = 1. - step(pr, fract(count * dUv.y));
    texture = texture2D(uTexture, dUv * s).rgb;
  } else {
    dUv.y += wave * 0.05;
    float r = texture2D(uTexture, dUv + vec2(0., 0.)).r;
    float g = texture2D(uTexture, dUv + vec2(0., 0.)).g;
    float b = texture2D(uTexture, dUv + vec2(0., -0.02) * uProg).b;
    texture = vec3(r, g, b);
  }
  
  gl_FragColor = vec4(texture, 1.);
}