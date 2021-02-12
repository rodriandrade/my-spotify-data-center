import {Grid, Col} from '../Grid'
import {OwnerPlaylistName, PlaylistName, PlaylistImage} from './styled'

const PlaylistCard = props =>{
    const {name, owner, images, external_urls} = props.data
    return(
        <Col desktop={3} tablet={6} mobile={12}>
            <div>
                <a href={external_urls.spotify} target="_blank">
                    <PlaylistImage src={images[0].url} alt="playlist-cover"/>
                </a>
                <PlaylistName>{name}</PlaylistName>
                <OwnerPlaylistName>{owner.display_name}</OwnerPlaylistName>
            </div>
        </Col>
    )
}

export default PlaylistCard