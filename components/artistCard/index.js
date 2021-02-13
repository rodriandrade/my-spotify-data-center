import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {ArtistImage, ArtistName, ArtistPosition, ContainerArtist} from './styled'

const ArtistCard = props =>{
    const {genres, name, images, external_urls, id} = props.data
    const position = props.index + 1;
    /*
    {props.imageSizeLarge ? 
                <a href={external_urls.spotify} target="_blank">
                    <ArtistImage src={images[0].url} alt={name} imageSizeLarge />
                </a>
                : 
                <a href={external_urls.spotify} target="_blank">
                    <ArtistImage src={images[0].url} alt={name} />
                </a>
                }

                {props.imageSizeLarge ? 
                <ArtistPosition>{props.index + 1}</ArtistPosition>
                : 
                <ArtistPosition>{props.index + 11}</ArtistPosition>
                }
                 
                <Link href={{pathname: `/artist/${name}`, query: { token: props.token, id: id },}}>
                    <ArtistName>{name}</ArtistName>
                </Link>
    */

    // <ArtistPosition>{props.index + 1}</ArtistPosition>
    return(
        <Col desktop={props.gridSize} tablet={6} mobile={12}>
            <ContainerArtist>
                <a href={external_urls.spotify} target="_blank">
                    <ArtistImage src={images[0].url} alt={name} imageSizeLarge />
                </a>
                {!!position && <ArtistPosition>{position}</ArtistPosition>}                
                <Link href={{pathname: `/artist/${name}`, query: { token: props.token, id: id, refreshToken: props.refreshToken },}}>
                    <ArtistName>{name}</ArtistName>
                </Link>
                
            </ContainerArtist>
        </Col>
    )
}

export default ArtistCard