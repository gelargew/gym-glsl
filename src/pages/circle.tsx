//@ts-nocheck
import { OrbitControls, Plane, shaderMaterial } from '@react-three/drei'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import Layout from '../components/Layout'
import * as THREE from 'three'
import CircleShader from '../shaders/circle.shader'
import { Helmet } from 'react-helmet'


const CustomMaterial = shaderMaterial(...CircleShader)
  
extend({ CustomMaterial })



export default function Circle() {

    return (
        <>
        <Helmet>
            <title>circle</title>
        </Helmet>
        <Layout code={CircleShader[2]} >
            
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
      <Plane ref={plane} args={[5, 5, 100, 100]} position={[1, 0, 0]} >
        <customMaterial side={THREE.DoubleSide}  />
      </Plane>
    )
  }