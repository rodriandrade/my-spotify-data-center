import styled from 'styled-components'

const Container = styled.div`
    background-color: rgb(10,10,10);
    width:400px;
    padding:30px;
    border-radius:10px;
    margin:10px;
`

const ContainerTrack = styled.div`
    position:relative;
`

const TrackImage = styled.img`
    max-height:200px;
    max-width: 200px;
    cursor: pointer;    
    opacity:1;
`

const PlayOnSpotify = styled.p`
    position: absolute; 
    top:33%;
    left:20%;
    color: #fff;
    text-align:center;
    font-size:16px;
    opacity:0; 
`

const ImageContainer = styled.div`
    width:200px;  
    height:200px;
    position: relative;

    &:hover ${PlayOnSpotify} {
        opacity: 1;
    }

    &:hover ${TrackImage} {
        opacity: 0.1;
    }
`

const TrackPosition = styled.p`
    //font-size:32px;
    font-size:60px;
    color: #fff;
    margin:0;
    text-align: center;
    font-weight:bold;
    position:absolute;
    //top:125px;
    //left:10px;
    top:45%;
    left:50%;
    transform: translate(-50%, 25%);
    text-shadow: 0px 0px 11px rgba(0, 0, 0, 1);

    /*
    ::after{
        content: "";
        display: block;
        width: 2px;
        height: 2px;
        margin:5px auto;
        background: white;
        border-radius: 5px;
    }
    */
`

const TrackName = styled.p`
    font-size:16px;
    color: #47ffbb;
    margin:10px;
    text-align: center;
    cursor: pointer;
    z-index:4;

    :hover{
        text-decoration: underline 3px solid;
    }
`

const ArtistName = styled.p`
    font-size:12px;
    color: #fff;
    margin:0;
    text-align: center;
    z-index:4;
`

export { Container, TrackName, ArtistName, TrackImage, TrackPosition, PlayOnSpotify, ImageContainer, ContainerTrack}