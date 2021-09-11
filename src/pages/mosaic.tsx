//@ts-nocheck
import { Box, OrbitControls, Plane, shaderMaterial } from '@react-three/drei'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import Layout from '../components/Layout'
import * as THREE from 'three'
import { Helmet } from 'react-helmet'
import MosaicShader from '../shaders/mosaic.shader'


const MosaicMaterial = shaderMaterial(...MosaicShader)
  
extend({ MosaicMaterial })



export default function Circle() {

    return (
        <>
        <Helmet>
            <title>circle</title>
        </Helmet>
        <Layout>
            
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
      plane.current.rotateZ(0.01)
      plane.current.rotateY(0.005)
      plane.current.material.uniforms.time.value += delta
      plane.current.position.x = Math.sin(state.clock.getElapsedTime())
      plane.current.material.uniforms.uMouse.value = state.mouse
      
    })
    return (
      <Box ref={plane} args={[3, 4, 5, 100]} position={[1, 0, 0]} rotation={[1, 0.4, 1]} >
        <mosaicMaterial side={THREE.DoubleSide} time={0} resolution={[size.width, size.height, 1]} />
      </Box>
    )
  }