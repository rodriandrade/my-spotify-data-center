import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import { TrackImage, TrackName, TrackGenres, Container, ContainerImage, ContainerInfo, ArtistName, RecommendationsContainer, Button, RecommendationsButtonsContainer, Icon, Position, TrackInfo, TrackInfoCont, ContainerAlbum, ContainerAlbumImage, ContainerAlbumInfo} from './styled'
import BarChart from "../../components/BarChart";
import NavMenu from '../../components/NavMenu'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function Track() {
    const router = useRouter()
    const token = router.query.token;
    const refresh_token = router.query.refreshToken;
    const id = router.query.id;

    const [track, setTrack] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [newRec, setNewRec] = useState(false)
    const [artistsNames, setArtistsNames] = useState([]);
    const [artistsAlbumNames, setArtistsAlbumNames] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [playlistModalState, setPlaylistModalState] = useState('');
    const [saveIcon, setSaveIcon] = useState('');
    const [tracksFourWeeks, setTracksFourWeeks] = useState([]);
    const [tracksSixMonths, setTracksSixMonths] = useState([]);
    const [tracksSeveralYears, setTracksSeveralYears] = useState([]);
    const [save, setSave] = useState()
    const [albumName, setAlbumName] = useState('')
    const [albumID, setAlbumID] = useState('')

    const [newToken, setNewToken] = useState(token);

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

    const openModal = () =>{
        
    }

    useEffect(() => {

        const fetchData = async () => {
            
            try {
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

                if(track.artists){
                    const artistsNamesToShow = track.artists.map(artist =>{
                        return artist.name
                    })
                    setArtistsNames(artistsNamesToShow);
                }

                if(track.album){
                    const getNames = track.album.artists.map(artist =>{
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
          }
        }        
    }

    
    // {artistsNames && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
    // <ArtistName>{(track.duration_ms / 60000).toPrecision(4)}</ArtistName>
    console.log(audioFeatures)
    console.log(audioFeatures != '');

    return (
        <div>
           
           <NavMenu />
            <Inner>
                {!playlistModalState && 
                <Modal 
                    modalIsOpen={modalIsOpen} 
                    setModalIsOpen={setModalIsOpen} 
                    title={"Success"}
                    text={"Your playlist was created"}
                    buttonText={""}
                />}
                <Container>
                    <ContainerImage>
                        {track.album && <TrackImage src={track.album.images[0].url} />}
                    </ContainerImage>
                    <ContainerInfo>
                        <TrackName>{track.name}</TrackName> 
                        {!!artistsNames.length > 0 && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
                        <RecommendationsButtonsContainer>
                          {save && <Button onClick={handleSave}><Icon src={saveIcon} alt="save_button" />{save === 'true' ? 'unsave' : 'save'}</Button> }
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
                        <Position><strong>{(track.duration_ms / 60000).toPrecision(4)}</strong></Position>
                    </Col>
                </Grid>

                <Title size="h4" margin="60px 0 0 0">{track.name} appeareances in your artist ranking</Title>
                <Grid colGap={30} rowGap={40}>
                    <Col desktop={4} tablet={6} mobile={12}>
                        <Position>#<strong>{tracksFourWeeks}</strong></Position> 
                        <TrackInfo>In your most listened artists list for the <strong>past 4 weeks</strong>.</TrackInfo>  
                    </Col>
                    <Col desktop={4} tablet={6} mobile={12}>
                        <Position>#<strong>{tracksSixMonths}</strong></Position>   
                        <TrackInfo>In your most listened artists list for the <strong>past 6 months</strong>.</TrackInfo>
                    </Col>
                    <Col desktop={4} tablet={6} mobile={12}>
                        <Position>#<strong>{tracksSeveralYears}</strong></Position>   
                        <TrackInfo>In your most listened artists list for the <strong>past several years</strong>.</TrackInfo>
                    </Col>
                </Grid>
 
                <Title size="h3" margin="90px 0 60px 0">Audio features</Title>
                <Grid colGap={30} rowGap={40}>
                    <Col desktop={12} tablet={6} mobile={12}>
                        {audioFeatures != '' && <BarChart audioFeatures={audioFeatures} />}
                    </Col>
                </Grid>

                <Grid colGap={30} rowGap={40}>
                    <Col desktop={12} tablet={6} mobile={12}>
                      <RecommendationsContainer>
                        <Title size="h3" margin="90px 0 60px 0">Recommendations</Title>
                        <RecommendationsButtonsContainer>
                          <Button onClick={() => setNewRec(!newRec)}><Icon src="/refresh.svg" alt="refresh_icon" />Refresh recommendations</Button>
                          <Button onClick={createPlaylistWithRecommendations}>Create playlist</Button>
                        </RecommendationsButtonsContainer>
                      </RecommendationsContainer>
                    </Col>
                </Grid>

                <Grid colGap={30} rowGap={40} columns>
                    {recommendations.map((track) => (<TrackCard key={track._id} data={track} token={newToken} gridSize={2}/>))}
                </Grid>
                <Footer />
            </Inner>
            
        </div>
    )
}