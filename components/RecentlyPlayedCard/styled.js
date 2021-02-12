import styled from 'styled-components'

const ContainerInfo = styled.div`
/*
    display: flex; 
    flex-direction: column; 
    justify-content: flex-start; 
    align-items: flex-start;
    margin-left:20px;
    */
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-left:30px;
`

const ContainerImage = styled.div`
/*
    display: flex; 
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    */
`

const Container = styled.div`
/*
    background-color: rgb(12,12,12);
    width:320px;
    padding:20px;
    border-radius:10px;
    margin:0px 0;
    display: flex;
    flex-direction: row;
    */
    display:flex;
    flex-direction:row;
    align-items:center;
    border-bottom:1px solid rgb(20,20,20);
    padding-bottom:10px;
    margin:0;
`

const AlbumImage = styled.img`
/*
    max-height:70px;
    max-width: 70px;
    */
    width:50px;
`

const TrackName = styled.h4`
    font-size:16px;
    color: #fff;
`

const ArtistName = styled.p`
    font-size:14px;
    color: #47ffbb;
    margin-left:30px;
`

const TimePlayed = styled.p`
    font-size:14px;
    color: grey;
    margin-left:30px;
`

export { Container, TrackName, ArtistName, TimePlayed, AlbumImage, ContainerInfo, ContainerImage }