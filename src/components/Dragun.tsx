//@ts-nocheck
import * as THREE from 'three'
import React, { useRef, useState, useMemo, Suspense, useLayoutEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { useGLTF, Center, useFBO, Sphere, shaderMaterial, Box, Plane } from '@react-three/drei'
import simplex3D from '../shaders/simplex3d'
import hsbPolar from '../shaders/hsbPolar.shader'
import RectangleShader from '../shaders/rectangle.shader'
import CircleShader from '../shaders/circle.shader'

const ColorMaterial = shaderMaterial(...CircleShader)

extend({ ColorMaterial })

function Ob() {
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
      <colorMaterial side={THREE.DoubleSide} resolution={[size.width, size.height, 1]} />
    </Plane>
  )
}

export default function Dragun() {
  return (
    <>
      <Ob />
    </>
  )
}