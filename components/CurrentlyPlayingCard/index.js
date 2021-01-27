import {TrackImage, TrackName, ArtistName, ImageContainer} from './styled'
import Link from 'next/link'

const CurrentlyPlayingCard = props =>{

    const {name, artists, album, external_urls, id} = props.data
    //console.log(props.data)
    
    return(
        <div>
        {props.data.length !== 0 &&
        <a href={external_urls.spotify} target="_blank">
            <ImageContainer>
                <TrackImage src={album.images[1].url} alt="playing" />
            </ImageContainer>
        </a>
        }
        <Link href={{pathname: `/track/${id}`, query: { token: props.token, id: id }, }}>
            <TrackName>{name}</TrackName>
        </Link>
        {props.data.length !== 0 &&
            <ArtistName>{artists[0].name}</ArtistName>
        }
        </div>
    )
}

export default CurrentlyPlayingCard