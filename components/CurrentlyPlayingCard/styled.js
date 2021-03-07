import styled from 'styled-components'

const TimePlayed = styled.p`
    font-size:16px;
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
    height:25px;
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
    background-color: rgba(10,10,10,1);
    width:100%;
    height:100px;
    margin:0;
    position: fixed;
    display:flex;
    flex-direction:column;
    left:0;
    bottom:0;
    justify-content:center;
    align-items:center;
    z-index:20000;
    transition:1s;
    transform:${(props) => (props.showPlayer ? "translate(0%, 0px)" : "translate(0%, 75px)")};
`

const TrackImage = styled.img`
    max-height:50px;
    max-width: 50px;
    text-align: center;
    :hover{
        opacity:0.6;
    }
`
const ImageContainer = styled.div`
    margin:0 auto;
    width:50px;
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

const TextContainer = styled.p`
    display:flex;
    align-items:flex-start;
    justify-content:flex-start;
    flex-direction:column;
    margin-left:20px;
`

const ContainerPlay = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin-left:20px;
`


const Cont = styled.div`
    width:1200px;
    display:flex;
    justify-content:space-between;
    position:relative;
`

const ContainerTrack = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`

const PlayState = styled.img`
    width:25px;
    height:25px;
    cursor:pointer;
`

const SoundContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items: flex-end;
    height:20px;
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
            height: 20px;
            opacity:0.7;
        }
        100% {
            height: 5px;
            opacity:1;
        }
    }
`


const TrackSave = styled.img`
    max-width:20px;
    max-height:20px;
    margin:0 20px;
    cursor:pointer;
`

const SoundBar = styled.div`
`

export { Container, TrackName, TimePlayed, TrackImage, ArtistName, ImageContainer, TextContainer, ContainerPlay, Cont, ContainerTrack, PlayState, CurrentlyPlayingCont, SoundBar, SoundContainer, TrackSave}