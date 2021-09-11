import { Center, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Link } from 'gatsby'
import React, { Suspense } from 'react'
import '../global.css'

const ROUTES = [
    'mosaic',
    'random',
    'circleWave',
    'circle',
    'lavaLamp'
]


export default function Layout({ children, withCanvas=true }: { children: any, withCanvas?: boolean}) {

    return (
        <>
            <div id='navigation'>
                {ROUTES.map(route => <Link key={route} to={`/${route}`}>{route}</Link>)}
            </div>
            <main>
                {withCanvas ?
                <Canvas>
                    <fog attach="fog" args={['#202020', 5, 20]} />
                    <ambientLight intensity={0.02} />
                    <OrbitControls />
                    <Suspense fallback={null}>
                        <Center>
                            {children}
                        </Center>                       
                    </Suspense>
                </Canvas>:
                {children}
            }                              
            </main>
        </>
    )
}