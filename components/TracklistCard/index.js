import {ContainerTrack, ContainerTrackData, TrackSave, TrackNumber, TrackDuration, TrackName, TrackPlay} from './styled'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Link from 'next/link'

const TracklistCard = props =>{
    const {name, duration_ms, track_number, id} = props.data;

    const [token, setToken] = useState(props.token);

    // Check if exist any active device
    const [activeDevices, setActiveDevices] = useState('');

    // Save & unsave album
    const [saveIcon, setSaveIcon] = useState('');
    const [save, setSave] = useState();

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': params.refresh_token
            }
          });
        setToken(responseRefreshToken.data.access_token)
    }

    useEffect(() => {
        const checkSave = async () =>{
            if(props.token){
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
            }
        }
        checkSave();
    }, [])

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
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                .then(function (response) {
                    //console.log(response);
                    //props.setPlayingRightNow(id);
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

    return(
        <>
            <ContainerTrack>
                <ContainerTrackData>
                    <TrackSave onClick={handleSave} src={saveIcon} alt="save_icon"/>
                    <TrackNumber>{track_number}.</TrackNumber>
                    <Link href={{pathname: `/track/${id}`, query: { token: props.token, id: id, refreshToken: props.refresh_token }, }}>
                        <TrackName>{name}</TrackName>
                    </Link>
                    <TrackPlay onClick={playTrack} src='/play.svg' alt="save_icon"/>
                </ContainerTrackData>
                <TrackDuration>{(duration_ms / 60000).toFixed(2)}</TrackDuration>
            </ContainerTrack>
        </>
    )
}

export default TracklistCard