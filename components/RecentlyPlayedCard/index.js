import {Container, TrackName, TimePlayed, ArtistName, AlbumImage, ContainerInfo, ContainerImage } from './styled'
import Link from 'next/link'
import {Grid, Col} from '../Grid'

const RecentlyPlayedCard = props =>{

    const {played_at, track} = props.data;
    const {artists, album} = track
    const {images} = album;
    //console.log(props.data);
    const artistName = [];
    const albumImage = images[1].url;

    artists.map(artist => {
        artistName.push(artist.name)
    })

    const playedDay = played_at.slice(0, 10);
    const playedTime = played_at.slice(11, 19);

    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const hour = playedTime.slice(0,2);

    /*

    <Col desktop={4} tablet={6} mobile={12}>
            <Container>
                <ContainerImage>
                <AlbumImage src={albumImage}/>
                </ContainerImage>
                <ContainerInfo>
                    <Link href={{pathname: `/track/${track.id}`, query: { token: props.token, id: track.id }, }}>
                        <TrackName>{track.name}</TrackName>
                    </Link>
                    {artistName.map(artist => <ArtistName>{artist}</ArtistName>)}
                    <TimePlayed>Played: {playedDay} at {playedTime} {playedTime.slice(0,2) < 12 ? "A.M" : "P.M"}</TimePlayed>
                </ContainerInfo>
            </Container>
        </Col>
    */

    return(
        <Col desktop={12} tablet={6} mobile={12}>
            <Container>
                <ContainerImage>
                    <AlbumImage src={albumImage}/>
                </ContainerImage>
                <ContainerInfo>
                    <Link href={{pathname: `/track/${track.id}`, query: { token: props.token, id: track.id }, }}>
                        <TrackName>{track.name}</TrackName>
                    </Link>
                    <ArtistName>{artistName.join(", ")}</ArtistName>
                    <TimePlayed>Played: {playedDay} at {playedTime} {playedTime.slice(0,2) < 12 ? "A.M" : "P.M"}</TimePlayed>
                </ContainerInfo>
            </Container>
        </Col>
    )
}

export default RecentlyPlayedCard