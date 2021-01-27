import React, {useEffect, useState} from 'react'
import axios from 'axios'

const TopGenres = props =>{

    /*
    const [genres, setGenres] = useState([])
    const [artistsIDS, setArtistsIDS] = useState([])
    const tracks = props.data;
    const artists_genres = [];
    const artists_ids = [];

    useEffect(() => {
        tracks.map(track => {
            track.artists.map(artist =>{
                artists_ids.push(artist.id)  
                setArtistsIDS(artist.id)
            })
        })
    }, [tracks])

    useEffect(() => {
        console.log("Hola")
        artists_ids.map(async (id) => {
            const responseArtist = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    Authorization: "Bearer " + props.token,
                },
            });
            responseArtist.data.genres.map((genre) => {
                artists_genres.push(genre);
            });
           // console.log(artists_genres)
            setGenres(artists_genres);
            //console.log(genres)
        });

       console.log(genres)

    }, [artistsIDS])
    */

     return(
        <div>
            {genres && genres.map(genre => <p>{genre}</p>)}   
        </div>
    )
}

export default TopGenres