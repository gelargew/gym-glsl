import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { simplex3D } from '../simplexNoises'
import curlNoise from '../curlNoise'

const getPoint = (v: THREE.Vector3, size=1, data: Float32Array, offset=0) => {
    v.set(Math.random() * 2 -1, Math.random() * 2 -1, Math.random() * 2 - 1)
    if (v.length() > 1) return getPoint(v, size, data, offset)
    return v.normalize().multiplyScalar(size).toArray(data, offset)
}

const getSphere = (count=0, size=1, p= new THREE.Vector3()) => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) getPoint(p, size, data, i)
    return data
}


const SimulationShader: [any, string, string] = [
    {
        uTime: 0,
        resolution: new THREE.Vector3(),
        uMouse: new THREE.Vector2(0, 0),
        uCurlFreq: 0.25,
        positions: new THREE.DataTexture(getSphere(512 * 512, 128), 512, 512, THREE.RGBAFormat, THREE.FloatType)
      },
      `
      varying vec2 vUv;

      void main()	{
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
      `
      #ifdef GL_ES \n
      precision mediump float;
      #endif
      
      
      uniform vec2 uMouse;
      uniform float uTime;
      uniform sampler2D positions;
      uniform float uCurlFreq;

      varying vec2 vUv;
      
      ${simplex3D}
      ${curlNoise}

    
    void main() {
        float t = uTime * 0.015;
        vec3 pos = texture2D(positions, vUv).rgb;
        vec3 curlPos = texture2D(positions, vUv).rgb;
        pos = curl(pos * uCurlFreq + t);
        curlPos = curl(curlPos * uCurlFreq + t);
        curlPos += curl(curlPos * uCurlFreq * 2.0) * 0.5;
        curlPos += curl(curlPos * uCurlFreq * 4.0) * 0.25;
        curlPos += curl(curlPos * uCurlFreq * 8.0) * 0.125;
        curlPos += curl(pos * uCurlFreq * 16.0) * 0.0625;
        gl_FragColor = vec4(mix(pos, curlPos, noise(pos + t)), 1.0);       
    }
      `
]

export default SimulationShader


