import styled from "styled-components";

const Container = styled.div`
    height:100vh;
    background-size:400%;
    width:93%;
    position:fixed;
    top:0;
    left:104px;
    z-index:1000;
    overflow: scroll;
    background-color:rgba(0,0,0,0.8);
    backdrop-filter:blur(20px);
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
    font-size:30px;
    margin:40px 0 160px 0;
    white-space: pre-wrap;
`

const TrackTitle = styled.h1`
    color:#47ffbb;
    font-size:54px;
    padding:20px 0 0 0;
    font-weight:600px;
`

const TrackArtist = styled.p`
    color:rgba(100,100,100,1);
    font-size:26px;
    padding:0;
    margin:0;
    font-weight:200px;
`

const TrackName = styled.h1`
    color:#47ffbb;
    font-size:54px;
    padding:20px 0 0 0;
    margin:20px 0 0 0;
    font-weight:600px;
`

const CloseButton = styled.img`
    cursor: pointer;
    width:30px;
    color: #fff;
    position:absolute;
    top:30px;
    right:80px;

    @media (max-width: 480px) {
        top:0;
        right:20px;
        position:relative;
        padding:20px 0px;
        align-self:flex-end;
        width:20px;
    }
`

export {Container, TrackLyrics, CloseButton, Blur, TrackTitle, TrackArtist, TrackName}