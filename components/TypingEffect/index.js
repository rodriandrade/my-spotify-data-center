import { init } from 'ityped'
import { useRef, useEffect, useState } from 'react'
import Text from './styled'

const TypingEffect = () =>{

    const ref = useRef()

    useEffect(() => {
        ref.current = document.querySelector('#element')
        init(ref.current, { 
            showCursor: true, 
            strings: ['tracks', 'artists', 'albums', 'genres'], 
            backSpeed: 100
        })
    }, [])
    
    return(
        <div>
            <Text>Discover your favorites <span id="element" className=".ityped-cursor"></span></Text>
        </div>
    )
}

export default TypingEffect