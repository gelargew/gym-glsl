
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
            (4600.+time));
    }
    
    void main() {
        vec2 st = vUv;
    
        st *= 10.0; // Scale the coordinate system by 10
        vec2 ipos = floor(st);  // get the integer coords
        vec2 fpos = fract(st);  // get the fractional coords
    
        // Assign a random value based on the integer coord
        vec3 color = vec3(random( ipos ));
    
        // Uncomment to see the subdivided grid
        //color = vec3(fpos,0.0);
    
        gl_FragColor = vec4(color,1.0);
    }
      `
]

export default MosaicShader


