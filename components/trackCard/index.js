import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer} from './styled'
import axios from 'axios'

const TrackCard = props =>{

    const {genres, name, album, external_urls, id, artists} = props.data
    const playTrack = async () =>{

        const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
              headers: {
              'Authorization': 'Bearer ' + props.token
              }
        });
        
        const devices = responseUserDevices.data.devices;
        const deviceActive = devices.filter(device => {
           if (device.is_active === true){
               return device.id
           }
        })
        const deviceID = deviceActive[0].id;
        if(deviceID){
        const requestData = {
            "uris": [`spotify:track:${id}`],
            "position_ms": 0
          }
        /*
        try {
        const base_url_volume = `https://api.spotify.com/v1/me/player/volume?volume_percent=50&device_id=${deviceID[0].id}`;
        axios({
            method: 'put',
            url: base_url_volume,
            headers: { 'Authorization': 'Bearer ' + props.token }
          })
          .then(function (response) {
            console.log(response);
          });  
        } catch (error) {
            console.error('este es mi error',error);
        }
        */
        const base_url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
        axios({
            method: 'put',
            url: base_url,
            data: requestData,
            headers: { 'Authorization': 'Bearer ' + props.token }
          })
          .then(function (response) {
            //console.log(response);
          });
        } else{
            console.log("No hay devices activos")
        }
    }
    //
    //

    return(
        <Col desktop={2} tablet={6} mobile={12}>
            <div>
                <ImageContainer>
                    <a onClick={playTrack} target="_blank">
                        <PlayOnSpotify>Play On Spotify</PlayOnSpotify>
                        <TrackImage src={album.images[1].url} alt={name}/>
                    </a>
                </ImageContainer>
                {props.index && <TrackPosition>{props.index + 1}</TrackPosition>}
                <Link href={{pathname: `/track/${id}`, query: { token: props.token, id: id }, }}>
                    <TrackName>{name}</TrackName>
                </Link>
                {artists.map(artist => 
                    <Link href={{pathname: `/artist/${artist.name}`, query: { token: props.token, id: artist.id }, }}>
                        <ArtistName>{artist.name}</ArtistName>
                    </Link>
                )}
            </div>
        </Col>
    )
}

export default TrackCard