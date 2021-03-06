
import * as THREE from 'three'

const CircleWaveShader: [any, string, string] = [
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
      
      vec2 random2(vec2 st){
        st = vec2( dot(st,vec2(127.1,311.7)),
                  dot(st,vec2(269.5,183.3)) );
        return -1.0 + 2.0*fract(sin(st)*43758.5453123);
    }
    
    // Gradient Noise by Inigo Quilez - iq/2013
    // https://www.shadertoy.com/view/XdXGW8
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
    
        vec2 u = f*f*(3.0-2.0*f);
    
        return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                         dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                    mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                         dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    }
    
    mat2 rotate2d(float _angle){
        return mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle));
    }
    
    float shape(vec2 st, float radius) {
        st = vec2(0.5)-st;
        float r = length(st)*2.0;
        float a = atan(st.y,st.x);
        float m = abs(mod(a+time*2.,3.14*2.)-3.14)/3.6;
        float f = radius;
        m += noise(st+time*0.1)*.5;
        //a *= 1.+abs(atan(time*0.2))*.1;
        //a *= 1.+noise(st+time*0.1)*0.1;
        m += uMouse.x * 0.01;
        a += uMouse.y;
        f += sin(a*50.)*noise(st+time*.2)*.1;
        f += (sin(a*20.)*.1*pow(m,2.));
        return 1.-smoothstep(f,f+0.007,r);
    }
    
    float shapeBorder(vec2 st, float radius, float width) {
        return shape(st,radius)-shape(st,radius-width);
    }
    
    void main() {
        vec2 st = vUv;
        vec3 color = vec3(1.0) * shapeBorder(st,0.8,0.02);
    
        gl_FragColor = vec4( color, 1.0 );
    }
    
      `
]

export default CircleWaveShader


