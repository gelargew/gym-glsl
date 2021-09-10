import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Box, OrbitControls, CameraShake, Center } from "@react-three/drei"
import Dragun from "../components/Dragun"
import '../global.css'
import * as THREE from 'three'




// markup
const IndexPage = () => {


  return (
    <main>
      <Canvas>
      <fog attach="fog" args={['#202020', 5, 20]} />
      <ambientLight intensity={0.02} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Center>
          <Dragun />
        </Center>
      </Suspense>
      {/* <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial />
      </mesh> */}
      </Canvas>
    </main>
  )
}

export default IndexPage
