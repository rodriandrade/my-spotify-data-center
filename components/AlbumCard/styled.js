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

const TextContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ;
    background-color:rgb(0,0,0,0.8);
    cursor:pointer;
`

const Text = styled.p`
    position: absolute; 
    top:50%;
    left:50%;
    color: rgb(12,12,12);
    text-align:center;
    font-size:20px;
    opacity:1; 
    margin:0;
    width:100%;
    cursor:pointer;
    transform: translate(-50%, -50%);
    color:#fff;
`

const ImageContainer = styled.div`
    width:200px;  
    height:200px;
    position: relative;

    &:hover ${TextContainer} {
        opacity: 1;
    }
`

const TrackPosition = styled.p`
    font-size:32px;
    color: #fff;
    margin:0;
    text-align: center;

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
    font-size:18px;
    color: #fff;
    margin:20px 0 5px 0;
    text-align: center;
    cursor: pointer;
    text-transform:uppercase;

    :hover{
        text-decoration: underline 3px solid #47ffbb;
    }
`

const ArtistName = styled.p`
    font-size:14px;
    color: #47ffbb;
    margin:0;
    text-align: center;
    //text-transform:uppercase;
`



export { Container, TrackName, ArtistName, TrackImage, TrackPosition, PlayOnSpotify, ImageContainer, TextContainer, Text}