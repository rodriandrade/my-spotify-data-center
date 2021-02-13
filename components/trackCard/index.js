import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer} from './styled'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Modal from '../Modal'

const TrackCard = props =>{

    const {genres, name, album, external_urls, id, artists} = props.data
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeDevices, setActiveDevices] = useState('');
    
    const position = props.index + 1;

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': props.refreshToken
            }
          });
        console.log(responseRefreshToken.data.access_token);
        props.setToken(responseRefreshToken.data.access_token)
    }

    const openModal = () =>{
        setModalIsOpen(!modalIsOpen)
    }

    useEffect(() => {
        const fetchDevices = async () =>{
            try{
                const responseUserDevicesCheck = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                headers: {
                'Authorization': 'Bearer ' + props.token
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
            }
        }
        fetchDevices();
    }, [])

    const playTrack = async () =>{
        try{
        const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                headers: {
                'Authorization': 'Bearer ' + props.token
                }
            });
        const devices = responseUserDevices.data.devices;
        if(devices.length == 0){
            //console.log("No hay devices activos");
            setActiveDevices(false)
            checkPlayTrack(responseUserDevices);
            //setIsDevice(false)
        } else{
            //console.log("Hay un device activo.")
            setActiveDevices(true)
            checkPlayTrack(responseUserDevices);
            //setIsDevice(true)
            /*
            const devices = responseUserDevices.data.devices;
            const deviceID = responseUserDevices.data.devices[0].id
            //console.log(deviceActive);
            //const deviceID = deviceActive[0].id;
            if(deviceID){
            const requestData = {
                "uris": [`spotify:track:${id}`],
                "position_ms": 0
            }
            const base_url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
            axios({
                method: 'put',
                url: base_url,
                data: requestData,
                headers: { 'Authorization': 'Bearer ' + props.token }
            })
            .then(function (response) {
                //console.log(response);
            });
            } else{
                console.log("No hay devices activos")
            }
            */
        }
        } catch(error){
            if (error.response.status === 401) {
                getNewToken();
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
            const requestData = {
                "uris": [`spotify:track:${id}`],
                "position_ms": 0
            }
            const base_url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
            axios({
                method: 'put',
                url: base_url,
                data: requestData,
                headers: { 'Authorization': 'Bearer ' + props.token }
            })
            .then(function (response) {
                //console.log(response);
            });
            } else{
                console.log("No hay devices activos")
            }
        }
        } catch(error){
            if (error.response.status === 401) {
                getNewToken();
            }
        }
    }
  
    const artistsNames = artists.map(artist =>{
        return artist.name
    })

    //console.log(artistsNames);
    /*
    {artists.map(artist => 
                    <Link href={{pathname: `/artist/${artist.name}`, query: { token: props.token, id: artist.id }, }}>
                        <ArtistName>{artist.name}</ArtistName>
                    </Link>
                )}
    */

    return(
        <Col desktop={props.gridSize} tablet={6} mobile={12}>
            <div>
                {!activeDevices && <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />}
                <ImageContainer onClick={openModal}>
                    <a onClick={playTrack} target="_blank">
                        <PlayOnSpotify onClick={openModal}>Play On Spotify</PlayOnSpotify>
                        <TrackImage src={album.images[1].url} alt={name} onClick={openModal}/>
                    </a>
                </ImageContainer>
                {!!position && <TrackPosition>{position}</TrackPosition>}
                <Link href={{pathname: `/track/${id}`, query: { token: props.token, id: id, refreshToken: props.refreshToken }, }}>
                    <TrackName>{name}</TrackName>
                </Link>
                <ArtistName>{artistsNames.join(", ")}</ArtistName>
            </div>
        </Col>
    )
}

export default TrackCard