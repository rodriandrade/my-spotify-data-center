import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer, TextContainer, Text} from './styled'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Modal from '../Modal'

const AlbumCard = props =>{

    // Album Card with name
    const [albumToShow, setAlbumToShow] = useState([])
    const [artistsNames, setArtistsNames] = useState([]);
    const [tracks, setTracks] = useState([]);

    ////////////////////////////////////////////////////////////////////////////////////////

    // Album Card from Recommendations
    const [albumRecommendation, setAlbumRecommendation] = useState('')
    // Play track from album
    const [activeDevices, setActiveDevices] = useState(props.activeDevices);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Token
    const [token, setToken] = useState(props.token);
    const [refreshToken, setRefreshToken] = useState(props.refreshToken);

    const position = props.index + 1;

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': refreshToken
            }
          });
        //console.log(responseRefreshToken.data.access_token);
        setToken(responseRefreshToken.data.access_token)
    }

    useEffect(() => {
        const fetchAlbumToShow = async () =>{
            if(props.data){
                try{
                    /*
                    const responseAlbum = await axios.get(`https://api.spotify.com/v1/search?q=album:${props.data.name}%20artist:${props.data.artist}&type=album&limit=1`, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    console.log(responseAlbum)
                    */
                    const responseAlbumTracks = await axios.get(`https://api.spotify.com/v1/albums/${props.data.id}`, {
                            headers: {
                            'Authorization': 'Bearer ' + token
                            }
                    }); 
                    setTracks(responseAlbumTracks.data.tracks.items);
                    setAlbumToShow(props.data)

                    //setTracks(responseAlbum.data.tracks.items);
                    //console.log(responseAlbum);
                    const artistInfo = props.data.artists;
                    if(artistInfo){
                        const artistsNamesToShow = artistInfo.map(artist =>{
                            return artist.name
                        })
                        setArtistsNames(artistsNamesToShow);
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
        fetchAlbumToShow();
    }, [props.data])

    useEffect(() => {
        const fetchAlbumToShow = async () =>{
            if(props.albumRecommendations){
                try{
                    //console.log(props.albumRecommendations);
                    setAlbumRecommendation(true);
                    const responseAlbumTracks = await axios.get(`https://api.spotify.com/v1/albums/${props.albumRecommendations.id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }); 
                    setTracks(responseAlbumTracks.data.tracks.items);  
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
        fetchAlbumToShow();
    }, [props.albumRecommendations])

    const playTrack = async () =>{
        //console.log("click")
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
        //console.log("Hola")
        if(tracks){
            if(props.setBlink){
                props.setBlink(false)
            }
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
              //console.log(trackID)
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
                  if(props.setPlayingRightNow){
                    props.setPlayingRightNow(trackID);
                    props.setBlink(true)
                  }
                  if(props.setPlayerAlbumPage){
                    props.setPlayerAlbumPage(trackID)
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
    }

    const openModal = () =>{
        setModalIsOpen(!modalIsOpen)
    }

    return (
        <>
            {!albumRecommendation ?
                <Col desktop={props.gridSize} tablet={6} mobile={6}>
                    {!activeDevices && 
                        <Modal 
                            modalIsOpen={modalIsOpen} 
                            setModalIsOpen={setModalIsOpen}
                            title={"No encontramos reproductores activos"}
                            text={"Para reproducir esta canción es necesario que tengas algún reproductor de Spotify abierto. Para que el dispositivo pueda ser detectado hay que empezar a reproducir una canción. Cuando lo hagas podés volver a intentar :)"}
                            buttonText={"Try again"}
                        />
                    }
                    <ImageContainer onClick={openModal}>
                        <a onClick={playTrack} target="_blank">
                            {albumToShow && <TrackImage onClick={openModal} src={albumToShow.image} alt={name} />}
                            <TextContainer>
                                <Text>Play On Spotify</Text>
                            </TextContainer>
                        </a>
                        {!!position && <TrackPosition>{position}</TrackPosition>}
                    </ImageContainer>
                    <Link
                        href={{
                        pathname: `/album/${albumToShow.name}`,
                        query: {
                            token: props.token,
                            id: albumToShow.id,
                            refreshToken: refreshToken,
                        },
                        }}
                    >
                        {albumToShow && <TrackName>{albumToShow.name}</TrackName>}
                    </Link>

                    {albumToShow && <ArtistName>{albumToShow.artist}</ArtistName>}
                </Col>
             :
                <Col desktop={props.gridSize} tablet={6} mobile={6}>
                    {!activeDevices && 
                        <Modal 
                            modalIsOpen={modalIsOpen} 
                            setModalIsOpen={setModalIsOpen}
                            title={"No encontramos reproductores activos"}
                            text={"Para reproducir esta canción es necesario que tengas algún reproductor de Spotify abierto. Para que el dispositivo pueda ser detectado hay que empezar a reproducir una canción. Cuando lo hagas podés volver a intentar :)"}
                            buttonText={"Try again"}
                        />
                    }
                    <ImageContainer onClick={playTrack} onClick={openModal}>
                        <a onClick={playTrack} target="_blank">
                            {props.albumRecommendations.images && <TrackImage onClick={playTrack} src={props.albumRecommendations.images[1].url} alt={name} />}
                            <TextContainer onClick={openModal}>
                                <Text onClick={openModal}>Play On Spotify</Text>
                            </TextContainer>
                        </a>
                    </ImageContainer>
                    <Link
                        href={{
                        pathname: `/album/${props.albumRecommendations.name}`,
                        query: {
                            token: token,
                            id: props.albumRecommendations.id,
                            refreshToken: props.refreshToken,
                        },
                        }}
                    >
                        {props.albumRecommendations && <TrackName margin="20px 0 5px 0">{props.albumRecommendations.name}</TrackName>}
                    </Link>
                    {props.albumRecommendations && <ArtistName>{props.albumRecommendations.artists[0].name}</ArtistName>}
                </Col>
            }
        </>
      
    );
}

export default AlbumCard