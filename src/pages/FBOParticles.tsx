//@ts-nocheck
import { Sphere, shaderMaterial, Plane } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import * as THREE from 'three'
import { Helmet } from 'react-helmet'

import SimulationShader from '../shaders/gpgpu/simulation.shader'


const LavaLampMaterial = shaderMaterial(...SimulationShader)
  
extend({ LavaLampMaterial })



export default function FBOParticles() {

    return (
        <>
        <Helmet>
            <title>lavaLamp</title>
        </Helmet>
        <Layout code={SimulationShader[2]} >
            
            <Obj />
        </Layout>
        </>
        
    )
}



function Obj() {
  
    const plane = useRef<THREE.Object3D>()
  
    useFrame((state, delta) => {
      plane.current.rotation.set(state.mouse.y, state.mouse.x, Math.PI)
      plane.current.rotation.set(
        THREE.MathUtils.lerp(plane.current.rotation.x, 0, 0.5), 
        THREE.MathUtils.lerp(plane.current.rotation.y, 0, 0.5), 
        Math.PI)
      plane.current.material.uniforms.time.value += delta
      plane.current.material.uniforms.uMouse.value = state.mouse
      
    })
    return (
      <Plane ref={plane} args={[5, 5, 100]} position={[1, 0, 0]} rotation={[0, 0, Math.PI]} >
        <lavaLampMaterial side={THREE.DoubleSide} time={0} />
      </Plane>
    )
  }