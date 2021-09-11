
import * as THREE from 'three'
import { simplex2D } from './simplexNoises'

const LavaLampShader: [any, string, string] = [
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
      
      ${simplex2D}

    
    void main() {
        vec2 st = vUv;
        st.x *= vUv.x / vUv.y-40.;
        vec2 pos = vec2(st * 3.);
        float DF = 0.;
        vec3 color = vec3(0.);

        float a = 0.;
        vec2 vel = vec2(time*.1);
        DF += snoise(pos + vel)* .25 + .25;

        a = snoise(pos * vec2(cos(time * 0.15), sin(time * .1))* .1) * 3.1415;
        vel = vec2(cos(a), sin(a));
        DF += snoise(pos + vel)* .25 + .65;
        
        color = vec3(smoothstep(.7, .75, fract(DF)));
        gl_FragColor = vec4(color, 1.);
        
    }
      `
]

export default LavaLampShader


