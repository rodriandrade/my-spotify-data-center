import styled from "styled-components";

const Container = styled.div`
    height:100vh;
    background-size:400%;
    width:94%;
    position:fixed;
    top:0;
    //left:114px;
    z-index:1000;
    overflow: scroll;
    background-color:rgba(0,0,0,0.8);
    backdrop-filter:blur(20px);

    @media (max-width: 480px) {
        width:100%;
        left:0;
    }
    /*
    animation: gradient-movement 5s alternate infinite;

    @keyframes gradient-movement{
        0%{
            background-position: left
        }
        100%{
            background-position: right;
        }
    }
    */
`

const Blur = styled.div`
    width:100%;
    height:100vh;
    
    
    position:fixed;
    top:0;

    @keyframes gradient-movement{
        0%{
            background-position: left
        }
        100%{
            background-position: right;
        }
    }
`

const TrackLyrics = styled.p`
    color:#fff;
    font-size:25px;
    margin:40px 0 160px 0;
    white-space: pre-wrap;

    @media (max-width: 480px) {
        font-size:18px;
    }
`

const TrackTitle = styled.h1`
    color:#47ffbb;
    font-size:48px;
    padding:20px 0 0 0;
    font-weight:600px;

    @media (max-width: 480px) {
        padding:0;
        margin:0;
    }
`

const TrackArtist = styled.p`
    color:rgba(100,100,100,1);
    font-size:22px;
    padding:0;
    margin:0;
    font-weight:200px;

    @media (max-width: 480px) {
        padding:0;
        margin:0;
        font-size:20px;
    }
`

const TrackName = styled.h1`
    color:#47ffbb;
    font-size:48px;
    padding:20px 0 0 0;
    margin:20px 0 0 0;
    font-weight:600px;

    @media (max-width: 480px) {
        padding:0;
        margin:0;
        font-size:24px;
    }
`

const CloseButton = styled.img`
    cursor: pointer;
    width:20px;
    color: #fff;
    position:absolute;
    top:30px;
    right:80px;

    @media (max-width: 480px) {
        top:0;
        left:90%;
        position:relative;
        //padding:20px 0px;
        align-self:flex-end;
        width:20px;
        padding:20px;
    }
`

const LoadingContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    height:400px;
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

    @media (max-width: 480px) {
        text-align:center;
    }
`

export {Container, TrackLyrics, CloseButton, Blur, TrackTitle, TrackArtist, TrackName, LoadingContainer, LoadingImage, LoadingText}