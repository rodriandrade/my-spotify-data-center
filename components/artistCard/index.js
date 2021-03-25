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
                    <Overlay></Overlay>
                    {images.length >= 3 ? 
                    <ArtistImage src={images[2].url} alt={name} imageSizeLarge />
                    : <ArtistImage src={images[1].url} alt={name} imageSizeLarge />}
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