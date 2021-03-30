import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer, ContainerTrack, TextContainer, Text} from './styled'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Modal from '../Modal'

const TrackCard = props =>{

    const {genres, name, album, external_urls, id, artists} = props.data
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeDevices, setActiveDevices] = useState(props.activeDevices);

    const [trackName, setTrackName] = useState(name)
    const [artistName, setArtistName] = useState(artists[0].name)

    // Token
    const [token, setToken] = useState(props.token);
    
    const position = props.index + 1;

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': props.refreshToken
            }
          });
        setToken(responseRefreshToken.data.access_token)
    }

    const openModal = () =>{
        setModalIsOpen(!modalIsOpen)
    }

    useEffect(() => {
        console.log("activated")
      setActiveDevices(props.activeDevices)
    }, [props.activeDevices])

    /*
    useEffect(() => {
        const fetchDevices = async () =>{
            try{
                const responseUserDevicesCheck = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
                });
                const devicesCheck = responseUserDevicesCheck.data.devices;
                if(devicesCheck.length == 0){
                    setActiveDevices(false)
                } else{
                    setActiveDevices(true)
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
        fetchDevices();
    }, [])
    */

    const playTrack = async () =>{
        try{
            //console.log("Holis")
            const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
            });
            const devices = responseUserDevices.data.devices;
            if(devices.length == 0){
                setActiveDevices(false)
                //console.log("NO HAY DEVICES AMI")
                checkPlayTrack(responseUserDevices);
            } else{
                setActiveDevices(true)
                //console.log("YAAAAY, HAY DEVICES")
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

    const checkPlayTrack = (responseUserDevices) =>{
        try {
            const devices = responseUserDevices.data.devices;
            props.setBlink(false)
            if(devices.length == 0){
                //console.log("No devices ami")
                setActiveDevices(false);
            } else{
                //console.log("Play track")
                setActiveDevices(true)
                const deviceID = responseUserDevices.data.devices[0].id
                if(deviceID){
                    //console.log("Llegué acá")
                    const requestData = {
                        "uris": [`spotify:track:${id}`],
                        "position_ms": 0
                    }
                    //console.log(id)
                    const base_url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
                    axios({
                        method: 'put',
                        url: base_url,
                        data: requestData,
                        headers: { 'Authorization': 'Bearer ' + token }
                    })
                    .then(function (response) {
                        if(props.setPlayingRightNow){
                            props.setPlayingRightNow({
                                id: id,
                                artistName: artists[0].name,
                                trackName: name
                            })
                            props.setBlink(true)
                        }
                        if(props.setPlayerArtistPage){
                            props.setPlayerArtistPage(id)
                            props.setBlink(true)
                        }
                        if(props.setPlayerTrackPage){
                            props.setPlayerTrackPage(id)
                            props.setBlink(true)
                        }
                    });
                } else{
                    console.log("No hay devices activos")
                }
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
  
    const artistsNames = artists.map(artist =>{
        return artist.name
    })

    return(
        <Col desktop={props.gridSize} tablet={6} mobile={6}>
            <ContainerTrack>
            <div>
                {activeDevices == false && 
                    <Modal 
                        modalIsOpen={modalIsOpen} 
                        setModalIsOpen={setModalIsOpen}
                        title={"No active device detected"}
                        text={"In order to play a track, My Spotify Data Center has to detect an active device. Open Spotify in any device you like and start listening to something. After that, you could go back here to play the track you want! :)"}
                        buttonText={"Try again"}
                    />
                }
                <ImageContainer onClick={openModal} singleTrack={props.singleTrack}>
                    <a onClick={playTrack} target="_blank">
                        {/*<PlayOnSpotify onClick={openModal}>Play On Spotify</PlayOnSpotify>*/}
                        <TrackImage src={album.images[1].url} alt={name} onClick={openModal} singleTrack={props.singleTrack} />
                        <TextContainer>
                            <Text>Play On Spotify</Text>
                        </TextContainer>
                    </a>
                    {!!position && <TrackPosition>{position}</TrackPosition>}
                </ImageContainer>
                
                <Link href={{pathname: `/track/${id}`, query: { token: props.token, id: id, refreshToken: props.refreshToken }, }}>
                    <TrackName margin={props.margin}>{name}</TrackName>
                </Link>
                <ArtistName>{artistsNames.join(", ")}</ArtistName>
            </div>
            </ContainerTrack>
        </Col>
    )
}

export default TrackCard