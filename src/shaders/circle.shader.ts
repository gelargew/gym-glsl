import { shaderMaterial } from '@react-three/drei'
import { extend, Object3DNode } from '@react-three/fiber'
import * as THREE from 'three'

const CircleShader: [any, string, string] = [
    {
        time: 0.,
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

      varying vec2 vUv;
      
      void main() {
          float pct = 0.0;
          pct = distance(vUv, vec2(0.5));
          vec3 color = vec3(step(0.5, 1. - pct));
          gl_FragColor = vec4(color, 1.0);
      }
      `
]

export default CircleShader


