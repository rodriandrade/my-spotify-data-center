import {TrackImage, TrackName, ArtistName, ImageContainer, Container, TextContainer, ContainerPlay, Cont, ContainerTrack, PlayState, CurrentlyPlayingCont, SoundBar, SoundContainer, TimePlayed, TrackSave, BlurContainer} from './styled'
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

    // Save & unsave album
    const [saveIcon, setSaveIcon] = useState('');
    const [save, setSave] = useState();

    // Token
    const [token, setToken] = useState(props.token);

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': props.refreshToken
            }
          });
        //console.log(responseRefreshToken.data.access_token);
        setToken(responseRefreshToken.data.access_token)
    }
 
    const player = async () => {
        const responsePlayingCheck = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        let isPlayingCheck = responsePlayingCheck.data.is_playing;
        //console.log(isPlayingCheck);
        if(isPlaying && isPlayingCheck){
            try{
                setIsPlaying(false);
                setIcon('/play.svg');
                axios({
                    method: "put",
                    url: `https://api.spotify.com/v1/me/player/pause`,
                    headers: { Authorization: "Bearer " + token },
                }).then(function (response) {
                    //console.log(response);
                });
                const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                        headers: {
                        'Authorization': 'Bearer ' + token
                        }
                });
                //console.log(responsePlaying);
                setProgress(responsePlaying.data.progress_ms)
            } catch(error){
                if (error.response.status === 401) {
                    getNewToken();
                }
                if (error.response.status === 500) {
                    console.log(error);
                }
                if (error.response.status === 504) {
                    console.log(error);
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
                    headers: { Authorization: "Bearer " + token },
                }).then(function (response) {
                    //console.log(response);
                });
            } catch(error){
                if (error.response.status === 401) {
                    getNewToken();
                }
                if (error.response.status === 500) {
                    console.log(error);
                }
                if (error.response.status === 504) {
                    console.log(error);
                }
            }
        }
    };

    // Check if track is saved
    useEffect(() => {
        const checkSave = async () =>{
            if(token && id){
            const responseSavedTrack = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
            });
            setSave(responseSavedTrack.data.toString());
            console.log(responseSavedTrack)
            if(responseSavedTrack.data.toString() === "true"){
                setSaveIcon('/heart.svg');
              } else{
                setSaveIcon('/heart_no_fill.svg');
              }
            }
        }
        checkSave();
    }, [props])

    // Save or unsave track
    const handleSave = async () => {
        const base_url = `https://api.spotify.com/v1/me/tracks?ids=${id}`
          axios({
            method: save === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + token }
          })
        setSave(save === "true" ? 'false' : 'true')
        setSaveIcon(save === "true" ? '/heart_no_fill.svg' : '/heart.svg');
    }

    let artistsNames = [];
    if(artists){
        const getNames = artists.map(artist =>{
            artistsNames.push(artist.name)
        })
    }

    return(
        <div>
        <Inner>
            <Container showPlayer={showPlayer} >
                <CurrentlyPlayingCont onClick={ ()=> setShowPlayer(!showPlayer) } blink={props.blink}>
                    <TimePlayed blink={props.blink}>Currently Playing</TimePlayed>
                </CurrentlyPlayingCont>
                    <SoundBar>
                    </SoundBar>
                    <Cont>
                        <ContainerTrack>
                            <SoundContainer isPlaying={isPlaying}>
                                <div />
                                <div />
                                <div />
                            </SoundContainer>
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
                        {saveIcon && <TrackSave onClick={handleSave} src={saveIcon} alt="save_icon"/>}
                        
                    </ContainerTrack>
                    <ContainerPlay>
                        <PlayState src={icon} alt="pause_button" onClick={player}/>
                    </ContainerPlay>
                    </Cont>
                
            </Container>
        </Inner>
        </div>
    )
}

export default CurrentlyPlayingCard