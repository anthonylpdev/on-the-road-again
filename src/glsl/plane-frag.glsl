uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    vec4 loaded = texture2D(uTexture, vUv);
    // gl_FragColor = vec4(loaded.rgb, 1.);
    gl_FragColor = vec4(loaded.rgb, 1.);
}
