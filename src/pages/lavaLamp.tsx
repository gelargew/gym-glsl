//@ts-nocheck
import { Sphere, shaderMaterial, Plane } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import Layout from '../components/Layout'
import * as THREE from 'three'
import { Helmet } from 'react-helmet'

import LavaLampShader from '../shaders/lavaLamp.shader'


const LavaLampMaterial = shaderMaterial(...LavaLampShader)
  
extend({ LavaLampMaterial })



export default function Circle() {

    return (
        <>
        <Helmet>
            <title>lavaLamp</title>
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
      plane.current.rotation.set(state.mouse.y*0.2, state.mouse.x*0.4, Math.PI)
      plane.current.material.uniforms.time.value += delta
      plane.current.material.uniforms.uMouse.value = state.mouse
      
    })
    return (
      <Plane ref={plane} args={[5, 5, 100]} position={[1, 0, 0]} rotation={[0, 0, Math.PI]} >
        <lavaLampMaterial side={THREE.DoubleSide} time={0} resolution={[size.width, size.height, 1]} />
      </Plane>
    )
  }