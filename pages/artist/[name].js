import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ArtistCard from '../../components/artistCard'
import TrackCard from '../../components/trackCard'
import {Grid, Col} from '../../components/Grid'
import Title from '../../components/Title'
import Inner from '../../components/Inner'

export default function Artist() {
    const router = useRouter()
    const token = router.query.token;
    const id = router.query.id;

    const [artist, setArtist] = useState([]);
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const [follow, setFollow] = useState()

    console.log(token)

    useEffect(() => {

        const fetchData = async () => {
            if(token){
            try {
                const responseArtist = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });
                
                const responseArtistTopTracks = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });

                const responseRelatedArtists = await axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });

                const responseUserFollowedArtists = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                });

                setFollow(responseUserFollowedArtists.data.toString());
                console.log(responseArtistTopTracks.data.tracks);
                console.log(responseRelatedArtists.data.artists);
                console.log(responseArtist.data); 
                setArtist(responseArtist.data);
                setArtistTopTracks(responseArtistTopTracks.data.tracks);
                setRelatedArtists(responseRelatedArtists.data.artists);

                
            } catch (error) {
                console.error('este es mi error',error);
            }
        }
    }
        fetchData()
    }, [token])

      const handleFollow = async () => {

        const base_url = `https://api.spotify.com/v1/me/following?type=artist&ids=${id}`
          axios({
            method: follow === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + token }
          })
        setFollow(follow === "true" ? 'false' : 'true')
      }

      console.log(artist)
   
    return (
        <div>
            <Inner>
                <Title size="h1">{artist.name}</Title>
                {follow && 
                    <button onClick={handleFollow}>{follow === 'true' ? 'unfollow' : 'follow'}</button>
                }
                <h4>Genres:</h4>
                <h3>{artist.popularity}%</h3>
                <Title size="h4">Artist Top Tracks on Spotify</Title>
                <Grid colGap={30} rowGap={40}>
                    {artistTopTracks && artistTopTracks.map((track, index) => (<TrackCard key={track._id} data={track} token={token} index={index}/>))}
                </Grid>

                <Title size="h4">Related Artists</Title>
                <Grid colGap={30} rowGap={40}>
                    {relatedArtists && relatedArtists.map((artist) => (<ArtistCard key={artist._id} data={artist} />))}
                </Grid>
            </Inner>
        </div>
    )
}