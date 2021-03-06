import styled from 'styled-components'

const ContainerInfo = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: flex-start;
    margin-left:30px;

    @media (max-width: 480px) {
        align-items:center;
        margin:0;
        margin-top:20px;
    }
`

const ContainerImage = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    position:relative;
    min-width: 200px;
    min-height: 200px;
    overflow: hidden;
    border-radius:100%;
`

const Container = styled.div`
    width:100%;
    padding:20px;
    padding-left:0;
    border-radius:10px;
    margin:20px 0 40px 0;
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
        margin:80px 0 40px 0;
    }

    @media (max-width: 480px) {
        flex-direction:column;
        align-items:center;
        margin:80px 0 40px 0;
    }
`

const ArtistImage = styled.img`
    //min-height: 200px;
    //min-width:200px;
    height:100%;
    border-radius:200px;
    position: relative;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 480px) {
    }
`

const ArtistName = styled.h1`
    font-size:42px;
    color:#fff;
    margin:0;
    position: relative;

    @media (max-width: 480px) {
        font-size:36px;
    }
`

const GenresContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
`

const ArtistGenres = styled.p`
    font-size:14px;
    color:rgb(200,200,200);
    margin:5px 10px 5px 0;
    background-color: rgba(15,15,15);
    border-radius:10px;
    padding:10px;
    position: relative;

    @media (max-width: 480px) {
        font-size:16px;
    }
`

const Button = styled.button`
    padding:10px 50px;
    border: none;
    color: #fff;
    font-family: Poppins;
    font-size: 14px;
    //font-weight: bold;
    background-color: rgb(10,10,10,0.0);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
    position: relative;

    :hover{ 
        background-color: rgb(10,10,10,0.5);
    }
`

const TypeName = styled.p`
    font-size: 14px;
    color: rgb(100,100,100);
    font-weight: 600;
    letter-spacing: 3px;
    text-transform:uppercase;
    position:relative;
    margin:0;
`

/////////////////////////////////////////////////////

const ArtistInfoCont = styled.div`
    display:flex;
    //background-color:rgba(20,20,20, 0.5);
    flex-direction:column;
    width:300px;
    border-radius:10px;
    //border-bottom:6px solid #47ffbb;
    //padding:20px;
    position: relative;

    @media (max-width: 768px) {
        width:210px;
    }

    @media (max-width: 480px) {
        width:300px;
    }
`

const Position = styled.h1`
    font-size:64px;
    color:#47ffbb; 
    margin:0;
    font-weight:lighter;
    position: relative;

    @media (max-width: 768px) {
        font-size:48px;
    }

    @media (max-width: 480px) {
        font-size:48px;
    }
`

const ArtistInfo = styled.p`
    font-size:14px;
    color:#fff; 
    margin:0;
    position: relative;

    @media (max-width: 480px) {
        font-size:16px;
    }
`

const NoDataTitle = styled.h1`
    font-size:64px;
    color:rgba(100,100,100,1);
    margin:0;
    position: relative;

    @media (max-width: 480px) {
        font-size:48px;
    }
`

const NoDataContainer = styled.div`
    display:flex;
    //background-color:rgba(20,20,20, 0.5);
    flex-direction:column;
    position: relative;
    //border-radius:10px;
    //padding:20px;
`

const NoDataInfo = styled.p`
    font-size:14px;
    color:rgba(100,100,100,1);
    margin:0;
    position: relative;
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

const SuperContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
`

const MasterContainer = styled.div`
    width:94%;
    display:flex;
    justify-content:center;
    flex-direction:column;

    @media (max-width: 1400px) {
        width:92%;
    }

    @media (max-width: 768px) {
        width:100%;
    }

    @media (max-width: 480px) {
        width:100%;
    }
`

const NavContainer = styled.div`
    width:6%;
    height:100vh;
    position:relative;

    @media (max-width: 1400px) {
        width:8%;
    }

    @media (max-width: 768px) {
        display:none;
    }

    @media (max-width: 480px) {
        display:none;
    }
`

export {ContainerInfo, ContainerImage, Container, ArtistImage, ArtistName, ArtistGenres, Position, ArtistInfo, ArtistInfoCont, Button, GenresContainer, NoDataContainer, NoDataInfo, NoDataTitle, LoadingImage, LoadingText, LoadingContainer, LoadingContainerSection, MasterContainer, SuperContainer, NavContainer, TypeName}