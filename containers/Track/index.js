import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'
import { TrackImage, TrackName, TrackGenres, Container, ContainerImage, ContainerInfo, ArtistName } from './styled'
import BarChart from "../../components/BarChart";
import NavMenu from '../../components/NavMenu'

export default function Track() {
    const router = useRouter()
    const token = router.query.token;
    const id = router.query.id;

    const [track, setTrack] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [newRec, setNewRec] = useState(false)
    const [artistsNames, setArtistsNames] = useState([]);

    const [save, setSave] = useState()

    console.log(id);

    useEffect(() => {

        const fetchData = async () => {
            
            try {
                const responseTrack = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });
                
                
                const responseAudioFeatures = await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });
                

                const responseSavedTrack = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });

                console.log(responseTrack.data);
                console.log(responseAudioFeatures.data);
                setAudioFeatures(responseAudioFeatures.data);
                setSave(responseSavedTrack.data.toString()); 
                setTrack(responseTrack.data);

                if(track.artists){
                    const artistsNamesToShow = track.artists.map(artist =>{
                        return artist.name
                    })
                    setArtistsNames(artistsNamesToShow);
                }
                
                const artist = responseTrack.data.artists[0].id;

                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artist}&seed_tracks=${id}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });

                //console.log(responseRecommendations.data.tracks)
                setRecommendations(responseRecommendations.data.tracks)
                
            } catch (error) {
                console.error('este es mi error',error);
            }
            
        }
        
        fetchData()
        
    }, [token, newRec, id])

    const handleSave = async () => {
        const base_url = `https://api.spotify.com/v1/me/tracks?ids=${id}`
          axios({
            method: save === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + token }
          })
        setSave(save === "true" ? 'false' : 'true')
    }

    const createPlaylistWithRecommendations = async () => {
        if(token){

          try {
              const responseUserProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                  headers: {
                  'Authorization': 'Bearer ' + token
                  }
              });
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
                headers: { 'Authorization': 'Bearer ' + token }
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
                  headers: { 'Authorization': 'Bearer ' + token }
                })
                .then(function (response) {
                  //console.log(response);
                });
              });
          } catch (error) {
              console.error('este es mi error',error);
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
 
                <Container>
                    <ContainerImage>
                        {track.album && <TrackImage src={track.album.images[0].url} />}
                    </ContainerImage>
                    <ContainerInfo>
                        <TrackName>{track.name}</TrackName> 
                        {!!artistsNames && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
                        {track && <ArtistName>{(track.duration_ms / 60000).toPrecision(4)}</ArtistName> }                
                        {save && <button onClick={handleSave}>{save === 'true' ? 'unsave' : 'save'}</button> }
                    </ContainerInfo>
                </Container>
 
                <Title size="h4">Audio features</Title>
                <Grid colGap={30} rowGap={40}>
                    <Col desktop={12} tablet={6} mobile={12}>
                        {audioFeatures != '' && <BarChart audioFeatures={audioFeatures} />}
                    </Col>
                </Grid>
                <Title size="h4">Recommendations</Title>
                <button onClick={() => setNewRec(!newRec)}>Refresh recommendations</button>
                <button onClick={createPlaylistWithRecommendations}>Create playlist</button>
                <Grid colGap={30} rowGap={40} columns>
                    {recommendations.map((track) => (<TrackCard key={track._id} data={track} token={token} gridSize={2}/>))}
                </Grid>
            </Inner>
        </div>
    )
}