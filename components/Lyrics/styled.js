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

    @media (max-width: 768px) {
        width:100%;
        left:0;
        z-index:3002;
        overflow-x:hidden;
        height:100%;
    }

    @media (max-width: 480px) {
        width:100%;
        left:0;
        z-index:3002;
        overflow-x:hidden;
        height:100%;
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
    //padding:20px 0 0 0;
    margin:20px 0 0 0;
    font-weight:600px;

    @media (max-width: 480px) {
        padding:20px 0 0 0;
        margin:0;
        font-size:36px;
        line-height:1.5;
        width:90%;
    }
`

const CloseButton = styled.img`
    cursor: pointer;
    width:25px;
    color: #fff;
    padding-top:0px;
    position:relative;
    top:40px;

    @media (max-width: 480px) {
        position:relative;
        //padding:20px 0px;
        align-self:flex-start;
        width:25px;
        padding:0 0;
        top:35px;
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

const IconContainer = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    align-items:flex-start;
`

export {Container, TrackLyrics, CloseButton, Blur, TrackTitle, TrackArtist, TrackName, LoadingContainer, LoadingImage, LoadingText, IconContainer}