import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ArtistCard from '../../components/artistCard'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import {Container, ContainerInfo, ContainerImage, ArtistImage, ArtistName, ArtistGenres} from './styled'
import NavMenu from '../../components/NavMenu'

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
    const [artistFourWeeks, setArtistFourWeeks] = useState([]);
    const [artistSixMonths, setArtistSixMonths] = useState([]);
    const [artistSeveralYears, setArtistSeveralYears] = useState([]);

    // State relacionados a estadisticas de canciones del artista
    const [tracksFourWeeks, setTracksFourWeeks] = useState([]);
    const [tracksSixMonths, setTracksSixMonths] = useState([]);
    const [tracksSeveralYears, setTracksSeveralYears] = useState([]);

    // State relacionados a las canciones del historial de escucha del usuario
    const [tracksRecentlyPlayed, setTracksRecentlyPlayed] = useState([]);

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
                    console.log(responseArtistTopTracks.data.tracks)

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


                } catch (error) {
                    console.error('este es mi error',error);
                    if (error.response.status === 401) {
                        getNewToken(); 
                    }
                }
            }
        }
        fetchData()
    }, [id])

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
        }
    }

    return (
        <div>
            <NavMenu />
            <Inner>
                <Grid colGap={30} rowGap={40}>
                    <Col desktop={12} tablet={6} mobile={12}>
                        <Container>
                            <ContainerImage>
                               {artist.images && <ArtistImage src={artist.images[0].url} />}
                            </ContainerImage>
                            <ContainerInfo>
                                <ArtistName>{artist.name}</ArtistName>
                                {artist.genres && <ArtistGenres>{artist.genres.join(", ")}</ArtistGenres>}
                                {!!follow && <button onClick={handleFollow}>{follow === 'true' ? 'unfollow' : 'follow'}</button> }  
                                {!!artistFourWeeks && <ArtistGenres>{artist.name} appears in your most listened artists list for the past 4 weeks in position {artistFourWeeks} </ArtistGenres>}
                                {!!artistSixMonths && <ArtistGenres>{artist.name} appears in your most listened artists list for the past 6 months in position {artistSixMonths} </ArtistGenres>}
                                {!!artistSeveralYears && <ArtistGenres>{artist.name} appears in your most listened artists list for the past several years in position {artistSeveralYears} </ArtistGenres>}  

                                {!!tracksFourWeeks && <ArtistGenres>{tracksFourWeeks.length} times {artist.name} appeared in your top 50 tracks from the past 4 weeks</ArtistGenres>}
                                {!!tracksSixMonths && <ArtistGenres>{tracksSixMonths.length} times {artist.name} appeared in your top 50 tracks from the past 6 months</ArtistGenres>}
                                {!!tracksSeveralYears && <ArtistGenres>{tracksSeveralYears.length} times {artist.name} appeared in your top 50 tracks lifetime</ArtistGenres>}

                                {!!tracksRecentlyPlayed && <ArtistGenres>{tracksRecentlyPlayed.length} times {artist.name} appeared in your last 50 streams</ArtistGenres>}
                            </ContainerInfo>
                        </Container>
                    </Col>
                </Grid>

                <Title size="h4">Artist Top Tracks on Spotify</Title>
                <Grid colGap={30} rowGap={40} columns>
                    {artistTopTracks && artistTopTracks.map((track, index) => (<TrackCard key={track._id} data={track} token={newToken} index={index} gridSize={2}/>))}
                </Grid>

                <Title size="h4">Related Artists</Title>
                <Grid colGap={30} rowGap={40} columns>
                    {relatedArtists && relatedArtists.map((artist) => (<ArtistCard key={artist._id} data={artist} gridSize={2} token={newToken}/>))}
                </Grid>
            </Inner>
        </div>
    )
}