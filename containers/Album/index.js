import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import {ContainerAlbum, Subtitle, AlbumInfo, ContainerInfo, ContainerImage, ContainerAlbumName, Button, TrackImage, RecommendationsButtonsContainer, TrackName, Container, ArtistName, Icon, TextContainer, Text} from './styled'
import BarChart from "../../components/BarChart";
import NavMenu from '../../components/NavMenu'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Footer from '../../components/Footer'
import TracklistCard from '../../components/TracklistCard'
import Link from 'next/link'
import CurrentlyPlayingCard from '../../components/CurrentlyPlayingCard'

export default function Album() {
    const router = useRouter()
    const token = router.query.token;
    const refresh_token = router.query.refreshToken;
    const id = router.query.id;

    // Album
    const [album, setAlbum] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [cover, setCover] = useState('');
    const [artistName, setArtistName] = useState([]);

    // Save & unsave album
    const [saveIcon, setSaveIcon] = useState('');
    const [save, setSave] = useState()

    // Play track from album
    const [activeDevices, setActiveDevices] = useState('');

    // Get new token
    const [newToken, setNewToken] = useState(token);

    // Player
    const [playing, setPlaying] = useState([]);
    const [playingData, setPlayingData] = useState([]);
    const [playingRightNow, setPlayingRightNow] = useState([]);

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': refresh_token
            }
          });
        console.log(responseRefreshToken.data.access_token);
        setNewToken(responseRefreshToken.data.access_token)
      }

    useEffect(() => {

        const fetchData = async () => {
            
            if(token){
            try {

                const responsePlaying = await axios.get(
                  `https://api.spotify.com/v1/me/player/currently-playing`,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                );
                console.log("ACTUALIZA3");
                console.log(responsePlaying.data.item);
                setPlaying(responsePlaying.data.item);
                setPlayingData(responsePlaying.data);
                
                const responseAlbum = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                }); 
                setAlbum(responseAlbum.data);
                console.log(responseAlbum);
                setTracks(responseAlbum.data.tracks.items);

                const albumCover = responseAlbum.data.images[0].url;
                setCover(albumCover);

                const artistsNames = responseAlbum.data.artists.map(artist =>{
                  return artist.name
                });
                setArtistName(artistsNames);

                const responseSavedAlbum = await axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                });

                setSave(responseSavedAlbum.data.toString()); 

                if(responseSavedAlbum.data.toString() === "true"){
                  setSaveIcon('/heart.svg');
                } else{
                  setSaveIcon('/heart_no_fill.svg');
                }

            } catch (error) {
                /*
                console.error('este es mi error',error);
                if (error.response.status === 401) {
                    getNewToken();
                  }
                  */
            }
        }
            
        }
        
        fetchData()
        
    }, [id])

    const handleSave = async () => {
        const base_url = `https://api.spotify.com/v1/me/albums?ids=${id}`
          axios({
            method: save === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + newToken }
          })
        setSave(save === "true" ? 'false' : 'true')
        setSaveIcon(save === "true" ? '/heart_no_fill.svg' : '/heart.svg');
    }

    const createPlaylistWithRecommendations = async () => {
        if(newToken){

          try {
              const responseUserProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                  headers: {
                  'Authorization': 'Bearer ' + newToken
                  }
              });
              setModalIsOpen(!modalIsOpen);
              setPlaylistModalState(true);
              console.log(responseUserProfile)
              const user_id = responseUserProfile.data.id;
              const base_url = `https://api.spotify.com/v1/users/${user_id}/playlists`
              axios({
                method: 'post',
                url: base_url,
                data: {
                  name: `Recommendations based on ${track.name} - My Spotify Data Center`,
                  description: 'New playlist description',
                  public: false
                },
                headers: { 'Authorization': 'Bearer ' + newToken }
              })
              .then(function (response) {
                const tracksURI = [];
                const playlist_id = response.data.id;
                recommendations.map(track => {
                  tracksURI.push(track.uri)
                })
                const base_url_playlist = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
                axios({
                  method: 'post',
                  url: base_url_playlist,
                  data: tracksURI,
                  headers: { 'Authorization': 'Bearer ' + newToken }
                })
                .then(function (response) {
                  //console.log(response);
                });
              });
          } catch (error) {
              console.error('este es mi error',error);
              if (error.response.status === 401) {
                getNewToken();
              }
          }
        }        
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
      if(tracks){
        try {
        const devices = responseUserDevices.data.devices;
        if(devices.length == 0){
            setActiveDevices(false);
        } else{
            setActiveDevices(true)
            const deviceID = responseUserDevices.data.devices[0].id
            if(deviceID){
            console.log("Holis");
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
  }

    return (
      <div>
        <NavMenu />
        <Inner>
        {playing && <CurrentlyPlayingCard data={playing} token={token} playingData={playingData} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} setPlaying={setPlaying} /> }
        {tracks ? 
          <Container>
            <ContainerImage>
              {!!album.images && <TrackImage onClick={playTrack} src={cover} />}
              <TextContainer>
                  <Text>Play On Spotify</Text>
              </TextContainer>
            </ContainerImage>
            <ContainerAlbumName>
              <TrackName>{album.name}</TrackName>
              <ArtistName>{artistName}</ArtistName>
              <RecommendationsButtonsContainer>
                {save && (
                  <Button onClick={handleSave}>
                    <Icon src={saveIcon} alt="save_button" />
                    {save === "true" ? "unsave" : "save"}
                  </Button>
                )}
              </RecommendationsButtonsContainer>
            </ContainerAlbumName>
          </Container>
          : <p>Loading...</p>}

          {tracks ? 
          <Grid colGap={30} rowGap={40}>
            <Col desktop={2} tablet={6} mobile={12}>
              <ContainerAlbum>
                <ContainerInfo>
                  <Subtitle>Type</Subtitle>
                  <AlbumInfo>{album.album_type}</AlbumInfo>
                </ContainerInfo>
                <ContainerInfo>
                  <Subtitle>Release Date</Subtitle>
                  <AlbumInfo>{album.release_date}</AlbumInfo>
                </ContainerInfo>
                <ContainerInfo>
                  <Subtitle>Label</Subtitle>
                  <AlbumInfo>{album.label}</AlbumInfo>
                </ContainerInfo>
                <ContainerInfo>
                  <Subtitle>Popularity</Subtitle>
                  <AlbumInfo>{album.popularity}/100</AlbumInfo>
                </ContainerInfo>
              </ContainerAlbum>
            </Col>
            <Col desktop={10} tablet={6} mobile={12}>
              {tracks &&
                tracks.map((track) => (
                  <TracklistCard data={track} token={newToken} refresh_token={refresh_token}/>
                ))}
            </Col>
          </Grid>
          : <p>Loading...</p>}
          
          <Footer />
        </Inner>
      </div>
    );
}