//@ts-nocheck
import { Sphere, shaderMaterial, Plane, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import * as THREE from 'three'
import { Helmet } from 'react-helmet'
import { MeshSurfaceSampler } from 'three-stdlib'

import ParticleTweenShader from '../shaders/particleTween.shader'


const ParticleTweenMaterial = shaderMaterial(...ParticleTweenShader)
  
extend({ ParticleTweenMaterial })



export default function ParticleTween() {

    return (
        <>
        <Helmet>
            <title>ba particles</title>
        </Helmet>
        <Layout code={ParticleTweenShader} >
            
            <Obj />
        </Layout>
        </>
        
    )
}



function Obj() {
    const count = 30000
    const {camera} = useThree()
    const obj = useRef<THREE.Object3D>()
    const texture = useTexture('/particleMask.png')
    const geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(count * 3)
    const _sample = new THREE.Vector3()
    
    for (let i = 0; i < count; i++) {
        positionArray[i * 3] = Math.random()
        positionArray[i * 3 + 1] = Math.random()
        positionArray[i * 3 + 2] = Math.random()
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(50))
    const sampler = new MeshSurfaceSampler(mesh).build()
    for (let i = 0; i < count; i++) {
        sampler.sample(_sample)
        positionArray[i * 3] = _sample.x
        positionArray[i * 3 + 1] = _sample.y
        positionArray[i * 3 + 2] = _sample.z
    }
    geometry.setAttribute('targetPosition', new THREE.Float32BufferAttribute(positionArray, 3))


    useFrame((state, delta) => {
        if (obj.current) {
            obj.current.material.uniforms.uTime.value += delta 
            obj.current.material.uniforms.morphProgress.value = Math.sin(state.clock.getElapsedTime() * 0.5)
        }     
    })
    return (
        <>
            <points scale={2} ref={obj} args={[geometry]} >
                <particleTweenMaterial attach='material' uMask={texture} depthTest={false} transparent blending={THREE.AdditiveBlending} />
            </points>
        </>

    )
  }