import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer} from './styled'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const AlbumCard = props =>{

    //const {} = props.data
    //console.log(props.data)
    const [albumToShow, setAlbumToShow] = useState([])
    const [artistsNames, setArtistsNames] = useState([]);
    //console.log("ESTA ES LA DATA QUE LLEGA AL COMPONENTE", props.data)

    useEffect(() => {
        const fetchAlbumToShow = async () =>{
            const responseAlbum = await axios.get(`https://api.spotify.com/v1/search?q=${props.data}&type=album&limit=1`, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            setAlbumToShow(responseAlbum.data.albums.items[0])
            const artistInfo = responseAlbum.data.albums.items[0].artists;
            if(artistInfo){
                const artistsNamesToShow = artistInfo.map(artist =>{
                    return artist.name
                })
                setArtistsNames(artistsNamesToShow);
            }
        }
        fetchAlbumToShow();
    }, [props.data])
    //console.log(albumToShow)
    //console.log(artistsNames)
    //console.log(album);
    /*
    const artistsNames = album.artists.map(artist =>{
        return artist.name
    })
    */

    /*
    <ImageContainer>
                    <a onClick={playTrack} target="_blank">
                        <PlayOnSpotify onClick={openModal}>Play On Spotify</PlayOnSpotify>
                        <TrackImage src={album.images[1].url} alt={name} onClick={openModal}/>
                    </a>
                </ImageContainer>
                {props.index && <TrackPosition>{props.index + 1}</TrackPosition>}
                <Link href={{pathname: `/track/${id}`, query: { token: props.token, id: id }, }}>
                    <TrackName>{name}</TrackName>
                </Link>
                <ArtistName>{artistsNames.join(", ")}</ArtistName>
    */

    return(
        <Col desktop={props.gridSize} tablet={6} mobile={12}>
            <div>
                <ImageContainer>
                {albumToShow.images && <TrackImage src={albumToShow.images[1].url} alt={name} />}
                </ImageContainer>
                {albumToShow && <TrackName>{albumToShow.name}</TrackName>}
                {artistsNames && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
            </div>
        </Col>
    )
}

export default AlbumCard