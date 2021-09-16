import { Center, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Link } from 'gatsby'
import React, { Suspense, useEffect, useState } from 'react'
import '../global.css'

const ROUTES = [
    'backgroundParticle',
    'mosaic',
    'random',
    'circleWave',
    'circle',
    'lavaLamp',
    'particleTween'
]


export default function Layout(
    { children, withCanvas=true, code }: 
    { children: any, withCanvas?: boolean, code?: [any, string, string] }) {
    const [codeClass, setCodeClass] = useState('code-container code-hidden')
    

    return (
        <>

            <div className='navigation'>
                <Link to='/'>Home</Link>
                {ROUTES.map(route => <Link key={route} to={`/${route}`}>{route}</Link>)}
            </div>
            <main>
                {withCanvas ?
                <Canvas>
                    <Stats  />
                    <fog attach="fog" args={['#202020', 5, 20]} />
                    <ambientLight intensity={0.02} />
                    <OrbitControls />
                    <Suspense fallback={null}>
                        <Center>
                            {children}
                        </Center>                       
                    </Suspense>
                </Canvas>:
                <>
                {children}
                </>
            }                              
            </main>
            {code && 
            <div className={codeClass}>
                {codeClass === 'code-container' ?
                <button onClick={() => setCodeClass('code-container code-hidden')} className={'toggle-code'}>
                    CLOSE
                </button>:
                <button onClick={() => setCodeClass('code-container')} className='toggle-code' >
                    show code
                </button>
            }
                
                <div>
                    <h4>vertex shader: </h4>
                    <code>
                        {code[1]}
                    </code>
                    <h4>fragment shader: </h4>
                    <code>
                        {code[2]}
                    </code>
                </div>
            </div>
            }
        </>
    )
}