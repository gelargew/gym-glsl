
import * as THREE from 'three'

const MosaicShader: [any, string, string] = [
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
            (10.+time)*(1.+4.*step(abs(uMouse.x), 0.3)));
    }
    
    void main() {
        vec2 st = vUv;
    
        st *= 10.0; 
        vec2 ipos = floor(st); 
        vec2 fpos = fract(st);  
    
        // Assign a random value based on the integer coord
        vec3 color = vec3(random( ipos ));
    
        gl_FragColor = vec4(color,1.0);
    }
      `
]

export default MosaicShader


