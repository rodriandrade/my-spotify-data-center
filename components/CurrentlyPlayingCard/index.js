import {TrackImage, TrackName, ArtistName, ImageContainer, Container, TextContainer, ContainerPlay, Cont, ContainerTrack, PlayState, CurrentlyPlayingCont, SoundBar, SoundContainer, TimePlayed} from './styled'
import Link from 'next/link'
import Inner from '../Inner'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

const CurrentlyPlayingCard = props =>{

    const {name, artists, album, external_urls, id, uri, track_number} = props.data
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState('')
    const [showPlayer, setShowPlayer] = useState(true)
    const [icon, setIcon] = useState('/pause.svg');

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': props.refreshToken
            }
          });
        console.log(responseRefreshToken.data.access_token);
        props.setToken(responseRefreshToken.data.access_token)
    }
 
    const player = async () => {
        const responsePlayingCheck = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        });
        let isPlayingCheck = responsePlayingCheck.data.is_playing;
        console.log(isPlayingCheck);
        if(isPlaying && isPlayingCheck){
            try{
                setIsPlaying(false);
                setIcon('/play.svg');
                axios({
                    method: "put",
                    url: `https://api.spotify.com/v1/me/player/pause`,
                    headers: { Authorization: "Bearer " + props.token },
                }).then(function (response) {
                    console.log(response);
                });
                const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                        headers: {
                        'Authorization': 'Bearer ' + props.token
                        }
                });
                console.log(responsePlaying);
                setProgress(responsePlaying.data.progress_ms)
            } catch(error){
                if (error.response.status === 401) {
                    getNewToken();
                }
            }
        } else{
            try{
                setIsPlaying(true);
                setIcon('/pause.svg');
                axios({
                    method: "put",
                    url: `https://api.spotify.com/v1/me/player/play`,
                    data: {
                        "context_uri": album.uri,
                        "offset": {
                            "position": track_number - 1
                        },
                        "position_ms": progress
                    },
                    headers: { Authorization: "Bearer " + props.token },
                }).then(function (response) {
                    console.log(response);
                });
            } catch(error){
                if (error.response.status === 401) {
                    getNewToken();
                }
            }
        }
    };

    let artistsNames = [];
    if(artists){
        const getNames = artists.map(artist =>{
            artistsNames.push(artist.name)
        })
    }

    return(
        <div>
        <Container showPlayer={showPlayer} >
            <CurrentlyPlayingCont onClick={ ()=> setShowPlayer(!showPlayer) }>
                <TimePlayed>Currently Playing</TimePlayed>
            </CurrentlyPlayingCont>
            <Cont>
                <ContainerTrack>
                {props.data.length !== 0 &&
                    <a href={external_urls.spotify} target="_blank">
                        <ImageContainer>
                            <TrackImage src={album.images[1].url} alt="playing" />
                        </ImageContainer>
                    </a>
                }
                <TextContainer>
                    <Link href={{pathname: `/track/${id}`, query: { token: props.token, id: id }, }}>
                        <TrackName>{name}</TrackName>
                    </Link>
                    <ArtistName>{artistsNames.join(", ")}</ArtistName>
                </TextContainer>
            </ContainerTrack>
            <ContainerPlay>
                <PlayState src={icon} alt="pause_button" onClick={player}/>
                <SoundContainer>
                </SoundContainer>
            </ContainerPlay>
            </Cont>
        </Container>
        </div>
    )
}

export default CurrentlyPlayingCard