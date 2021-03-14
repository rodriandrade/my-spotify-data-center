import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ArtistCard from '../../components/artistCard'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import {Container, ContainerInfo, ContainerImage, ArtistImage, ArtistName, ArtistGenres, Position, ArtistInfo, ArtistInfoCont, Button, GenresContainer, NoDataContainer, NoDataInfo, NoDataTitle, LoadingImage, LoadingText, LoadingContainer, LoadingContainerSection} from './styled'
import NavMenu from '../../components/NavMenu'
import Footer from '../../components/Footer'
import ParticlesBackground from '../../components/ParticlesBackground'
import CurrentlyPlayingCard from '../../components/CurrentlyPlayingCard'

export default function Artist() {
    const router = useRouter()
    const token = router.query.token;
    const refresh_token = router.query.refreshToken;
    const id = router.query.id;

    // State relacionados al artista
    const [artist, setArtist] = useState([]);
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const [follow, setFollow] = useState()

    // State relacionados a estadisticas del artista
    const [artistFourWeeks, setArtistFourWeeks] = useState('');
    const [artistSixMonths, setArtistSixMonths] = useState('');
    const [artistSeveralYears, setArtistSeveralYears] = useState('');

    // State relacionados a estadisticas de canciones del artista
    const [tracksFourWeeks, setTracksFourWeeks] = useState('');
    const [tracksSixMonths, setTracksSixMonths] = useState('');
    const [tracksSeveralYears, setTracksSeveralYears] = useState('');

    const [playing, setPlaying] = useState([]);
    const [playingData, setPlayingData] = useState([]);
    const [playingRightNow, setPlayingRightNow] = useState([]);
    const [blink, setBlink] = useState(false)
    const [playerArtistPage, setPlayerArtistPage] = useState([])

    // State relacionados a las canciones del historial de escucha del usuario
    const [tracksRecentlyPlayed, setTracksRecentlyPlayed] = useState([]);

    // Loading
    const [loadingTime, setLoadingTime] = useState(false)

    const [newToken, setNewToken] = useState(token);

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': refresh_token
            }
          });
        setNewToken(responseRefreshToken.data.access_token)
      }

      /*
      useEffect(() => {
        const fetchArtists = async () =>{
          if(newToken){
            console.log(playerArtistPage)
            try{
              const responsePlaying = await axios.get(
                `https://api.spotify.com/v1/me/player/currently-playing`,
                {
                  headers: {
                    Authorization: "Bearer " + newToken,
                  },
                }
              );
              console.log(responsePlaying.data.item);
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
        fetchArtists();
      }, [playerArtistPage, token])
      */

    useEffect(() => {
        const fetchData = async () => {
            if(newToken){
                try {

                    // Traer artista
                    const responseArtist = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    setArtist(responseArtist.data);
                    // Nombre del artista para buscarlo entre los 50 artistas más escuchados
                    const artistName = responseArtist.data.name;
                    
                    // Traer los 10 temas más populares del artista
                    const responseArtistTopTracks = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    setArtistTopTracks(responseArtistTopTracks.data.tracks);

                    // Traer artistas relacionados
                    const responseRelatedArtists = await axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    setRelatedArtists(responseRelatedArtists.data.artists);

                    // Artistas seguidos por el usuario (para chequear si el usuario sigue al artista)
                    const responseUserFollowedArtists = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    setFollow(responseUserFollowedArtists.data.toString());

                    ////////////////////// ARTISTAS ////////////////////////////////////////////////////////////

                    // Buscar si el artista aparece entre los 50 artistas de las últimas 4 semanas
                    const responseArtistFourWeeks = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    const artistPositionFourWeeks = responseArtistFourWeeks.data.items.findIndex((artist, index) =>{
                        if(artist.name === artistName){
                            return index + 1;
                        } else{
                            return null
                        }
                    })
                    setArtistFourWeeks(artistPositionFourWeeks + 1);

                    // Buscar si el artista aparece entre los 50 artistas de los últimos 6 meses
                    const responseArtistSixMonths = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    const artistPositionSixMonths = responseArtistSixMonths.data.items.findIndex((artist, index) =>{
                        if(artist.name === artistName){
                            return index + 1;
                        } else{
                            return null
                        }
                    })
                    setArtistSixMonths(artistPositionSixMonths + 1);

                    // Buscar si el artista aparece entre los 50 artistas de los artistas más escuchados "lifetime"
                    const responseArtistSeveralYears = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    const artistPositionSeveralYears = responseArtistSeveralYears.data.items.findIndex((artist, index) =>{
                        if(artist.name === artistName){
                            return index + 1;
                        } else{
                            return null
                        }
                    })
                    setArtistSeveralYears(artistPositionSeveralYears + 1);

                    ////////////////////// CANCIONES ////////////////////////////////////////////////////////////

                    // Four weeks
                    const responseTracksFourWeeks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    const allTracksFourWeeks = responseTracksFourWeeks.data.items;
                    const getArtists = allTracksFourWeeks.map(track =>{
                        return track.artists
                    })
                    let artistRepetitionFourWeeks = [];
                    const artistTrackFourWeeks = getArtists.map(artist =>{
                        artist.map(artistTrack =>{
                            if(artistTrack.name === artistName){
                                artistRepetitionFourWeeks.push(artistTrack.name);
                            }
                        })
                    })
                    setTracksFourWeeks(artistRepetitionFourWeeks);

                    // Six months
                    const responseTracksSixMonths = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    const allTracksSixMonths = responseTracksSixMonths.data.items;
                    const getArtistsSixMonths = allTracksSixMonths.map(track =>{
                        return track.artists
                    })
                    let artistRepetitionSixMonths = [];
                    const artistTrackSixMonths = getArtistsSixMonths.map(artist =>{
                        artist.map(artistTrack =>{
                            if(artistTrack.name === artistName){
                                artistRepetitionSixMonths.push(artistTrack.name);
                            }
                        })
                    })
                    setTracksSixMonths(artistRepetitionSixMonths);

                    // Several years
                    const responseTracksSeveralYears = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    const allTracksSeveralYears = responseTracksSeveralYears.data.items;
                    const getArtistsSeveralYears = allTracksSeveralYears.map(track =>{
                        return track.artists
                    })
                    let artistRepetitionSeveralYears = [];
                    const artistTrackSeveralYears = getArtistsSeveralYears.map(artist =>{
                        artist.map(artistTrack =>{
                            if(artistTrack.name === artistName){
                                artistRepetitionSeveralYears.push(artistTrack.name);
                            }
                        })
                    })
                    setTracksSeveralYears(artistRepetitionSeveralYears)

                    ////////////////////// RECENTLY PLAYED ////////////////////////////////////////////////////////////

                    const responseRecentlyPlayed = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
                        headers: {
                        'Authorization': 'Bearer ' + newToken
                        }
                    });
                    let artistRepetitionRecentlyPlayed = [];
                    const tracksRecentlyPlayed = responseRecentlyPlayed.data.items.map(track =>{
                        track.track.artists.map(artistTrack =>{
                            if(artistTrack.name === artistName){
                                artistRepetitionRecentlyPlayed.push(artistTrack.name)
                            }
                        })
                    })
                    setTracksRecentlyPlayed(artistRepetitionRecentlyPlayed);
                    
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
    }, [id, playerArtistPage, blink])

    const handleFollow = async () => {
        try{
        const base_url = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`
          axios({
            method: follow === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + newToken }
          })
        setFollow(follow === "true" ? 'false' : 'true')
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
          } catch (err) {
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
            <NavMenu access_token={token} refresh_token={refresh_token}/>
            <Inner>

                {loadingTime ? 
                <Grid colGap={30} rowGap={40}>
                    {playing && <CurrentlyPlayingCard data={playing} token={token} refreshToken={refresh_token} playingData={playingData} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} setPlaying={setPlaying} blink={blink} setBlink={setBlink} /> }
                    <Col desktop={12} tablet={6} mobile={12}>
                        <Container>
                            <ContainerImage>
                               {artist.images && <ArtistImage src={artist.images[0].url} />}
                            </ContainerImage>
                            <ContainerInfo>
                                <ArtistName>{artist.name}</ArtistName>
                                {!!follow && <Button onClick={handleFollow}>{follow === 'true' ? 'following' : 'follow'}</Button> }  
                            </ContainerInfo>
                        </Container>
                    </Col>
                </Grid>
                : 
                <LoadingContainer>
                  <LoadingImage src="/loading.gif" alt="loading" />
                  <LoadingText>Just loading...</LoadingText>
                </LoadingContainer>
                }

                {loadingTime ? 
                    <section>
                        <Grid colGap={30} rowGap={40}>
                            <Col desktop={4} tablet={6} mobile={12}>
                                <Title size="h4" margin="0 0 0 0">Genres</Title>
                                <GenresContainer>
                                    {artist.genres && artist.genres.map(genre => <ArtistGenres>{genre}</ArtistGenres>)}
                                </GenresContainer>
                            </Col>
                            <Col desktop={4} tablet={6} mobile={12}>
                                <Title size="h4" margin="0 0 0 0">Popularity</Title>
                                {artist.popularity && <Position><strong>{artist.popularity} / 100</strong></Position>}
                            </Col>
                            <Col desktop={4} tablet={6} mobile={12}>
                                <Title size="h4" margin="0 0 0 0">Followers</Title>
                                {artist.genres && <Position><strong>{artist.followers.total}</strong></Position>}
                            </Col>
                        </Grid>
                    </section>
                : null}

                {loadingTime && artistFourWeeks || artistSixMonths || artistSeveralYears ? 
                    <section>
                        <Title size="h4" margin="60px 0 0 0">{artist.name} appeareances in your artist ranking</Title>
                        <Grid colGap={30} rowGap={40}>
                            <Col desktop={4} tablet={6} mobile={12}>
                                {artistFourWeeks ? 
                                    <ArtistInfoCont>
                                        <Position>#<strong>{artistFourWeeks}</strong></Position>
                                        <ArtistInfo>In your most listened artists list for the <strong>past 4 weeks</strong>.</ArtistInfo>
                                    </ArtistInfoCont>
                                : 
                                <NoDataContainer>
                                    <NoDataTitle><strong>:(</strong></NoDataTitle> 
                                    <NoDataInfo>Not in your past 4 weeks ranking</NoDataInfo>  
                                </NoDataContainer>
                                }
                            </Col>
                            <Col desktop={4} tablet={6} mobile={12}>
                                {artistSixMonths ? 
                                    <ArtistInfoCont>
                                        <Position>#<strong>{artistSixMonths}</strong></Position>
                                        <ArtistInfo>In your most listened artists list for the <strong>past 6 months</strong>.</ArtistInfo>
                                    </ArtistInfoCont>
                                : 
                                <NoDataContainer>
                                    <NoDataTitle><strong>:(</strong></NoDataTitle> 
                                    <NoDataInfo>Not in your past 6 months ranking</NoDataInfo>  
                                </NoDataContainer>
                                }
                            </Col>
                            <Col desktop={4} tablet={6} mobile={12}>
                                {artistSeveralYears ? 
                                    <ArtistInfoCont>
                                        <Position>#<strong>{artistSeveralYears}</strong></Position>
                                        <ArtistInfo>In your most listened artists list for the <strong>past several years</strong>.</ArtistInfo>
                                    </ArtistInfoCont>
                                : 
                                <NoDataContainer>
                                    <NoDataTitle><strong>:(</strong></NoDataTitle> 
                                    <NoDataInfo>Not in your lifetime ranking</NoDataInfo>  
                                </NoDataContainer>
                                }
                            </Col>
                        </Grid>
                    </section>
                : null}

                {loadingTime && tracksFourWeeks.length > 0 || tracksSixMonths.length > 0 || tracksSeveralYears.length > 0 ? 
                    <section>
                        <Title size="h4" margin="60px 0 0 0">{artist.name}'s tracks appeareances in your tracks ranking</Title>
                        <Grid colGap={30} rowGap={40}>
                                <Col desktop={4} tablet={6} mobile={12}>
                                    {tracksFourWeeks.length > 0 ?<ArtistInfoCont>
                                        <Position><strong>{tracksFourWeeks.length}</strong></Position>
                                        <ArtistInfo>{tracksFourWeeks.length > 1 ? 'times' : 'time'} appeared in your top 50 tracks from the <strong>past 4 weeks</strong>.</ArtistInfo>
                                    </ArtistInfoCont>
                                    : 
                                    <NoDataContainer>
                                        <NoDataTitle><strong>:(</strong></NoDataTitle> 
                                        <NoDataInfo>Not in your past 4 weeks ranking</NoDataInfo>  
                                    </NoDataContainer>
                                    }
                                </Col>
                                <Col desktop={4} tablet={6} mobile={12}>
                                    {tracksSixMonths.length > 0 ? <ArtistInfoCont>
                                        <Position><strong>{tracksSixMonths.length}</strong></Position>
                                        <ArtistInfo>{tracksSixMonths.length > 1 ? 'times' : 'time'} appeared in your top 50 tracks from the <strong>past 6 months</strong>.</ArtistInfo>
                                    </ArtistInfoCont>
                                    : 
                                    <NoDataContainer>
                                        <NoDataTitle><strong>:(</strong></NoDataTitle> 
                                        <NoDataInfo>Not in your past 6 months ranking</NoDataInfo>  
                                    </NoDataContainer>
                                    }
                                </Col>
                                <Col desktop={4} tablet={6} mobile={12}>
                                    {tracksSeveralYears.length > 0 ? <ArtistInfoCont>
                                        <Position><strong>{tracksSeveralYears.length}</strong></Position>
                                        <ArtistInfo>{tracksSeveralYears.length > 1 ? 'times' : 'time'} appeared in your top 50 tracks <strong>lifetime</strong>.</ArtistInfo>
                                    </ArtistInfoCont>
                                    : 
                                    <NoDataContainer>
                                        <NoDataTitle><strong>:(</strong></NoDataTitle> 
                                        <NoDataInfo>Not in your lifetime ranking</NoDataInfo>  
                                    </NoDataContainer>
                                    }
                                </Col>
                        </Grid>
                    </section>
                : null}

                {loadingTime ? 
                    <section>
                        <Title size="h4" margin="120px 0 20px 0">Artist Top Tracks on Spotify</Title>
                        <Grid colGap={30} rowGap={40} columns>
                            {artistTopTracks && artistTopTracks.map((track, index) => (<TrackCard key={track._id} data={track} token={newToken} refreshToken={refresh_token} index={index} gridSize={2} singleTrack="100" playerArtistPage={playerArtistPage} setPlayerArtistPage={setPlayerArtistPage} blink={blink} setBlink={setBlink}/>))}
                        </Grid>
                    </section>
                : null}

                {loadingTime ? 
                <section>
                    <Title size="h4" margin="120px 0 20px 0">Related Artists</Title>
                    <Grid colGap={30} rowGap={40} columns>
                        {relatedArtists && relatedArtists.map((artist) => (<ArtistCard key={artist._id} data={artist} gridSize={2} token={newToken} refreshToken={refresh_token}/>))}
                    </Grid>
                </section>
                : null}

                <Footer /> 
            </Inner>
            
            
        </div>
    )
}