
import * as THREE from 'three'
import glsl from 'babel-plugin-glsl/macro'
import { useTexture } from '@react-three/drei'

const getTexture = () => {
  const texture = useTexture('/particleMask.png')
  return texture
}

const BackgroundParticle: [any, string, string] = [
    {
        uTime: 0,
        uSize: 25,
        uProgressSpeed: 0.01,
        uPerlinFrequency: 0.1,
        uPerlinMultiplier: 5,
        uMask: undefined,
        uMouse: undefined
      },
      glsl`
      #ifdef GL_ES \n
      precision mediump float;
      #endif

      uniform float uTime;
      uniform float uSize;
      uniform float uProgressSpeed;
      uniform float uPerlinFrequency;
      uniform float uPerlinMultiplier;

      attribute float aProgress;
      attribute float aSize;
      attribute float aAlpha;

      varying vec3 vUv;
      varying float vAlpha;

      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

      void main()	{
        vUv = position;
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
      uniform float uTime;

      varying float vAlpha;
      varying vec3 vUv;

      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
      
      void main()
      {
          vec3 color = vec3(snoise3(vUv*uTime*0.01), 0.5, 0.5);
          float maskStrength = texture2D(uMask, gl_PointCoord).r;
          gl_FragColor = vec4(color, maskStrength * 2.);
      }
      `
]

export default BackgroundParticle


