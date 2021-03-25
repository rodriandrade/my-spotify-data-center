import Inner from '../Inner'
import {Container, TrackLyrics, CloseButton, TrackTitle, TrackName, TrackArtist, LoadingContainer, LoadingImage, LoadingText} from './styled'
import ParticlesBackground from '../ParticlesBackground'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Lyrics = props => {

    /*
    const [infoLyrics, setInfoLyrics] = useState('')

    useEffect(() => {
        const getId = async () =>{
            const call = await axios.get("/api/references", {
                params: {
                    'artist': props.artist,
                    'track': props.track
                }
            })
            console.log(call)
            setInfoLyrics(call)

            const description = call.data.description.dom.children;
            console.log(description)
            
        }
        getId();
    }, [])
    */
    
    return(
        <Container>
                <Inner>
                    <CloseButton src="/cancel.svg" onClick={() => props.setAvailableLyrics(!props.availableLyrics)} />
                    <TrackName>{props.track}</TrackName>
                    <TrackArtist>{props.artist}</TrackArtist>
                    
                    {props.lyrics.data ? 
                    <TrackLyrics>{props.lyrics.data}</TrackLyrics>
                    : <LoadingContainer>
                    <LoadingImage src="/loading.gif" alt="loading" />
                    <LoadingText>Loading...</LoadingText>
                  </LoadingContainer>}
                </Inner>
        </Container>
    )
}

export default Lyrics