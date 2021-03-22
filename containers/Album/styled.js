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
    font-size:18px;
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
    font-size:12px;
    color: rgb(100,100,100);
    margin:0;

    @media (max-width: 480px) {
        font-size:16px;
    }
    
`

const AlbumInfo = styled.p`
    font-size:16px;
    color:#fff;
    margin:0;

    @media (max-width: 480px) {
        font-size:22px;
    }
`

const ContainerImage = styled.div`
    width:200px;
    height:200px;
    position:relative;

    &:hover ${TextContainer} {
        opacity: 1;
    }

    @media (max-width: 480px) {
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

    @media (max-width: 480px) {
        flex-direction:column;
        align-items:center;
    }
`

const TrackImage = styled.img`
    max-width:${(props) => (props.album ? "45px" : "200px")};
    max-height:${(props) => (props.album ? "45px" : "200px")};

    @media (max-width: 480px) {
    }
`

const TrackName = styled.h1`
    font-size:42px;
    color:#fff;
    margin:0;
    position: relative;

    @media (max-width: 480px) {
        font-size:36px;
    }
`

const RecommendationsButtonsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    position: relative;

    @media (max-width: 480px) {
       flex-direction:column;
       width:100%;
       margin-bottom:0px;
    }
`

const Button = styled.button`
    padding:10px;
    border: none;
    color: #fff;
    font-family: Poppins;
    font-size: 14px;
    //font-weight: bold;
    background-color: rgb(10,10,10,0);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
    height:50px;
    position: relative;

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

    @media (max-width: 480px) {
        margin:0;
        align-items:center;
        margin-top:20px;
        text-align:center;
    }
`

const ArtistName = styled.p`
    font-size:20px;
    color:#fff;
    margin:0;
    position: relative;

    @media (max-width: 480px) {
        font-size:16px;
    }
`

const Icon = styled.img`
    max-width:18px;
    max-height:18px;
    margin-right:10px;
`

const RecommendationsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content:space-between;
    align-items:center;

    @media (max-width: 480px) {
       flex-direction:column;
       width:100%;
    }
`

const LoadingContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    height:100vh;
`

const LoadingImage = styled.img`
    width:150px;
    height:150px;
`

const LoadingText = styled.span`
    font-size:16px;
    font-family: 'Poppins', sans-serif;
    color:#fff;
    margin-top:20px;
`

const LoadingContainerSection = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

const MasterContainer = styled.div`
    width:93%;
    display:flex;
    justify-content:center;
    flex-direction:column;

    @media (max-width: 480px) {
        width:100%;
    }
`

const SuperContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
`

const NavContainer = styled.div`
    width:7%;
    height:100vh;
    position:relative;

    @media (max-width: 480px) {
        display:none;
    }
`

export {ContainerAlbum, Subtitle, AlbumInfo, ContainerInfo, ContainerImage, ContainerAlbumName, Button, TrackImage, RecommendationsButtonsContainer, TrackName, Container, ArtistName, Icon, Text, TextContainer, RecommendationsContainer, LoadingImage, LoadingText, LoadingContainer, LoadingContainerSection, MasterContainer, SuperContainer, NavContainer}