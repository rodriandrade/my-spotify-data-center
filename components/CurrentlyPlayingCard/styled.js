import styled from 'styled-components'

const TimePlayed = styled.p`
    //font-size:16px;
    font-size:14px;
    color: #000;
    margin:0;
    animation: ${(props) => (props.blink ? "blink-text 1s ease-out" : "")};

    @keyframes blink-text{
        0% {
            color: #000;
        }
        50% {
            color: #47ffbb;
        }
        100% {
            color: #000;
        }
    }
`


const CurrentlyPlayingCont = styled.div`
    background-color: #47ffbb;
    width:100%;
    height:22px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    margin:0;
    padding:0;
    animation: ${(props) => (props.blink ? "blink-cont 1s ease-out" : "")};

    :hover{
        opacity:0.6;
    }

    &:hover ${TimePlayed} {
        color: #000;
    }

    @keyframes blink-cont{
        0% {
            background-color: #47ffbb;
        }
        50% {
            background-color: rgba(10,10,10,1);
        }
        100% {
            background-color: #47ffbb;
        }
    }
`

const Container = styled.div`
    //background-color: rgba(10,10,10,1);
    width:93%;
    //height:100px;
    margin:0;
    position: fixed;
    display:flex;
    flex-direction:column;
    //left:0;
    bottom:0;
    justify-content:center;
    align-items:center;
    z-index:20000;
    transition:1s;
    //transform: translateX(-50%);
    transform:${(props) => (props.showPlayer ? "translate(0%, 0px)" : "translate(0%, 70px)")};
    background-color:rgba(0,0,0,0.8);
    backdrop-filter:blur(20px);

    @media (max-width: 480px) {
       width:100%;
       transform:${(props) => (props.showPlayer ? "translate(0%, -50px)" : "translate(0%, 35px)")};
    }
`


const TrackImage = styled.img`
    //max-height:50px;
    //max-width: 50px;
    max-height:45px;
    max-width: 45px;
    text-align: center;
    :hover{
        opacity:0.6;
    }

    @media (max-width: 480px) {
        max-height:30px;
        max-width: 30px;
    }
`
const ImageContainer = styled.div`
    margin:0 auto;
    width:50px;

    @media (max-width: 480px) {
        max-height:30px;
        max-width: 30px;
        margin-right:10px;
    }
`

const ArtistName = styled.p`
    //font-size:12px;
    font-size:11px;
    color: #47ffbb;
    margin:0;
    text-align: center;
`

const TrackName = styled.p`
    //font-size:16px;
    font-size:14px;
    color: #fff;
    margin:0px;
    text-align: center;
    cursor: pointer;

    :hover{
        text-decoration: underline 3px solid;
    }
`

const TextContainer = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:flex-start;
    flex-direction:column;
    padding:16px 0;
`

const ContainerPlay = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin-left:20px;
`


const Cont = styled.div`
    width:1080px;
    display:flex;
    justify-content:space-between;
    position:relative;

    @media (max-width: 480px) {
       width:90%;
    }
`

const ContainerTrack = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`

const PlayState = styled.img`
    width:22px;
    height:22px;
    cursor:pointer;
`

const SoundContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items: flex-end;
    height:18px;
    margin-right:20px;

    div{
        background: #fff;
        bottom: 1px;
        height: 5px;
        width: 5px;  
        margin: 0 3px;  

        :first-child {
            animation: ${(props) => (props.isPlaying ? "sound-bar 0.5s infinite ease-out both" : "")};
        }
        :nth-child(2) {
            animation: ${(props) => (props.isPlaying ? "sound-bar 0.6s infinite ease-out both" : "")};
        }
        :nth-child(3) {
            animation: ${(props) => (props.isPlaying ? "sound-bar 0.7s infinite ease-out both" : "")};
        }
    }

    @keyframes sound-bar{
        0% {
            height: 5px;
            opacity:1;
        }
        50% {
            height: 18px;
            opacity:0.7;
        }
        100% {
            height: 5px;
            opacity:1;
        }
    }

    @media (max-width: 480px) {

        margin-right:10px;

       div{
           width:3px;
       }
    }
`


const TrackSave = styled.img`
    max-width:18px;
    max-height:18px;
    margin-right:20px;
    cursor:pointer;
`

const DevicesMenuContainer = styled.div`
    background-color:rgba(20,20,20,1);
    position:absolute;
    top:-290px;
    left:200px;
    width:300px;
    min-height:250px;
    padding:10px;
    border-radius:4px;

    ::after{
        content:'';
        display:block;
        width: 0;
        height: 0;
        border-left: 25px solid transparent;
        border-right: 25px solid transparent;
        border-top: 50px solid rgba(20,20,20,1);
        top:50%;
        left:50%;
        transform: translate(-50%, 230%);
        position:absolute;
    }
`

const DeviceContainer = styled.div`
    padding:10px;
    border-bottom:1px solid rgb(22,22,22,1);
    cursor:pointer;
    display:flex;
    flex-direction:row;
    background-color: ${(props) => (props.active ? "rgba(66, 133, 108, 0.1)" : "")};

    :hover{
        background-color:rgb(23,23,23,1);
    }
`

const DevicesMenuTitle = styled.h2`
    font-size:16px;
    color: #fff;
    text-align:center;
`

const DeviceName = styled.span`
    font-size:16px;
    color: ${(props) => (props.active ? "#47ffbb" : "#fff")};
`

const DeviceType = styled.span`
    font-size:14px;
    color: rgba(100,100,100,1);
`

const DeviceInfo = styled.div`
    display:flex;
    flex-direction:column;
`

const LyricsContainer = styled.div`
    width:100%;
    height:100vh;
    background-color: yellow;
    position:relative;
`

const Lyrics = styled.span`
    font-size:16px;
    color:#fff;
    font-family: Poppins;
`

const IconsContainer = styled.div`
    position:relative;
    margin-left:20px;
    display:flex;
    flex-direction:row;
    align-items:center;
`

export { Container, TrackName, TimePlayed, TrackImage, ArtistName, ImageContainer, TextContainer, ContainerPlay, Cont, ContainerTrack, PlayState, CurrentlyPlayingCont, SoundContainer, TrackSave, DevicesMenuContainer, DevicesMenuTitle, DeviceContainer, DeviceName, DeviceType, DeviceInfo, Lyrics, LyricsContainer, IconsContainer}