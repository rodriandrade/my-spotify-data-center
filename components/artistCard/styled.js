import styled from 'styled-components'

const ContainerArtist = styled.div`
    position:relative;
`

const ArtistImage = styled.img`
   // max-height: ${props => props.imageSizeLarge ? "430px" : "200px"};
   // max-width: ${props => props.imageSizeLarge ? "430px" : "200px"};
   // border-radius:${props => props.imageSizeLarge ? "430px" : "200px"};
    max-height: 200px;
   max-width: 200px;
   z-index:1;
   //border-radius:200px;

    :hover{
        opacity:0.6;
    }
`

const ArtistPosition = styled.p`
    font-size:30px;
    color: #fff;
    margin:0;
    text-align: center;

/*
    ::after{
        content: "";
        display: block;
        width: 2px;
        height: 2px;
        margin:5px auto;
        background: white;
        border-radius: 5px;
    }
    */
`

const ArtistName = styled.p`
    font-size:16px;
    color: #47ffbb;
    margin:0px;
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

export { ContainerArtist, ArtistName, TimePlayed, ArtistImage, ArtistPosition}