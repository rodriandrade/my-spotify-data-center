import styled from 'styled-components'

const TextContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 220px;
    width: 220px;
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
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: flex-start;
    margin-left:30px;
`

const RecommendationsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content:space-between;
    align-items:center;
`

const RecommendationsButtonsContainer = styled.div`
    display: flex; 
    flex-direction: row; 
`

const ContainerImage = styled.div`
    width:220px;  
    height:220px;
    position: relative;
    
    &:hover ${TextContainer} {
        opacity: 1;
    }
`

const Container = styled.div`
    width:100%;
    padding:20px;
    padding-left:0;
    border-radius:10px;
    margin:0px 0 40px 0;
    display: flex;
    flex-direction: row;
    padding-top:50px;
`

const TrackImage = styled.img`
    max-width:${(props) => (props.album ? "50px" : "220px")};
    max-height:${(props) => (props.album ? "50px" : "220px")};
`

const Icon = styled.img`
    max-width:20px;
    max-height:20px;
    margin-right:10px;
`

const TrackName = styled.h1`
    font-size:48px;
    color:#fff;
    margin:0;
`

const ArtistName = styled.p`
    font-size:22px;
    color:#fff;
    margin:0;
`

const TrackGenres = styled.p`
    font-size:16px;
    color:rgb(200,200,200);
    margin:0;
`

const Button = styled.button`
    padding:10px;
    border: none;
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    //font-weight: bold;
    background-color: rgb(10,10,10,0.0);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
    height:50px;
    margin-left:${(props) => (props.margin ? "0px" : "20px")};
`

const Position = styled.h1`
    font-size:72px;
    color:#47ffbb; 
    margin:0;
    font-weight:lighter;
`

const TrackInfoCont = styled.div`
    display:flex;
    //background-color:rgba(20,20,20, 0.5);
    flex-direction:column;
    width:300px;
    border-radius:10px;
    //border-bottom:6px solid #47ffbb;
    //padding:20px;
`

const TrackInfo = styled.p`
    font-size:16px;
    color:#fff; 
    margin:0;
`

const ContainerAlbum = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    background-color: rgba(15,15,15,0.6);
    border-radius:10px;
    padding:10px;
    margin-top:15px;
    width:80%;
    cursor:pointer;
    border-bottom:3px solid #47ffbb;

    :hover{
        opacity:0.7;
    }
`

const ContainerAlbumImage = styled.div`
`

const ContainerAlbumInfo = styled.div`
    margin-left:20px;
`   

const NoDataTitle = styled.h1`
    font-size:72px;
    color:rgba(100,100,100,1);
    margin:0;
`

const NoDataContainer = styled.div`
    display:flex;
    //background-color:rgba(20,20,20, 0.5);
    flex-direction:column;
    //border-radius:10px;
    //padding:20px;
`

const NoDataInfo = styled.p`
    font-size:16px;
    color:rgba(100,100,100,1);
    margin:0;
`

export {ContainerInfo, ContainerImage, Container, TrackImage, TrackName, TrackGenres, ArtistName, RecommendationsContainer, Button, RecommendationsButtonsContainer, Icon, Position, TrackInfo, TrackInfoCont, ContainerAlbum, ContainerAlbumImage, ContainerAlbumInfo, Text, TextContainer, NoDataContainer, NoDataInfo, NoDataTitle}