import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import { TrackImage, TrackName, TrackGenres, Container, ContainerImage, ContainerInfo, ArtistName, RecommendationsContainer, Button, RecommendationsButtonsContainer, Icon, Position, TrackInfo, TrackInfoCont, ContainerAlbum, ContainerAlbumImage, ContainerAlbumInfo, Text, TextContainer, NoDataContainer, NoDataInfo, NoDataTitle, LoadingImage, LoadingText, LoadingContainer, LoadingContainerSection, MasterContainer, SuperContainer, NavContainer} from './styled'
import BarChart from "../../components/BarChart";
import NavMenu from '../../components/NavMenu'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Footer from '../../components/Footer'
import Link from 'next/link'
import CurrentlyPlayingCard from '../../components/CurrentlyPlayingCard'
import lyricsFinder from 'lyrics-finder'
import NavMenuMobile from '../../components/NavMenuMobile'
import BurgerMenu from '../../components/BurgerMenu'

export default function Track() {
    const router = useRouter()
    const token = router.query.token;
    const refresh_token = router.query.refreshToken;
    const id = router.query.id;

    ////////// STATES //////////

    const [open, setOpen] = useState(false)

    // State información a mostrar: track, audioFeatures y recommendations
    const [track, setTrack] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [newRec, setNewRec] = useState(false)
    const [artistsNames, setArtistsNames] = useState([]);
    const [artistsAlbumNames, setArtistsAlbumNames] = useState([]);

    // State para modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [playlistModalState, setPlaylistModalState] = useState('');
    
    // State relacionado a las estadísticas del track
    const [tracksFourWeeks, setTracksFourWeeks] = useState('');
    const [tracksSixMonths, setTracksSixMonths] = useState('');
    const [tracksSeveralYears, setTracksSeveralYears] = useState('');

    // Save track state and icon
    const [save, setSave] = useState()
    const [saveIcon, setSaveIcon] = useState('');

    // Album name and ID to pass
    const [albumName, setAlbumName] = useState('')
    const [albumID, setAlbumID] = useState('')

    // Token
    const [newToken, setNewToken] = useState(token);

    const [activeDevices, setActiveDevices] = useState('');

    // Playlist 
    const [playlistName, setPlaylistName] = useState('')

    // Player
    const [playing, setPlaying] = useState([]);
    const [playingData, setPlayingData] = useState([]);
    const [playingRightNow, setPlayingRightNow] = useState([]);
    const [blink, setBlink] = useState(false)
    const [playerTrackPage, setPlayerTrackPage] = useState([])

    // Track length
    const [trackLength, setTrackLength] = useState('');

    // Loading
    const [loadingTime, setLoadingTime] = useState(false)

    ////////// EFFECTS & FUNCTIONS //////////

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

            try {

                setLoadingTime(false)

                const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                  headers: {
                  'Authorization': 'Bearer ' + newToken
                  }
                });
                const devices = responseUserDevices.data.devices;
                if(devices.length == 0){
                    setActiveDevices(false)
                } else{
                    setActiveDevices(true)
                }

                const responseTrack = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                });

                const responseAudioFeatures = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                });
                
                const responseSavedTrack = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                });

                setAudioFeatures(responseAudioFeatures.data);
                setSave(responseSavedTrack.data.toString()); 
                setTrack(responseTrack.data);

                if(responseSavedTrack.data.toString() === "true"){
                  setSaveIcon('/heart.svg');
                } else{
                  setSaveIcon('/heart_no_fill.svg');
                }

                let trackSaved = responseTrack.data;
                
                if(trackSaved){
                    const artistsNamesToShow = trackSaved.artists.map(artist =>{
                        return artist.name
                    })
                    setArtistsNames(artistsNamesToShow);
                }
                
                /*
                const getLyrics = await axios.get(`https://api.lyrics.ovh/v1/${responseTrack.data.artists[0].name}/${responseTrack.data.name}`)
                console.log(getLyrics.data.lyrics)
                */

                if(trackSaved){
                    const getNames = trackSaved.album.artists.map(artist =>{
                        //artistsNamesAlbum.push(artist.name);
                        return artist.name
                    })
                    setArtistsAlbumNames(getNames)
                }

                const albumID = responseTrack.data.album.id;
                const albumName = responseTrack.data.album.name;
                setAlbumID(albumID);
                setAlbumName(albumName);
                
                /*
                const artist = responseTrack.data.artists[0].id;

                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artist}&seed_tracks=${id}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                });

                //console.log(responseRecommendations.data.tracks)
                setRecommendations(responseRecommendations.data.tracks)
                */

                // Four weeks
                const responseTracksFourWeeks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50`, {
                  headers: {
                  'Authorization': 'Bearer ' + newToken
                  }
                });
                const trackPositionFourWeeks = responseTracksFourWeeks.data.items.findIndex((track, index) =>{
                  if(track.id === id){
                      return index + 1;
                  } else{
                      return null
                  }
                })
                setTracksFourWeeks(trackPositionFourWeeks + 1);

                // Four weeks
                const responseTracksSixMonths = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50`, {
                  headers: {
                  'Authorization': 'Bearer ' + newToken
                  }
                });
                const trackPositionSixMonths = responseTracksSixMonths.data.items.findIndex((track, index) =>{
                  if(track.id === id){
                      return index + 1;
                  } else{
                      return null
                  }
                })
                setTracksSixMonths(trackPositionSixMonths + 1);

                // Four weeks
                const responseTracksSeveralYears = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50`, {
                  headers: {
                  'Authorization': 'Bearer ' + newToken
                  }
                });
                const trackPositionSeveralYears = responseTracksSeveralYears.data.items.findIndex((track, index) =>{
                  if(track.id === id){
                      return index + 1;
                  } else{
                      return null
                  }
                })
                setTracksSeveralYears(trackPositionSeveralYears + 1);

                
                setLoadingTime(true)

                
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
        
        fetchData()
        
    }, [newToken, id])

    // Playing
    useEffect(() => {
      const fetchRecommendations = async () =>{
        if(newToken){
          try{
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
          } catch (error){
            console.error("este es mi error", error);
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
      fetchRecommendations();
    }, [newRec, newToken, id, playerTrackPage, blink])

    // Recommendations
    useEffect(() => {
      const fetchRecommendations = async () =>{
        if(newToken){
          try{
            setRecommendations('')
            const responseTrack = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: {
                  'Authorization': 'Bearer ' + newToken
                }
            });
            const artist = responseTrack.data.artists[0].id;
            const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artist}&seed_tracks=${id}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
            });
            setRecommendations(responseRecommendations.data.tracks)

          } catch (error){
            console.error("este es mi error", error);
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
      fetchRecommendations();
    }, [newRec, newToken, id])

    // Save track
    const handleSave = async () => {
        const base_url = `https://api.spotify.com/v1/me/tracks?ids=${id}`
          axios({
            method: save === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + newToken }
          })
        setSave(save === "true" ? 'false' : 'true')
        setSaveIcon(save === "true" ? '/heart_no_fill.svg' : '/heart.svg');
    }

    // Modal
    const openModal = () =>{
      setModalIsOpen(!modalIsOpen)
    }

    // Create playlist
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
              const user_id = responseUserProfile.data.id;
              const base_url = `https://api.spotify.com/v1/users/${user_id}/playlists`
              setPlaylistName(`Recommendations based on ${track.name} - My Spotify Data Center`)
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
                console.log(response);
                setPlayingRightNow(id);
                setPlayerTrackPage(id);
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

    useEffect(() => {
      const formatLength = () =>{
        if(track){
          let minutes = Math.floor((track.duration_ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
          let seconds = Math.floor(((track.duration_ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
          let minutesToShow = minutes < 10 ? '0' + minutes : minutes
          let secondsToShow = seconds < 10 ? '0' + seconds : seconds
          setTrackLength(minutesToShow + ":" + secondsToShow)
        }
      }
      formatLength()
    }, [track])

    // Check Currently Playing
    const checkCurrentlyPlaying = async () => {
      if(token){
        try {
          const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          setPlaying(responsePlaying.data.item);
          setPlayingData(responsePlaying.data)
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
       },3000)
       return()=>clearInterval(interval)
    },[token])

    return (
        <div>
           
           <ParticlesBackground />
           <SuperContainer>

            <NavContainer>
              <NavMenu access_token={token} refresh_token={refresh_token}/>
            </NavContainer>

            <MasterContainer>

            {loadingTime ? 
              playing && <CurrentlyPlayingCard data={playing} token={token} playingData={playingData} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} setPlaying={setPlaying} blink={blink} setBlink={setBlink} refreshToken={refresh_token} /> 
            : null}

            <BurgerMenu open={open} setOpen={setOpen}/>
            <NavMenuMobile open={open} setOpen={setOpen} access_token={token} refresh_token={refresh_token} />

            <Inner>
              
                {playlistModalState && 
                <Modal 
                  modalIsOpen={modalIsOpen} 
                  setModalIsOpen={setModalIsOpen} 
                  title={"Your playlist was created!"}
                  text={"Check your Spotify account to find" + " " + playlistName + " " + "your new playlist based on your favorites tracks."}
                  buttonText={"Close"}
                />}

                {loadingTime ? 
                  <div>
                    
                    <Container>
                        <ContainerImage onClick={playTrack}>
                            {!activeDevices && 
                              <Modal 
                                  modalIsOpen={modalIsOpen} 
                                  setModalIsOpen={setModalIsOpen}
                                  title={"No encontramos reproductores activos"}
                                  text={"Para reproducir esta canción es necesario que tengas algún reproductor de Spotify abierto. Para que el dispositivo pueda ser detectado hay que empezar a reproducir una canción. Cuando lo hagas podés volver a intentar :)"}
                                  buttonText={"Try again"}
                              />
                            }
                            {track.album && <TrackImage onClick={playTrack} onClick={openModal} src={track.album.images[0].url} />}
                            <TextContainer onClick={playTrack} onClick={openModal}>
                                <Text onClick={playTrack} onClick={openModal}>Play On Spotify</Text>
                            </TextContainer>
                        </ContainerImage>
                        <ContainerInfo>
                            <TrackName>{track.name}</TrackName> 
                            {!!artistsNames.length > 0 && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
                            <RecommendationsButtonsContainer>
                              {save && <Button onClick={handleSave} margin><Icon src={saveIcon} alt="save_button" />{save === 'true' ? 'unsave' : 'save'}</Button> }
                            </RecommendationsButtonsContainer> 
                        </ContainerInfo>
                    </Container>
                  </div>
                : 
                <LoadingContainer>
                  <LoadingImage src="/loading.gif" alt="loading" />
                  <LoadingText>Just loading...</LoadingText>
                </LoadingContainer>
                }

                {loadingTime ?
                <Grid colGap={30} rowGap={40}>
                    <Col desktop={4} tablet={6} mobile={12}>
                        <Title size="h4" margin="0 0 0 0">Album</Title>
                        <ContainerAlbum>
                          <ContainerAlbumImage>
                            {track.album && <TrackImage album src={track.album.images[0].url} />}
                          </ContainerAlbumImage>
                          <Link
                              href={
                                {
                                pathname: `/album/${albumName}`, 
                                query: { 
                                  token: newToken, 
                                  id: albumID, 
                                  refreshToken: refresh_token 
                                },
                              }
                            }
                          >
                            <ContainerAlbumInfo>
                              {track.popularity && <TrackInfo><strong>{track.album.name}</strong></TrackInfo>}
                              {track.popularity && <ArtistName size="small"><strong>{artistsAlbumNames.join(", ")}</strong></ArtistName>}
                            </ContainerAlbumInfo>
                          </Link>
                        </ContainerAlbum>
                    </Col>
                    <Col desktop={4} tablet={6} mobile={12}>
                        <Title size="h4" margin="0 0 0 0">Popularity</Title>
                        {track.popularity && <Position><strong>{track.popularity} / 100</strong></Position>}
                    </Col>
                    <Col desktop={4} tablet={6} mobile={12}>
                        <Title size="h4" margin="0 0 0 0">Lenght</Title>
                        <Position><strong>{trackLength}</strong></Position>
                    </Col>
                </Grid>
                : null}


                {loadingTime && (tracksFourWeeks || tracksSixMonths || tracksSeveralYears) ? 
                  <section>
                  <Title size="h4" margin="60px 0 0 0">{track.name} appeareances in your artist ranking</Title>
                  <Grid colGap={30} rowGap={40}>
                      {tracksFourWeeks ?
                        <Col desktop={4} tablet={6} mobile={12}>
                            <Position>#<strong>{tracksFourWeeks}</strong></Position> 
                            <TrackInfo>In your most listened artists list for the <strong>past 4 weeks</strong>.</TrackInfo>  
                        </Col>
                        : 
                        <Col desktop={4} tablet={6} mobile={12}>
                          <NoDataContainer>
                            <NoDataTitle><strong>:(</strong></NoDataTitle> 
                            <NoDataInfo>Not in your past 4 weeks ranking</NoDataInfo>  
                          </NoDataContainer>
                        </Col>
                      }
                      {tracksSixMonths ?
                        <Col desktop={4} tablet={6} mobile={12}>
                            <Position>#<strong>{tracksSixMonths}</strong></Position>   
                            <TrackInfo>In your most listened artists list for the <strong>past 6 months</strong>.</TrackInfo>
                        </Col>
                        : 
                        <Col desktop={4} tablet={6} mobile={12}>
                          <NoDataContainer>
                            <NoDataTitle><strong>:(</strong></NoDataTitle> 
                            <NoDataInfo>Not in your past 6 months ranking</NoDataInfo>  
                          </NoDataContainer>
                        </Col>
                      }
                      {tracksSeveralYears ?
                        <Col desktop={4} tablet={6} mobile={12}>
                            <Position>#<strong>{tracksSeveralYears}</strong></Position>   
                            <TrackInfo>In your most listened artists list for the <strong>past several years</strong>.</TrackInfo>
                        </Col>
                        : 
                        <Col desktop={4} tablet={6} mobile={12}>
                          <NoDataContainer>
                            <NoDataTitle><strong>:(</strong></NoDataTitle> 
                            <NoDataInfo>Not in your lifetime ranking</NoDataInfo>  
                          </NoDataContainer>
                        </Col>
                      }
                  </Grid>
                  </section>
                : null}

                {loadingTime ?
                  <section>
                    <Title size="h3" margin="90px 0 60px 0">Audio features</Title>
                    <Grid colGap={30} rowGap={40}>
                        <Col desktop={12} tablet={6} mobile={12}>
                            {audioFeatures != '' && <BarChart audioFeatures={audioFeatures} />}
                        </Col>
                    </Grid>
                  </section>
                : null}

                {loadingTime ? 
                  <section>
                    <Grid colGap={30} rowGap={40}>
                        <Col desktop={12} tablet={6} mobile={12}>
                          <RecommendationsContainer>
                            <Title size="h3" margin="90px 0 60px 0">Tracks recommendations</Title>
                            <RecommendationsButtonsContainer>
                              <Button onClick={() => setNewRec(!newRec)}><Icon src="/refresh.svg" alt="refresh_icon" />Refresh recommendations</Button>
                              <Button onClick={createPlaylistWithRecommendations}>Create playlist</Button>
                            </RecommendationsButtonsContainer>
                          </RecommendationsContainer>
                        </Col>
                    </Grid>
                  </section>
                : null}

                {loadingTime ? 
                  <section>
                    <Grid colGap={30} rowGap={40} columns>
                      {recommendations ?
                        recommendations.map((track) => (<TrackCard key={track._id} data={track} token={newToken} refreshToken={refresh_token} gridSize={2} singleTrack="100" margin="20px 0 5px 0" playerTrackPage={playerTrackPage} setPlayerTrackPage={setPlayerTrackPage} blink={blink} setBlink={setBlink} activeDevices={activeDevices}/>))
                      :
                      <Col desktop={12} tablet={6} mobile={12}>
                        <LoadingContainerSection>
                          <LoadingImage src="/loading.gif" alt="loading" />
                          <LoadingText>Just loading...</LoadingText>
                        </LoadingContainerSection>
                      </Col>
                      }
                    </Grid>
                  </section>
                : null}

            </Inner>
            
            <Footer />

            </MasterContainer>
            
            </SuperContainer>
            
        </div>
    )
}