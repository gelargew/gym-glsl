import { Plane } from '@react-three/drei'
import React from 'react'


export default function TV(props: JSX.IntrinsicElements['group']) {

    return (
        <group {...props} >
            <Plane args={[5, 5, 10, 10]} >
                <meshPhongMaterial wireframe />
            </Plane>
        </group>
    )
        
        
}