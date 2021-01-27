import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'

export default function Track() {
    const router = useRouter()
    const token = router.query.token;
    const id = router.query.id;

    const [track, setTrack] = useState([]);
    const [audioFeatures, setresponseAudioFeatures] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [newRec, setNewRec] = useState(false)

    const [save, setSave] = useState()

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

                setSave(responseSavedTrack.data.toString());
                console.log(responseAudioFeatures.data);
                console.log(responseTrack.data); 
                setTrack(responseTrack.data);
                setresponseAudioFeatures(responseAudioFeatures.data);

                const artist = responseTrack.data.artists[0].id;

                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artist}&seed_tracks=${id}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });

                console.log(responseRecommendations.data.tracks)
                setRecommendations(responseRecommendations.data.tracks)
                
            } catch (error) {
                console.error('este es mi error',error);
            }
            
        }
        
        fetchData()
        
    }, [token, newRec])

    const handleSave = async () => {
        const base_url = `https://api.spotify.com/v1/me/tracks?ids=${id}`
          axios({
            method: save === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + token }
          })
        setSave(save === "true" ? 'false' : 'true')
      }

    return (
        <div>
            <Inner>
                <Title size="h1">{track.name}</Title>
                {save && 
                    <button onClick={handleSave}>{save === 'true' ? 'unsave' : 'save'}</button>
                }
                {recommendations.length > 0 && <Title size="h4">Recommendations</Title>}
                <button onClick={() => setNewRec(!newRec)}>Refresh recommendations</button>
                <Grid colGap={30} rowGap={40}>
                    {recommendations.length > 0 && recommendations.map((track) => (<TrackCard key={track._id} data={track} token={token}/>))}
                </Grid>
                <h3>Audio Features</h3>
            </Inner>
        </div>
    )
}