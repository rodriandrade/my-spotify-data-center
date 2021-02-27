import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer, TextContainer, Text} from './styled'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const AlbumCard = props =>{

    // Album Card with name
    const [albumToShow, setAlbumToShow] = useState([])
    const [artistsNames, setArtistsNames] = useState([]);
    const [tracks, setTracks] = useState([]);

    ////////////////////////////////////////////////////////////////////////////////////////

    // Album Card from Recommendations
    const [albumRecommendation, setAlbumRecommendation] = useState('')
    // Play track from album
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
        //console.log(responseRefreshToken.data.access_token);
        setToken(responseRefreshToken.data.access_token)
    }

    useEffect(() => {
        const fetchAlbumToShow = async () =>{
            if(props.data){
                const responseAlbum = await axios.get(`https://api.spotify.com/v1/search?q=${props.data}&type=album&limit=1`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                const responseAlbumTracks = await axios.get(`https://api.spotify.com/v1/albums/${responseAlbum.data.albums.items[0].id}`, {
                        headers: {
                        'Authorization': 'Bearer ' + token
                        }
                }); 
                setTracks(responseAlbumTracks.data.tracks.items);
                setAlbumToShow(responseAlbum.data.albums.items[0])

                //setTracks(responseAlbum.data.tracks.items);
                //console.log(responseAlbum);
                const artistInfo = responseAlbum.data.albums.items[0].artists;
                if(artistInfo){
                    const artistsNamesToShow = artistInfo.map(artist =>{
                        return artist.name
                    })
                    setArtistsNames(artistsNamesToShow);
                }
            }
        }
        fetchAlbumToShow();
    }, [props.data])

    useEffect(() => {
        const fetchAlbumToShow = async () =>{
            if(props.albumRecommendations){
                console.log(props.albumRecommendations);
                setAlbumRecommendation(true);
                const responseAlbumTracks = await axios.get(`https://api.spotify.com/v1/albums/${props.albumRecommendations.id}`, {
                        headers: {
                        'Authorization': 'Bearer ' + token
                        }
                }); 
                setTracks(responseAlbumTracks.data.tracks.items);
            }
        }
        fetchAlbumToShow();
    }, [props.albumRecommendations])

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
        if(tracks){
            console.log("holis");
          try {
          const devices = responseUserDevices.data.devices;
          if(devices.length == 0){
              setActiveDevices(false);
          } else{
              setActiveDevices(true)
              const deviceID = responseUserDevices.data.devices[0].id
              if(deviceID){
              //console.log("Holis");
              const trackID = tracks[0].id
              const requestData = {
                  "uris": [`spotify:track:${trackID}`],
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
                  props.setPlayingRightNow(trackID);
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
    }

    return (
        <>
            {!albumRecommendation ?
                <Col desktop={props.gridSize} tablet={6} mobile={12}>
                    <ImageContainer onClick={playTrack}>
                        {albumToShow.images && <TrackImage onClick={playTrack} src={albumToShow.images[1].url} alt={name} />}
                        <TextContainer onClick={playTrack}>
                            <Text onClick={playTrack}>Play On Spotify</Text>
                        </TextContainer>
                        {!!position && <TrackPosition>{position}</TrackPosition>}
                    </ImageContainer>
                    <Link
                        href={{
                        pathname: `/album/${albumToShow.name}`,
                        query: {
                            token: props.token,
                            id: albumToShow.id,
                            refreshToken: props.refreshToken,
                        },
                        }}
                    >
                        {albumToShow && <TrackName>{albumToShow.name}</TrackName>}
                    </Link>

                    {artistsNames && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
                </Col>
             :
                <Col desktop={props.gridSize} tablet={6} mobile={12}>
                    <ImageContainer onClick={playTrack}>
                        {props.albumRecommendations.images && <TrackImage onClick={playTrack} src={props.albumRecommendations.images[1].url} alt={name} />}
                        <TextContainer onClick={playTrack}>
                            <Text onClick={playTrack}>Play On Spotify</Text>
                        </TextContainer>
                    </ImageContainer>
                    <Link
                        href={{
                        pathname: `/album/${props.albumRecommendations.name}`,
                        query: {
                            token: props.token,
                            id: props.albumRecommendations.id,
                            refreshToken: props.refreshToken,
                        },
                        }}
                    >
                        {props.albumRecommendations && <TrackName>{props.albumRecommendations.name}</TrackName>}
                    </Link>
                    {props.albumRecommendations && <ArtistName>{props.albumRecommendations.artists[0].name}</ArtistName>}
                </Col>
            }
        </>
      
    );
}

export default AlbumCard