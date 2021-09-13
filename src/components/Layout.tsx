import { Center, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Link } from 'gatsby'
import React, { Suspense, useEffect, useState } from 'react'
import '../global.css'

const ROUTES = [
    'mosaic',
    'random',
    'circleWave',
    'circle',
    'lavaLamp'
]


export default function Layout(
    { children, withCanvas=true, code }: 
    { children: any, withCanvas?: boolean, code?: string }) {
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
                    <code>
                        {code}
                    </code>
                </div>
            </div>
            }
        </>
    )
}