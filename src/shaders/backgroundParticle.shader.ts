
import * as THREE from 'three'
import glsl from 'babel-plugin-glsl/macro'

const BackgroundParticle: [any, string, string] = [
    {
        uTime: 0,
        uSize: 25,
        uProgressSpeed: 0.01,
        uPerlinFrequency: 0.2,
        uPerlinMultiplier: 1,
        uMask: new THREE.Texture(),
        uMouse: new THREE.Vector2(0, 0)
      },
      glsl`
      uniform float uTime;
      uniform float uSize;
      uniform float uProgressSpeed;
      uniform float uPerlinFrequency;
      uniform float uPerlinMultiplier;

      attribute float aProgress;
      attribute float aSize;
      attribute float aAlpha;

      varying vec2 vUv;
      varying float vAlpha;

      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

      void main()	{
        float progress = mod(aProgress + uTime * uProgressSpeed, 1.);
        vec4 modelPosition = modelMatrix * vec4(position, 1.);
        modelPosition.y += progress * 10.;
        modelPosition.x += snoise3((modelPosition.xyz + vec3(0.,uTime * 0.5, 0.))* uPerlinFrequency)* uPerlinMultiplier;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        gl_Position = projectionMatrix * viewPosition;

        gl_PointSize = uSize * aSize;
        gl_PointSize *= (1. / -viewPosition.z);

        vAlpha = aAlpha;
      }
      `,
      glsl`
      #ifdef GL_ES \n
      precision mediump float;
      #endif
      
      
      uniform sampler2D uMask;

      varying float vAlpha;
      
      void main()
      {
          float maskStrength = texture2D(uMask, gl_PointCoord).r;
          gl_FragColor = vec4(1.0, 1.0, 1.0, maskStrength * vAlpha);
      }
      `
]

export default BackgroundParticle


