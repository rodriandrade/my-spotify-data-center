import {Container, TrackName, TimePlayed, ArtistName, AlbumImage, FlexContainer} from './styled'
import Link from 'next/link'

const RecentlyPlayedCard = props =>{

    //console.log(props.data)
    const {played_at, track} = props.data;
    const {artists, album} = track
    const {images} = album;

    const artistName = [];
    const albumImage = images[1].url;

    artists.map(artist => {
        artistName.push(artist.name)
    })

    const playedDay = played_at.slice(0, 10);
    const playedTime = played_at.slice(11, 19);

    const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const hour = playedTime.slice(0,2);

    return(
        <FlexContainer>
            <Container>
                <AlbumImage src={albumImage}/>
                <Link href={{pathname: `/track/${track.id}`, query: { token: props.token, id: track.id }, }}>
                    <TrackName>{track.name}</TrackName>
                </Link>
                {artistName.map(artist => <ArtistName>{artist}</ArtistName>)}
                <TimePlayed>Played: {playedDay} at {playedTime} {playedTime.slice(0,2) < 12 ? "A.M" : "P.M"}</TimePlayed>
            </Container>
        </FlexContainer>
    )
}

export default RecentlyPlayedCard