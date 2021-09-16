import { useTexture } from '@react-three/drei'
import { simplex3D } from './simplexNoises'

const getTexture = () => {
  const texture = useTexture('/particleMask.png')
  return texture
}

const ParticleTweenShader: [any, string, string] = [
    {
        uTime: 0,
        uSize: 5,
        morphProgress: 0,
        uMask: undefined,
        uMouse: undefined
      },
      `
      #ifdef GL_ES \n
      precision mediump float;
      #endif

      uniform float uTime;
      uniform float morphProgress;
      
      attribute vec3 targetPosition;

      varying vec3 vUv;
      varying float vAlpha;

      ${simplex3D}
      float exponentialInOut(float k) {
        // https://github.com/tweenjs/tween.js/blob/master/src/Tween.js
        if( k <= 0.0 ) {
          return 0.0;
        } else if( k >= 1.0 ) {
          return 1.0;
        } else if( ( k *= 2.0 ) < 1.0 ){
          return 0.5 * pow( 1024.0, k - 1.0 );
        }
    
        return 0.5 * ( - pow( 2.0, - 10.0 * ( k - 1.0 ) ) + 2.0 );
      }


      void main()	{
        vUv = position;

        vec3 delta = targetPosition - position;
        vec3 newPosition = position + delta * morphProgress;
        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.);
        gl_PointSize = 1.;
        gl_Position = projectionMatrix * mvPosition;
        vAlpha = 1.;
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

export default ParticleTweenShader


