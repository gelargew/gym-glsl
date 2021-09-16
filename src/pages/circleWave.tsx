//@ts-nocheck
import { Box, OrbitControls, Plane, shaderMaterial } from '@react-three/drei'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import Layout from '../components/Layout'
import * as THREE from 'three'
import { Helmet } from 'react-helmet'
import CircleWaveShader from '../shaders/circleWave.shader'


const CircleWaveMaterial = shaderMaterial(...CircleWaveShader)
  
extend({ CircleWaveMaterial })



export default function Circle() {

    return (
        <>
        <Helmet>
            <title>circleWave</title>
        </Helmet>
        <Layout code={CircleWaveShader} >
            
            <Obj />
        </Layout>
        </>
        
    )
}



function Obj() {
  
    
    const {size} = useThree()
    const VP = new THREE.Vector2()
    const plane = useRef<THREE.Object3D>()
  
    useFrame((state, delta) => {
      plane.current.material.uniforms.time.value += delta
      plane.current.position.x = Math.sin(state.clock.getElapsedTime())
      plane.current.material.uniforms.uMouse.value = state.mouse
      
    })
    return (
      <Box ref={plane} args={[3, 4, 5, 100]} position={[1, 0, 0]} rotation={[1, 0.4, 1]} >
        <circleWaveMaterial side={THREE.DoubleSide} time={0} resolution={[size.width, size.height, 1]} />
      </Box>
    )
  }