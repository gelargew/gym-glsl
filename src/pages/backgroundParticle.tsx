//@ts-nocheck
import { Sphere, shaderMaterial, Plane, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import * as THREE from 'three'
import { Helmet } from 'react-helmet'
import { MeshSurfaceSampler } from 'three-stdlib'

import BackgroundParticleShader from '../shaders/backgroundParticle.shader'


const BackgroundParticleMaterial = shaderMaterial(...BackgroundParticleShader)
  
extend({ BackgroundParticleMaterial })



export default function BackgroundParticle() {

    return (
        <>
        <Helmet>
            <title>ba particles</title>
        </Helmet>
        <Layout code={BackgroundParticleShader} >
            
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
    const progressArray = new Float32Array(count)
    const sizeArray = new Float32Array(count)
    const alphaArray = new Float32Array(count)
    const text = new THREE.Mesh(new THREE.BoxGeometry(2, 15, 1))
    const sampler = new MeshSurfaceSampler(text).build()
    const _sample = new THREE.Vector3()
    const isMorphing = useState(false)
    for(let i = 0; i < count; i++)
    {
        sampler.sample(_sample)
        positionArray[i * 3 + 0] = _sample.x
        positionArray[i * 3 + 1] = _sample.y -5.0
        positionArray[i * 3 + 2] = _sample.z
        
        progressArray[i] = Math.random()

        sizeArray[i] = Math.random()*2

        alphaArray[i] = Math.random()
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))
    geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progressArray, 1))
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1))
    geometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphaArray, 1))

    useLayoutEffect(() => {
        camera.position.set(0, -5, 5)
    }, [])

    useFrame((state, delta) => {
        if (obj.current) {
            obj.current.material.uniforms.uTime.value += delta 
        }     
    })
    return (
        <>
      <points ref={obj} args={[geometry]} position={[0, -100, 0]} >
          <backgroundParticleMaterial attach='material' uMask={texture} depthTest={false} transparent blending={THREE.AdditiveBlending} />
      </points>
      </>

    )
  }