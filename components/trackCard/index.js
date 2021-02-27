import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer, ContainerTrack, TextContainer, Text} from './styled'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Modal from '../Modal'

const TrackCard = props =>{

    const {genres, name, album, external_urls, id, artists} = props.data
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeDevices, setActiveDevices] = useState('');

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

    const playTrack = async () =>{
        try{
        const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                headers: {
                'Authorization': 'Bearer ' + token
                }
            });
        const devices = responseUserDevices.data.devices;
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

    const checkPlayTrack = (responseUserDevices) =>{
        try {
        const devices = responseUserDevices.data.devices;
        if(devices.length == 0){
            setActiveDevices(false);
        } else{
            setActiveDevices(true)
            const deviceID = responseUserDevices.data.devices[0].id
            if(deviceID){
            //console.log("Holis");
            //console.log("El ID es" + id)
            const requestData = {
                "uris": [`spotify:track:${id}`],
                "position_ms": 0
            }
            const base_url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
            axios({
                method: 'put',
                url: base_url,
                data: requestData,
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(function (response) {
                //console.log(response);
                props.setPlayingRightNow(id);
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
        <Col desktop={props.gridSize} tablet={6} mobile={12}>
            <ContainerTrack>
            <div>
                {!activeDevices && <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />}
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