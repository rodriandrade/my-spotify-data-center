import styled from 'styled-components'

const Container = styled.div`
    background-color: rgb(10,10,10);
    width:400px;
    padding:30px;
    border-radius:10px;
    margin:10px;
`

const ArtistImage = styled.img`
    max-height:200px;
    max-width: 200px;
    border-radius:200px;

    :hover{
        opacity:0.6;
    }
`

const ArtistPosition = styled.p`
    font-size:32px;
    color: #fff;
    margin:0;
    text-align: center;

    ::after{
        content: "";
        display: block;
        width: 2px;
        height: 2px;
        margin:5px auto;
        background: white;
        border-radius: 5px;
    }
`

const ArtistName = styled.p`
    font-size:16px;
    color: #47ffbb;
    margin:10px;
    text-align: center;
    cursor: pointer;

    :hover{
        text-decoration: underline 3px solid;
    }
`

const TimePlayed = styled.p`
    font-size:12px;
    color: grey;
    margin:0;
`

export { Container, ArtistName, TimePlayed, ArtistImage, ArtistPosition}