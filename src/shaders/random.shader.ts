
import * as THREE from 'three'

const RandomShader: [any, string, string] = [
    {
        time: 0,
        resolution: new THREE.Vector3(),
        uMouse: new THREE.Vector2(0, 0)
      },
      `
      varying vec2 vUv;

      void main()	{
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      `
      #ifdef GL_ES
      precision mediump float;
      #endif
      
      
      uniform vec2 uMouse;
      uniform float time;

      varying vec2 vUv;
      
      float random (vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(.4,2.)))*
            (4600.+time));
    }
    
    void main() {
        vec2 st = vUv;
    
        float rnd = random( st );
    
        gl_FragColor = vec4(vec3(rnd),1.);
    }
      `
]

export default RandomShader


