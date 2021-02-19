import styled from 'styled-components'

const ContainerArtist = styled.div`
    position:relative;
`

const Overlay = styled.div`
    max-height: 200px;
    max-width: 200px;
    //background-color:blue;
    position:absolute;
    z-index:200;
`

const ArtistImage = styled.img`
   // max-height: ${props => props.imageSizeLarge ? "430px" : "200px"};
   // max-width: ${props => props.imageSizeLarge ? "430px" : "200px"};
   // border-radius:${props => props.imageSizeLarge ? "430px" : "200px"};
   min-height: 200px;
   min-width:200px;
   z-index:1;
   border-radius:200px;

    :hover{
        opacity:0.6;
    }
`

const ArtistPosition = styled.p`
    font-size:60px;
    //font-size:30px;
    color: #fff;
    margin:0;
    text-align: center;
    font-weight:bold;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, 25%);
    text-shadow: 0px 0px 11px rgba(0, 0, 0, 1);

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
    //color: #47ffbb;
    color: #fff;
    margin-top:40px;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;

    :hover{
        text-decoration: underline 3px solid #47ffbb;
    }
`

const TimePlayed = styled.p`
    font-size:12px;
    color: grey;
    margin:0;
`

const ImageContainer = styled.div`
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius:200px;
    //background-color:yellow;
`

export { ContainerArtist, ArtistName, TimePlayed, ArtistImage, ArtistPosition, Overlay, ImageContainer}