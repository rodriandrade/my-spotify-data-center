import styled from 'styled-components'

const TimePlayed = styled.p`
    font-size:16px;
    color: #000;
    margin:0;
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

    :hover{
        opacity:0.6;
    }

    &:hover ${TimePlayed} {
        color: #000;
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

    :nth-child(1)  { left: 1px; animation-duration: 474ms; }
    :nth-child(2)  { left: 5px; animation-duration: 433ms; }
    :nth-child(3)  { left: 9px; animation-duration: 407ms; }
`

const SoundBar = styled.div`
    background: #fff;
    bottom: 1px;
    height: 3px;
    position: absolute;
    width: 3px;      
    animation: sound 0ms -800ms linear infinite alternate;

    @keyframes sound {
        0% {
            height: 3px; 
        }
        100% {       
            height: 28px;        
        }
    }
`


export { Container, TrackName, TimePlayed, TrackImage, ArtistName, ImageContainer, TextContainer, ContainerPlay, Cont, ContainerTrack, PlayState, CurrentlyPlayingCont, SoundBar, SoundContainer}