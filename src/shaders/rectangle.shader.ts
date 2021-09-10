import * as THREE from 'three'

const RectangleShader = [
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
          vec3 color = vec3(0.0);

          // bottom left
          vec2 bl = step(vec2(0.1), vUv);
          float pct = bl.x * bl.y;

          // top right
          vec2 tr = step(vec2(0.1), 1.0 - vUv);
          pct *= tr.x * tr.y;

          color = vec3(pct);

          gl_FragColor = vec4(vec3(1.0), pct);
      }
      `
]

export default RectangleShader