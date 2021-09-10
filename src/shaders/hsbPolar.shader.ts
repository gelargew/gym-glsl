import * as THREE from 'three'

const hsbPolar = [
    {
        time: 0.,
        resolution: new THREE.Vector3(),
        uMouse: new THREE.Vector2(0, 0)
      },
      `
      varying vec2 vUv;
      uniform float time;
      void main()	{
        vUv = uv;
        // float s = snoise(vec3(1.0)*time);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      `
      #ifdef GL_ES
      precision mediump float;
      #endif
      
      #define TWO_PI 6.28318530718
      
      uniform vec3 resolution;
      uniform float time;
      uniform vec2 uMouse;
      varying vec2 vUv;
      
      vec3 hsb2rgb(in vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6. + vec3(0., 4., 2.),
                                6.)-3.)-1., 0., 1.);
        rgb = rgb * rgb * (3. - 2. * rgb);
        return c.z * mix(vec3(1.), rgb, c.y);
      }
      
      void main() {
        vec3 color = vec3(0.);
      
        vec2 toCenter = vec2(0.5) - vUv;
        float angle = atan(toCenter.y, toCenter.x);
        float radius = length(toCenter) * 2.;
        color = hsb2rgb(vec3((angle/TWO_PI) + 0.5, radius, 1.));
      
        gl_FragColor = vec4(color, 1.);
      }
      `
]

export default hsbPolar