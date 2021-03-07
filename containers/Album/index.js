import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import {ContainerAlbum, Subtitle, AlbumInfo, ContainerInfo, ContainerImage, ContainerAlbumName, Button, TrackImage, RecommendationsButtonsContainer, TrackName, Container, ArtistName, Icon, TextContainer, Text, RecommendationsContainer, LoadingImage, LoadingText, LoadingContainer, LoadingContainerSection} from './styled'
import BarChart from "../../components/BarChart";
import NavMenu from '../../components/NavMenu'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Footer from '../../components/Footer'
import TracklistCard from '../../components/TracklistCard'
import Link from 'next/link'
import CurrentlyPlayingCard from '../../components/CurrentlyPlayingCard'
import AlbumCard from '../../components/AlbumCard'

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
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Get new token
    const [newToken, setNewToken] = useState(token);

    // Recommendations 
    const [recommendations, setRecommendations] = useState([]);
    const [newRec, setNewRec] = useState(false);

    // Player
    const [playing, setPlaying] = useState([]);
    const [playingData, setPlayingData] = useState([]);
    const [playingRightNow, setPlayingRightNow] = useState([]);
    const [playingStatus, setPlayingStatus] = useState([]);
    const [playerAlbumPage, setPlayerAlbumPage] = useState([])
    const [blink, setBlink] = useState(false)

    // Loading
    const [loadingTime, setLoadingTime] = useState(false)

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': refresh_token
            }
          });
        setNewToken(responseRefreshToken.data.access_token)
    }

    useEffect(() => {
      const checkCurrentlyPlaying = async () =>{
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
              setPlaying(responsePlaying.data.item);
              setPlayingData(responsePlaying.data);
          } catch (error){
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
      checkCurrentlyPlaying()
    }, [playingStatus]);

    useEffect(() => {

        const fetchData = async () => {
            
            if(newToken){
              console.log("I'm in")
            try {

                setRecommendations('')
                console.log(token)
                console.log(newToken)
                const responseAlbum = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                }); 
                setAlbum(responseAlbum.data);
                setTracks(responseAlbum.data.tracks.items);
                const trackID = responseAlbum.data.tracks.items[0].id;

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

                const artistsIDS = responseAlbum.data.artists.map(artist =>{
                  return artist.id
                });

                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artistsIDS}&seed_tracks=${trackID}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                });
                //console.log(responseRecommendations.data.tracks)

                const getAlbumsFromRecommendations = responseRecommendations.data.tracks.map(track =>{
                  return track.album;
                })

                const checkRepetitions = getAlbumsFromRecommendations.reduce((p,c) => (c.name !== album.name && p.push(c),p),[])
                
                setRecommendations(checkRepetitions);

                const responsePlaying = await axios.get(
                  `https://api.spotify.com/v1/me/player/currently-playing`,
                  {
                    headers: {
                      Authorization: "Bearer " + newToken,
                    },
                  }
                );
                setPlaying(responsePlaying.data.item);
                setPlayingData(responsePlaying.data);

                setLoadingTime(true);

            } catch (error) {
                console.error('este es mi error',error);
                if (error.response.status === 401) {
                    console.log("I'm here")
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
        
        fetchData()
        
    }, [id, newRec, playerAlbumPage, blink, newToken])

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
              if (error.response.status === 500) {
                console.log(error);
              }
              if (error.response.status === 504) {
                console.log(error);
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
        try {
          const devices = responseUserDevices.data.devices;
          if(devices.length == 0){
              setActiveDevices(false);
          } else{
              setActiveDevices(true)
              const deviceID = responseUserDevices.data.devices[0].id
              if(deviceID){
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
                    setPlayingRightNow(id);
                    setPlayingStatus(id)
                    setBlink(true)
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
      <div>
        <NavMenu access_token={token} refresh_token={refresh_token} />
        <Inner>
          {playing && (
            <CurrentlyPlayingCard
              data={playing}
              token={token}
              playingData={playingData}
              playingRightNow={playingRightNow}
              setPlayingRightNow={setPlayingRightNow}
              setPlaying={setPlaying}
              blink={blink}
              setBlink={setBlink}
            />
          )}
          {loadingTime ? (
            <Container>
              {!activeDevices && (
                <Modal
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                  title={"No encontramos reproductores activos"}
                  text={
                    "Para reproducir esta canción es necesario que tengas algún reproductor de Spotify abierto. Para que el dispositivo pueda ser detectado hay que empezar a reproducir una canción. Cuando lo hagas podés volver a intentar :)"
                  }
                  buttonText={"Try again"}
                />
              )}
              <ContainerImage onClick={playTrack}>
                {!!album.images && (
                  <TrackImage onClick={playTrack} src={cover} onClick={openModal}/>
                )}
                <TextContainer onClick={playTrack} onClick={openModal}>
                  <Text onClick={playTrack} onClick={openModal}>Play On Spotify</Text>
                </TextContainer>
              </ContainerImage>
              <ContainerAlbumName>
                <TrackName>{album.name}</TrackName>
                <ArtistName>{artistName.join(", ")}</ArtistName>
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
          ) : (
            <LoadingContainer>
              <LoadingImage src="/loading.gif" alt="loading" />
              <LoadingText>Just loading...</LoadingText>
            </LoadingContainer>
          )}

          {loadingTime ? (
            <section>
              <Grid colGap={30} rowGap={40}>
                <Col desktop={2} tablet={6} mobile={12}>
                  <ContainerAlbum>
                    <ContainerInfo>
                      <Subtitle>Type</Subtitle>
                      {album.album_type && (
                        <AlbumInfo>
                          {album.album_type.charAt(0).toUpperCase() +
                            album.album_type.slice(1)}
                        </AlbumInfo>
                      )}
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
                      <TracklistCard
                        data={track}
                        token={newToken}
                        refreshToken={refresh_token}
                        playerAlbumPage={playerAlbumPage}
                        setPlayerAlbumPage={setPlayerAlbumPage}
                        blink={blink}
                        setBlink={setBlink}
                      />
                    ))}
                </Col>
              </Grid>
            </section>
          ) : null}

          {loadingTime ? (
            <section>
              <Grid colGap={30} rowGap={40}>
                <Col desktop={12} tablet={6} mobile={12}>
                  <RecommendationsContainer>
                    <Title size="h3" margin="90px 0 60px 0">
                      Albums recommendations
                    </Title>
                    <RecommendationsButtonsContainer>
                      <Button onClick={() => setNewRec(!newRec)}>
                        <Icon src="/refresh.svg" alt="refresh_icon" />
                        Refresh recommendations
                      </Button>
                    </RecommendationsButtonsContainer>
                  </RecommendationsContainer>
                </Col>
              </Grid>
            </section>
          ) : null}

          {loadingTime ? (
            <section>
              <Grid colGap={30} rowGap={40} columns>
                {recommendations ? (
                  recommendations.map((album) => (
                    <AlbumCard
                      key={album.id}
                      albumRecommendations={album}
                      token={newToken}
                      refreshToken={refresh_token}
                      gridSize={2}
                      singleTrack="100"
                      playerAlbumPage={playerAlbumPage}
                      setPlayerAlbumPage={setPlayerAlbumPage}
                      blink={blink}
                      setBlink={setBlink}
                    />
                  ))
                ) : (
                  <LoadingContainer>
                    <LoadingImage src="/loading.gif" alt="loading" />
                    <LoadingText>Just loading...</LoadingText>
                  </LoadingContainer>
                )}
              </Grid>
            </section>
          ) : null}

          <Footer />
        </Inner>
      </div>
    );
}