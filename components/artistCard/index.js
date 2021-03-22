import Link from 'next/link'
import {Grid, Col} from '../Grid'
import {ArtistImage, ArtistName, ArtistPosition, ContainerArtist, Overlay, ImageContainer} from './styled'

const ArtistCard = props =>{
    const {genres, name, images, external_urls, id} = props.data
    const position = props.index + 1;
    
    return(
        <Col desktop={props.gridSize} tablet={6} mobile={6}>
            <ContainerArtist>
                <ImageContainer>
                <a href={external_urls.spotify} target="_blank">
                    <Overlay></Overlay>
                    <ArtistImage src={images[2].url} alt={name} imageSizeLarge />
                </a>
                </ImageContainer>
                {!!position && <ArtistPosition>{position}</ArtistPosition>}                
                <Link 
                    href={
                        {
                        pathname: `/artist/${name}`, 
                        query: { 
                            token: props.token, 
                            id: id, 
                            refreshToken: props.refreshToken 
                        },
                    }
                }>
                    <ArtistName>{name}</ArtistName>
                </Link>
            </ContainerArtist>
        </Col>
    )
}

export default ArtistCard