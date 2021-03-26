import {TrackImage, TrackName, ArtistName, ImageContainer, Container, TextContainer, ContainerPlay, Cont, ContainerTrack, PlayState, CurrentlyPlayingCont, SoundContainer, TimePlayed, TrackSave, BlurContainer, DevicesMenuContainer, DevicesMenuTitle, DeviceContainer, DeviceName, DeviceType, DeviceInfo, LyricsContainer, IconsContainer} from './styled'
import Link from 'next/link'
import Inner from '../Inner'
import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react'
import Lyrics from '../Lyrics'

const CurrentlyPlayingCard = props =>{

    const ref = useRef()
    
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
    const [refreshToken, setRefreshToken] = useState(props.refreshToken)

    // Devices
    const [availableDevices, setAvailableDevices] = useState(false)
    const [devices, setDevices] = useState([])

    // Lyrics
    const [lyrics, setLyrics] = useState('')
    const [availableLyrics, setAvailableLyrics] = useState(false)

    const deviceIcon = {
        "Computer": "/laptop.svg",
        "Smartphone": "/smartphone.svg"
    }

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': refreshToken
            }
          });
        //console.log(responseRefreshToken.data.access_token);
        setToken(responseRefreshToken.data.access_token)
    }

    const openLyrics = () =>{
      setAvailableLyrics(!availableLyrics)
    }
 
    const player = async () => {
        console.log("Hi, I'm the player function")
        /*
        const responsePlayingCheck = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        let isPlayingCheck = responsePlayingCheck.data.is_playing;
        console.log(isPlaying)
        console.log(isPlayingCheck)
        //console.log(isPlayingCheck);
        */
        if(isPlaying /*&& isPlayingCheck*/){
            try{
                console.log("Si estoy acá es porque algo esta sonando y se tiene que pausar")
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
                console.log("Si estoy acá es porque no hay nada sonando")
                setIsPlaying(true);
                setIcon('/pause.svg');
                console.log(progress)
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

          // Check Currently Playing
          const checkCurrentlyPlaying = async () => {
            if(token){
              try {
                const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                });
                console.log(isPlaying)
                if(responsePlaying.data.is_playing === true){
                  setIcon('/pause.svg');
                  setIsPlaying(true)
                  console.log("llegué a poner el icono de pausa")
                }else{
                  setIcon('/play.svg');
                  console.log("llegué a poner el icono de play")
                  setIsPlaying(false)
                  setProgress(responsePlaying.data.progress_ms)
                }
              } catch (error) {
                console.error('este es mi error',error);
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
          useEffect(()=>{
            checkCurrentlyPlaying()
            const interval=setInterval(()=>{
              checkCurrentlyPlaying()
             },2000)
             return()=>clearInterval(interval)
          },[token])

    // Check if track is saved
    useEffect(() => {
        const checkSave = async () =>{
            if(token && id){
              try{
                const responseSavedTrack = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });
                setSave(responseSavedTrack.data.toString());
                if(responseSavedTrack.data.toString() === "true"){
                    setSaveIcon('/heart.svg');
                  } else{
                    setSaveIcon('/heart_no_fill.svg');
                  }
              } catch (error) {
                //console.log("ACÁ HUBO UN ERROR, VIEJO")
                console.error('este es mi error',error);
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
          }
        checkSave();
    }, [props])

    // Check lyrics
    useEffect(() => {
      const checkLyrics = async () =>{
          try{
            if(props.playingRightNow && artists){
              setLyrics('')
              const getLyrics = await axios.get('/api/lyrics', {
                params: {
                  'artist': artists[0].name,
                  'title': name
                }
              });
              setLyrics(getLyrics)
              console.log(getLyrics)
            }
          } catch(error){
              console.error('este es mi error',error);
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
      checkLyrics()
  }, [id])


  /*
    // Check devices
    useEffect(() => {
        const checkDevices = async () =>{
            try{
                const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                        headers: {
                        'Authorization': 'Bearer ' + token
                        }
                });
                const devices = responseUserDevices.data.devices;
                console.log(devices);
                setDevices(devices)
                /*
                if(devices.length == 0){
                    setActiveDevices(false)
                    checkPlayTrack(responseUserDevices);
                } else{
                    setActiveDevices(true)
                    checkPlayTrack(responseUserDevices);
                }
                
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
        checkDevices()
    }, [])
    */

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

    const selectDevice = () =>{

    }

    //<Inner></Inner>
    /*
    {/*
                <TrackSave
                  onClick={() => setAvailableDevices(!availableDevices)}
                  src="/responsive.svg"
                  alt="devices_icon"
                />

                {availableDevices ? (
                  <DevicesMenuContainer>
                    <DevicesMenuTitle>Available devices</DevicesMenuTitle>
                    {devices.map(device => (
                        <DeviceContainer active={device.is_active} onClick={ () => props.setSelectDevice(device.id)}>
                            <TrackSave src={deviceIcon[device.type]} alt="device-icon" />
                            <DeviceInfo>
                                <DeviceName active={device.is_active}>{device.name}</DeviceName>
                                <DeviceType>{device.type}</DeviceType>
                            </DeviceInfo>
                        </DeviceContainer>
                    ))}
                  </DevicesMenuContainer>
                ) : null}
 
                    */
    

    return (
      <>
          {availableLyrics ? (
              <Lyrics 
                lyrics={lyrics}
                availableLyrics={availableLyrics}
                setAvailableLyrics={setAvailableLyrics}
                artist={artists[0].name}
                track={name}
              />
          ) : null}

          <Container showPlayer={showPlayer}>
            <CurrentlyPlayingCont
              onClick={() => setShowPlayer(!showPlayer)}
              blink={props.blink}
            >
              <TimePlayed blink={props.blink}>Currently Playing</TimePlayed>
            </CurrentlyPlayingCont>
            
            <Cont>
              <ContainerTrack>
                <SoundContainer isPlaying={isPlaying}>
                  <div />
                  <div />
                  <div />
                </SoundContainer>
                {props.data.length !== 0 && (
                  <a href={external_urls.spotify} target="_blank">
                    <ImageContainer>
                      <TrackImage src={album.images[1].url} alt="playing" />
                    </ImageContainer>
                  </a>
                )}
                <TextContainer>
                  <Link
                    href={{
                      pathname: `/track/${id}`,
                      query: {
                        token: token,
                        id: id,
                        refreshToken: refreshToken,
                      },
                    }}
                  >
                    <TrackName>{name}</TrackName>
                  </Link>
                  <ArtistName>{artistsNames.join(", ")}</ArtistName>
                </TextContainer>
                <IconsContainer>
                  {saveIcon && (
                    <TrackSave
                      onClick={handleSave}
                      src={saveIcon}
                      alt="save_icon"
                    />
                  )}

                  <TrackSave
                    onClick={openLyrics}
                    src="/subtitles.svg"
                    alt="lyrics_icon"
                  />
                </IconsContainer>
                
              </ContainerTrack>
              <ContainerPlay>
                <PlayState src={icon} alt="pause_button" onClick={player} />
              </ContainerPlay>
            </Cont>
          </Container>
  
      </>
    );
}

export default CurrentlyPlayingCard