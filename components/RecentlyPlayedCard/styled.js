import styled from 'styled-components'

const FlexContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
`

const Container = styled.div`
    background-color: rgb(12,12,12);
    width:800px;
    padding:30px;
    border-radius:10px;
    margin:20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const AlbumImage = styled.img`
    max-height:200px;
    max-width: 200px;
`

const TrackName = styled.h4`
    font-size:16px;
    color: #fff;
    margin:20px 0 0 0;
`

const ArtistName = styled.p`
    font-size:12px;
    color: #47ffbb;
    margin:0;
`

const TimePlayed = styled.p`
    font-size:12px;
    color: grey;
    margin:0;
`

export { Container, TrackName, ArtistName, TimePlayed, AlbumImage, FlexContainer}