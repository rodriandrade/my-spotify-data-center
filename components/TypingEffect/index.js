import { init } from 'ityped'
import { useRef, useEffect, useState } from 'react'
import Text from './styled'

const TypingEffect = props =>{

    const ref = useRef()

    useEffect(() => {
        if(props.title){
            ref.current = document.querySelector('#element')
            init(ref.current, { 
                showCursor: true, 
                strings: ['tracks', 'artists', 'albums', 'genres'], 
                backSpeed: 100
            })
        } else{
            ref.current = document.querySelector('#welcome')
            init(ref.current, { 
                showCursor: true, 
                strings: [`Hi, ${props.user} :)`], 
                backSpeed: 100,
                loop: false
            })
        }
    }, [])
    
    return(
        <div>
            {props.title ? 
                <div>
                    <Text>Discover your favorites <span id="element" className=".ityped-cursor"></span></Text>
                </div>
            : 
                <div>
                    <Text id="welcome" className=".ityped-cursor"></Text>
                </div>
            }
        </div>
        
    )
}

export default TypingEffect