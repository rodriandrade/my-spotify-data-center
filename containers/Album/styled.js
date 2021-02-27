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

const ContainerAlbum = styled.div`
    display:flex;
    flex-direction:column;
    border-radius:10px;
    //background-color: rgba(15,15,15, 0.6);
    border-radius:10px;
    padding:10px;
    position:sticky;
    top:0;
`

const ContainerInfo = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:15px;
`

const Subtitle = styled.p`
    font-size:14px;
    color: rgb(100,100,100);
    margin:0;
`

const AlbumInfo = styled.p`
    font-size:18px;
    color:#fff;
    margin:0;
`

const ContainerImage = styled.div`
    width:220px;
    height:220px;
    position:relative;

    &:hover ${TextContainer} {
        opacity: 1;
    }
`

const Container = styled.div`
    width:100%;
    padding:20px;
    padding-left:0;
    border-radius:10px;
    margin:0 0 40px 0;
    display: flex;
    flex-direction: row;
    padding-top:50px;
`

const TrackImage = styled.img`
    max-width:${(props) => (props.album ? "50px" : "220px")};
    max-height:${(props) => (props.album ? "50px" : "220px")};
`

const TrackName = styled.h1`
    font-size:48px;
    color:#fff;
    margin:0;
`

const RecommendationsButtonsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
`

const Button = styled.button`
    padding:10px;
    border: none;
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    //font-weight: bold;
    background-color: rgb(10,10,10,0);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
    height:50px;

    :hover{
        background-color: rgb(10,10,10,1);
    }
`

const ContainerAlbumName = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: flex-start;
    margin-left:30px;
`

const ArtistName = styled.p`
    font-size:22px;
    color:#fff;
    margin:0;
`

const Icon = styled.img`
    max-width:20px;
    max-height:20px;
    margin-right:10px;
`

const RecommendationsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content:space-between;
    align-items:center;
`

export {ContainerAlbum, Subtitle, AlbumInfo, ContainerInfo, ContainerImage, ContainerAlbumName, Button, TrackImage, RecommendationsButtonsContainer, TrackName, Container, ArtistName, Icon, Text, TextContainer, RecommendationsContainer}