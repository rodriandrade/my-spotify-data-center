import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer} from './styled'
import axios from 'axios'
import React, {useState, useEffect} from 'react'

const AlbumCard = props =>{

    const [albumToShow, setAlbumToShow] = useState([])
    const [artistsNames, setArtistsNames] = useState([]);
    const [tracks, setTracks] = useState([]);
    
    // Play track from album
    const [activeDevices, setActiveDevices] = useState('');

    useEffect(() => {
        const fetchAlbumToShow = async () =>{
            const responseAlbum = await axios.get(`https://api.spotify.com/v1/search?q=${props.data}&type=album&limit=1`, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });

            const responseAlbumTracks = await axios.get(`https://api.spotify.com/v1/albums/${responseAlbum.data.albums.items[0].id}`, {
                    headers: {
                    'Authorization': 'Bearer ' + props.token
                    }
            }); 
            setTracks(responseAlbumTracks.data.tracks.items);
            setAlbumToShow(responseAlbum.data.albums.items[0])

            //setTracks(responseAlbum.data.tracks.items);
            console.log(responseAlbum);
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

    const playTrack = async () =>{
        try{
        const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                headers: {
                'Authorization': 'Bearer ' + props.token
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
            /*
            if (error.response.status === 401) {
                getNewToken();
            }
            */
        }
    }
  
    const checkPlayTrack = (responseUserDevices) =>{
        if(tracks){
          try {
          const devices = responseUserDevices.data.devices;
          if(devices.length == 0){
              setActiveDevices(false);
          } else{
              setActiveDevices(true)
              const deviceID = responseUserDevices.data.devices[0].id
              if(deviceID){
              console.log("Holis");
              const trackID = tracks[0].id
              const requestData = {
                  "uris": [`spotify:track:${trackID}`],
                  "position_ms": 0
              }
              const base_url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
              axios({
                  method: 'put',
                  url: base_url,
                  data: requestData,
                  headers: { 'Authorization': 'Bearer ' + props.token }
              })
              .then(function (response) {
                  //console.log(response);
                  props.setPlayingRightNow(trackID);
              });
              } else{
                  console.log("No hay devices activos")
              }
          }
          } catch(error){
              /*
              if (error.response.status === 401) {
                  getNewToken();
              }
              */
          }
        }
    }

    return (
      <Col desktop={props.gridSize} tablet={6} mobile={12}>
        <div>
          <ImageContainer>
            {albumToShow.images && (
              <TrackImage onClick={playTrack} src={albumToShow.images[1].url} alt={name} />
            )}
          </ImageContainer>
          <Link
            href={{
              pathname: `/album/${albumToShow.name}`,
              query: {
                token: props.token,
                id: albumToShow.id,
                refreshToken: props.refreshToken,
              },
            }}
          >
            {albumToShow && <TrackName>{albumToShow.name}</TrackName>}
          </Link>

          {artistsNames && <ArtistName>{artistsNames.join(", ")}</ArtistName>}
        </div>
      </Col>
    );
}

export default AlbumCard