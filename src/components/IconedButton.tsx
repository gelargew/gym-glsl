import React from 'react'


export default function IconedButton({ Icon }: { Icon: () => JSX.Element}) {
    
    return (
        <div className='iconed-button'>
            <div className='ripple'></div>
            <Icon />

        </div>
    )
}