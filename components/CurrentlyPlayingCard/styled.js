import styled from 'styled-components'

const Container = styled.div`
    background-color: rgb(10,10,10);
    width:400px;
    padding:30px;
    border-radius:10px;
    margin:10px;
`

const TrackImage = styled.img`
    max-height:200px;
    max-width: 200px;
    text-align: center;
    :hover{
        opacity:0.6;
    }
`
const ImageContainer = styled.div`
    margin:0 auto;
    width:200px;
`

const ArtistName = styled.p`
    font-size:12px;
    color: #47ffbb;
    margin:0;
    text-align: center;
`

const TrackName = styled.p`
    font-size:16px;
    color: #fff;
    margin:0px;
    text-align: center;
    cursor: pointer;

    :hover{
        text-decoration: underline 3px solid;
    }
`

const TimePlayed = styled.p`
    font-size:12px;
    color: grey;
    margin:0;
`

export { Container, TrackName, TimePlayed, TrackImage, ArtistName, ImageContainer}