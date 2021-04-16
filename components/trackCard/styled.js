import styled from 'styled-components'

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

    @media (max-width: 480px) {
        height: 100%;
        width:100%;
    }
`

const Text = styled.p`
    position: absolute; 
    top:50%;
    left:50%;
    color: rgb(12,12,12);
    text-align:center;
    //font-size:20px;
    font-size:18px;
    opacity:1; 
    margin:0;
    width:100%;
    cursor:pointer;
    transform: translate(-50%, -50%);
    color:#fff;
`

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
    //max-height:200px;
    //max-width: 200px;
    max-height:180px;
    max-width: 180px;
    //max-height: ${(props) => (props.singleTrack ? "100%" : "200px")};
    //max-width: ${(props) => (props.singleTrack ? "100%" : "200px")};
    cursor: pointer;    
    opacity:1;

    @media (max-width: 768px) {
        max-height: 100%;
        max-width:100%;
    }

    @media (max-width: 480px) {
        max-height: 100%;
        max-width:100%;
    }
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
    //max-height: ${(props) => (props.singleTrack ? "100%" : "200px")};
    //max-width: ${(props) => (props.singleTrack ? "100%" : "200px")};
    //max-height:200px;
    //max-width: 200px;
    height:180px;
    width: 180px;
    position: relative;
    margin:0 auto;
    &:hover ${TextContainer} {
        opacity: 1;
    }

    @media (max-width: 768px) {
        height:100%;
        width:100%;
    }

    @media (max-width: 480px) {
        height:100%;
        width:100%;
    }

    /*
    &:hover ${PlayOnSpotify} {
        opacity: 1;
    }

    &:hover ${TrackImage} {
        opacity: 0.1;
    }
    */
`

const TrackPosition = styled.p`
    //font-size:60px;
    font-size:54px;
    color: #fff;
    margin:0;
    text-align: center;
    font-weight:bold;
    position:absolute;
    //top:125px;
    //left:10px;
    top:67%;
    left:50%;
    transform: translate(-50%, 25%);
    text-shadow: 0px 0px 11px rgba(0, 0, 0, 1);

    @media (max-width:768px) {
        transform: translate(-50%, 4%);
        font-size:48px;
    }

    @media (max-width:480px) {
        transform: translate(-50%, 16%);
    }

    @media (max-width:375px) {
        transform: translate(-50%, 10%);
    }

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
    //font-size:16px;
    font-size:14px;
    //color: #47ffbb;
    color: #fff;
    text-transform:uppercase;
    margin: ${(props) => (props.margin ? props.margin : "40px 0 5px 0")};
    text-align: center;
    cursor: pointer;
    z-index:4;

    :hover{
        text-decoration: underline 3px solid #47ffbb;
    }

    @media (max-width:768px) {
        margin: ${(props) => (props.margin ? props.margin : "30px 0 5px 0")};
    }

    @media (max-width: 480px) {
       font-size:16px;
       margin: ${(props) => (props.margin ? "20px 0 5px 0" : "30px 0 5px 0")};
    }
`

const ArtistName = styled.p`
    font-size:13px;
    //color: #fff;
    color:#47ffbb;
    margin:0;
    text-align: center;
    z-index:4;

    @media (max-width: 480px) {
       font-size:14px;
    }
`

export { Container, TrackName, ArtistName, TrackImage, TrackPosition, PlayOnSpotify, ImageContainer, ContainerTrack, Text, TextContainer}