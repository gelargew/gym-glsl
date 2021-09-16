
import * as THREE from 'three'
import glsl from 'babel-plugin-glsl/macro'
import { useTexture } from '@react-three/drei'
import { simplex3D } from './simplexNoises'

const getTexture = () => {
  const texture = useTexture('/particleMask.png')
  return texture
}

const BackgroundParticle: [any, string, string] = [
    {
        uTime: 0,
        uSize: 5,
        uProgressSpeed: 0.1,
        uPerlinFrequency: 0.1,
        uPerlinMultiplier: 5,
        uMask: undefined,
        uMouse: undefined
      },
      `
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

      ${simplex3D}

      void main()	{
        vUv = position;
        float progress = mod(aProgress + uTime * uProgressSpeed, 1.);
        vec4 modelPosition = modelMatrix * vec4(position, 1.);
        modelPosition.y += progress * 10.;
        float pos = snoise((modelPosition.xyz + vec3(0.,uTime * 0.5, 0.))* uPerlinFrequency)* uPerlinMultiplier;
        modelPosition.xy += pos;
        
        
        
        vec4 viewPosition = viewMatrix * modelPosition;
        gl_Position = projectionMatrix * viewPosition;

        gl_PointSize = uSize * aSize;
        gl_PointSize *= (1. / -viewPosition.z);

        vAlpha = aAlpha;
      }
      `,
      `
      #ifdef GL_ES \n
      precision mediump float;
      #endif
      
      
      uniform sampler2D uMask;
      uniform float uTime;

      varying float vAlpha;
      varying vec3 vUv;

      ${simplex3D}
      
      void main()
      {
          vec3 color = vec3(snoise(vUv*uTime*0.01), 0.5, 0.5);
          float maskStrength = texture2D(uMask, gl_PointCoord).r;
          gl_FragColor = vec4(color, maskStrength * 2.);
      }
      `
]

export default BackgroundParticle


