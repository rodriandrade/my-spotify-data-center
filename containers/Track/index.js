import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import { TrackImage, TrackName, TrackGenres, Container, ContainerImage, ContainerInfo, ArtistName, RecommendationsContainer, Button, RecommendationsButtonsContainer, Icon, Position, TrackInfo, TrackInfoCont, ContainerAlbum, ContainerAlbumImage, ContainerAlbumInfo, Text, TextContainer, NoDataContainer, NoDataInfo, NoDataTitle} from './styled'
import BarChart from "../../components/BarChart";
import NavMenu from '../../components/NavMenu'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Footer from '../../components/Footer'
import Link from 'next/link'
import CurrentlyPlayingCard from '../../components/CurrentlyPlayingCard'

export default function Track() {
    const router = useRouter()
    const token = router.query.token;
    const refresh_token = router.query.refreshToken;
    const id = router.query.id;

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

    console.log(id);

    useEffect(() => {

        const fetchData = async () => {

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

                console.log(responseTrack.data);
                console.log(responseAudioFeatures.data);
                setAudioFeatures(responseAudioFeatures.data);
                setSave(responseSavedTrack.data.toString()); 
                setTrack(responseTrack.data);

                if(responseSavedTrack.data.toString() === "true"){
                  setSaveIcon('/heart.svg');
                } else{
                  setSaveIcon('/heart_no_fill.svg');
                }

                let trackSaved = responseTrack.data;
                console.log(trackSaved.artists);
                
                if(trackSaved){
                    const artistsNamesToShow = trackSaved.artists.map(artist =>{
                        return artist.name
                    })
                    setArtistsNames(artistsNamesToShow);
                }

                if(trackSaved){
                    const getNames = trackSaved.album.artists.map(artist =>{
                        //artistsNamesAlbum.push(artist.name);
                        return artist.name
                    })
                    setArtistsAlbumNames(getNames)
                }

                const albumID = responseTrack.data.album.id;
                console.log(albumID)
                const albumName = responseTrack.data.album.name;
                console.log(albumName)
                setAlbumID(albumID);
                setAlbumName(albumName);
                
                const artist = responseTrack.data.artists[0].id;

                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artist}&seed_tracks=${id}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                    }
                });

                //console.log(responseRecommendations.data.tracks)
                setRecommendations(responseRecommendations.data.tracks)

                // Four weeks
                const responseTracksFourWeeks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50`, {
                  headers: {
                  'Authorization': 'Bearer ' + newToken
                  }
                });
                console.log(responseTracksFourWeeks);
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
        
    }, [newToken, newRec, id])

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
    
    // {artistsNames && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
    // <ArtistName>{(track.duration_ms / 60000).toPrecision(4)}</ArtistName>
    console.log(audioFeatures)
    console.log(audioFeatures != '');

    return (
        <div>
           
           <NavMenu access_token={token} refresh_token={refresh_token}/>
            <Inner>
              {playing && <CurrentlyPlayingCard data={playing} token={token} playingData={playingData} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} setPlaying={setPlaying} /> }
                {!playlistModalState && 
                <Modal 
                    modalIsOpen={modalIsOpen} 
                    setModalIsOpen={setModalIsOpen} 
                    title={"Success"}
                    text={"Your playlist was created"}
                    buttonText={""}
                />}
                <Container>
                    <ContainerImage onClick={playTrack}>
                        {track.album && <TrackImage onClick={playTrack} src={track.album.images[0].url} />}
                        <TextContainer onClick={playTrack}>
                            <Text onClick={playTrack}>Play On Spotify</Text>
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
                              {track.popularity && <TrackInfo><strong>{artistsAlbumNames.join(", ")}</strong></TrackInfo>}
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
                        <Position><strong>{ (track.duration_ms / 60000).toPrecision(3) }</strong></Position>
                    </Col>
                </Grid>

                {tracksFourWeeks || tracksSixMonths || tracksSeveralYears ? 
                <Title size="h4" margin="60px 0 0 0">{track.name} appeareances in your artist ranking</Title>
                : null}
                {tracksFourWeeks || tracksSixMonths || tracksSeveralYears ? 
                <Grid colGap={30} rowGap={40}>
                    {tracksFourWeeks ?
                      <Col desktop={4} tablet={6} mobile={12}>
                          <Position>#<strong>{tracksFourWeeks}</strong></Position> 
                          <TrackInfo>In your most listened artists list for the <strong>past 4 weeks</strong>.</TrackInfo>  
                      </Col>
                      : 
                      <Col desktop={4} tablet={6} mobile={12}>
                        <NoDataContainer>
                          <NoDataTitle><strong>Zzz...</strong></NoDataTitle> 
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
                          <NoDataTitle><strong>Zzz...</strong></NoDataTitle> 
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
                          <NoDataTitle><strong>Zzz...</strong></NoDataTitle> 
                          <NoDataInfo>Not in your lifetime ranking</NoDataInfo>  
                        </NoDataContainer>
                      </Col>
                    }
                </Grid>
                : null}
 
                <Title size="h3" margin="90px 0 60px 0">Audio features</Title>
                <Grid colGap={30} rowGap={40}>
                    <Col desktop={12} tablet={6} mobile={12}>
                        {audioFeatures != '' && <BarChart audioFeatures={audioFeatures} />}
                    </Col>
                </Grid>

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

                <Grid colGap={30} rowGap={40} columns>
                    {recommendations.map((track) => (<TrackCard key={track._id} data={track} token={newToken} gridSize={2} singleTrack="100" margin="20px 0 5px 0"/>))}
                </Grid>
                <Footer />
            </Inner>
            
        </div>
    )
}