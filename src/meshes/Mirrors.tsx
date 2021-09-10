import React from 'react'
import { Reflector, useTexture } from '@react-three/drei'
import * as THREE from 'three'



export default function Mirror() {
    const [floor, normal] = useTexture(['/textures/SurfaceImperfections003_1K_var1.jpg','/textures/SurfaceImperfections003_1K_NormalGL.jpg'])
    
    return (
        <Reflector 
        resolution={512} 
        args={[10, 10]} 
        mirror={0.5} 
        mixBlur={10} 
        mixStrength={0.8} 
        position={[0, 0, -2]} 
        rotation={[0, 0, 0]} blur={[400, 100]}>
      {(Material, props) => <Material side={THREE.DoubleSide} color="#a0a0a0" normalScale={new THREE.Vector2(1, 1)} metalness={0.5} alphaMap={floor} alphaTest={0.2} normalMap={normal} {...props} />}
    </Reflector>
    )
}