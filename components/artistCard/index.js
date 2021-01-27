import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {ArtistImage, ArtistName, ArtistPosition} from './styled'

const ArtistCard = props =>{
    const {genres, name, images, external_urls, id} = props.data

    return(
        <Col desktop={2} tablet={6} mobile={12}>
            <div>
                <a href={external_urls.spotify} target="_blank">
                    <ArtistImage src={images[2].url} alt={name} />
                </a>
                <ArtistPosition>{props.index + 1}</ArtistPosition>
                <Link href={{pathname: `/artist/${name}`, query: { token: props.token, id: id },}}>
                    <ArtistName>{name}</ArtistName>
                </Link>
                
            </div>
        </Col>
    )
}

export default ArtistCard