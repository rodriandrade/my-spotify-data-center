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

const ArtistGenres = styled.p`
    font-size:16px;
    color:rgb(200,200,200);
    margin:0;
`

export {ContainerInfo, ContainerImage, Container, ArtistImage, ArtistName, ArtistGenres}