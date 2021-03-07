import {Container, TrackName, TimePlayed, ArtistName, AlbumImage, ContainerInfo, ContainerImage, ContainerTrackData, TextContainer, Text, TrackPlay} from './styled'
import Link from 'next/link'
import {Grid, Col} from '../Grid'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const RecentlyPlayedCard = props =>{

    const {played_at, track} = props.data;
    const {artists, album, id} = track
    const {images} = album;
    //console.log(props.data);
    const artistName = [];
    const albumImage = images[1].url;

    // Check if exist any active device
    const [activeDevices, setActiveDevices] = useState('');

    // Token
    const [token, setToken] = useState(props.token);

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': props.refreshToken
            }
          });
        setToken(responseRefreshToken.data.access_token)
    }

    artists.map(artist => {
        artistName.push(artist.name)
    })

    const playedDay = played_at.slice(0, 10);
    const playedTime = played_at.slice(11, 19);

    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const hour = playedTime.slice(0,2);

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
            console.log(error);
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

    return(
        <Col desktop={12} tablet={6} mobile={12}>
            <Container>
                <ContainerTrackData>
                    <ContainerImage onClick={playTrack} >
                        <AlbumImage src={albumImage} onClick={playTrack}/>
                        <TextContainer onClick={playTrack}>
                            <TrackPlay src="/play.svg" alt="play_track_icon" onClick={playTrack}/>
                        </TextContainer>
                    </ContainerImage>
                    <ContainerInfo>
                        <Link href={{pathname: `/track/${track.id}`, query: { token: props.token, id: track.id }, }}>
                            <TrackName>{track.name}</TrackName>
                        </Link>
                        <ArtistName>{artistName.join(", ")}</ArtistName>
                    </ContainerInfo>
                </ContainerTrackData>
                <TimePlayed>Played: {playedDay} at {playedTime} {playedTime.slice(0,2) < 12 ? "A.M" : "P.M"}</TimePlayed>
            </Container>
        </Col>
    )
}

export default RecentlyPlayedCard