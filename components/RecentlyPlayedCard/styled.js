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

const ContainerInfo = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:30px;
`

const ContainerImage = styled.div`
    width:50px;
    height:50px;
    position:relative;

    &:hover ${TextContainer} {
        opacity: 1;
    }
`

const Container = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    border-bottom:1px solid rgb(20,20,20);
    padding-bottom:10px;
    margin:0;
    justify-content:space-between;
    padding:10px 0;
`

const AlbumImage = styled.img`
    width:50px;
`

const TrackName = styled.h4`
    font-size:16px;
    color: #fff;
    margin:0;
    cursor:pointer;

    :hover{
        text-decoration: underline 1px solid #47ffbb;
    }
`

const ArtistName = styled.p`
    font-size:14px;
    color: #47ffbb;
    margin:0;
`

const TimePlayed = styled.p`
    font-size:14px;
    color: grey;
    margin-left:30px;
`

const ContainerTrackData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
`

const TrackPlay = styled.img`
    position: absolute; 
    top:50%;
    left:53%;
    color: rgb(12,12,12);
    text-align:center;
    font-size:20px;
    opacity:1; 
    margin:0;
    width:100%;
    cursor:pointer;
    transform: translate(-50%, -50%);
    max-width:20px;
    max-height:20px;
`

export { Container, TrackName, ArtistName, TimePlayed, AlbumImage, ContainerInfo, ContainerImage, ContainerTrackData, Text, TextContainer, TrackPlay }