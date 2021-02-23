import styled from 'styled-components'

const ContainerInfo = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: flex-start;
    margin-left:30px;
`

const ContainerImage = styled.div`
    display: flex; 
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
`

const Container = styled.div`
    width:100%;
    padding:20px;
    padding-left:0;
    border-radius:10px;
    margin:40px 0;
    display: flex;
    flex-direction: row;
`

const ArtistImage = styled.img`
    max-width:220px;
    max-height:220px;
    border-radius:220px;
`

const ArtistName = styled.h1`
    font-size:48px;
    color:#fff;
    margin:0;
`

const GenresContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
`

const ArtistGenres = styled.p`
    font-size:16px;
    color:rgb(200,200,200);
    margin:5px 10px 5px 0;
    background-color: rgba(15,15,15);
    border-radius:10px;
    padding:10px;
`

const Button = styled.button`
    padding:10px 50px;
    border: none;
    color: #47ffbb;
    font-family: Poppins;
    font-size: 16px;
    //font-weight: bold;
    background-color: rgb(10,10,10,0.0);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
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
`

const Position = styled.h1`
    font-size:72px;
    color:#47ffbb; 
    margin:0;
    font-weight:lighter;
`

const ArtistInfo = styled.p`
    font-size:16px;
    color:#fff; 
    margin:0;
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

export {ContainerInfo, ContainerImage, Container, ArtistImage, ArtistName, ArtistGenres, Position, ArtistInfo, ArtistInfoCont, Button, GenresContainer, NoDataContainer, NoDataInfo, NoDataTitle}