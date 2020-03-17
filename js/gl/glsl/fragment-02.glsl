precision mediump float;

varying vec2 vUv;

uniform sampler2D uCurrTex;
uniform sampler2D uNextTex;
uniform sampler2D uDisp;
uniform vec2 uMeshSize;
uniform vec2 uImageSize;
uniform float uTime;
uniform float uProg;

vec2 backgroundCoverUv(vec2 uv, vec2 canvasSize, vec2 textureSize){
  vec2 ratio = vec2(
    min((canvasSize.x / canvasSize.y) / (textureSize.x / textureSize.y), 1.0),
    min((canvasSize.y / canvasSize.x) / (textureSize.y / textureSize.x), 1.0)
  );

  vec2 uvWithRatio = uv * ratio;

  return vec2(
    uvWithRatio.x + (1.0 - ratio.x) * 0.5,
    uvWithRatio.y  + (1.0 - ratio.y) * 0.5
  );
}

void main() {
  vec2 uv = vUv;
  vec2 texUv = backgroundCoverUv(uv, uMeshSize, uImageSize);

  vec4 disp = texture2D(uDisp, uv);

  float wipe = step(1.0 - uv.x, uProg);
  float scale = 0.7 + 0.3 * uProg;

  vec4 currTex = texture2D(uCurrTex, texUv + vec2(disp.r * uProg, 0.));
  vec4 nextTex = texture2D(uNextTex, texUv * scale + vec2(0.15) * (1. - uProg));

  vec4 finalTex = mix(currTex, nextTex, wipe);

  gl_FragColor = finalTex;
}