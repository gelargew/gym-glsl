
import * as THREE from 'three'

const DistanceField: [any, string, string] = [
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

float plot(vec2 st) {    
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
}

void main(){
    vec2 st = vUv;
    st = st*2. -1.;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);
	
    float f = cos(a*3.);
    f = abs(cos(a*3.));
    f = abs(cos(a*2.5))*.5+.3;
    f = abs(cos(a*12.)*sin(a*tan(time)))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;
    float d = length( abs(st)-.5 );

    color = vec3(fract(1.-smoothstep(f,f+0.02,r) * d ));

    gl_FragColor = vec4(color, 1.0);
}


      `
]

export default DistanceField


