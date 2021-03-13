import styled from 'styled-components'

const InfoContainer = styled.div`
    background-color: rgb(10,10,10);
    width:500px;
    padding:40px;
    border-radius:5px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-bottom:10px solid #47ffbb;

    @media (max-width: 480px) {
        max-width:80%;
        display:flex;
        flex-direction:column;
    }
`

const InfoText = styled.p`
    text-align:${(props) => (props.align ? "left" : "center")};
    font-size:16px;
    color:#fff;
    margin:30px 0;

    @media (max-width: 480px) {
        
    }
`

const InfoTitle = styled.h3`
    text-align:${(props) => (props.align ? props.align : "center")};
    font-size:20px;
    color:${(props) => (props.color ? "#fff" : "#47ffbb")};
    margin:${(props) => (props.margin ? "20px 0 10px 0" : "0")};

    @media (max-width: 480px) {
        
    }
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

const Container = styled.div`
    position:fixed;
    background-color: rgba(0,0,0,0.9);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    z-index:100000000000000000000000000000000000000000000000000000000000000000000;
`

const Button = styled.button`
    width: ${(props) => (props.size ? "120px" : "150px")};
    background-color: ${(props) => (props.look ? "rgb(10,10,10,1)" : "#47ffbb")};
    border-radius: 3px;
    color: ${(props) => (props.look ? "#47ffbb" : "rgb(10,10,10,1)")};
    border: none;
    padding:10px;
    font-size:16px;
    cursor:pointer;
    font-weight:600;
    font-family: Poppins;

    :hover{
        opacity:0.7;
    }

    :disabled {
        background: #dddddd;

        :hover{
            opacity:1;
        }
    }  
`

const MainButton = styled.button`
    padding:10px;
    border: none;
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    //font-weight: bold;
    background-color: rgb(10,10,10,0.0);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
    height:50px;
    margin-left:0;
    width:100%;

    :hover{
        background-color: rgb(20,20,20,0.5)   
    }
`

/// Data image ///

const GeneralContainer = styled.div`
    display:flex;
    flex-direction:row;
    width:1300px;
    background-color:rgba(10,10,10,1);
`

const DataImageContainer = styled.div`
    display:flex;
    flex-direction:row;
    width:90%;
    margin:0 auto;
`

const DataTitleContainer = styled.div`
    display:flex;
    flex-direction:column;
    background-image:url(/background.png);
    width: 1000px;
`

const DataImageTitle = styled.h1`
    font-size:36px;
    color: #fff;
    text-align:center;
`

const MainArtistContainer = styled.div`
    width: 33%;
    background-color: rgb(15,15,15,0.8);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:50px;
    position:relative;
`

const MainArtistImageContainer = styled.div`
    position: relative;
`

const MainArtistImage = styled.img`
    max-width: 250px;
    border-radius:${(props) => (props.track ? "0" : "300px")};
`

const MainArtistName = styled.h2`
    font-size:${(props) => (props.track ? "20px" : "26px")};
    color: ${(props) => (props.track ? "rgba(100,100,100,1)" : "#fff")};
    margin:0;
    margin-top:${(props) => (props.track ? "5px" : "40px")};
    text-align:center;
    font-weight:${(props) => (props.track ? "400" : "bold")};
`

const MainArtistPosition = styled.h2`
    font-size:84px;
    color: #fff;
    margin:0;
    text-shadow: 0px 0px 11px rgba(0, 0, 0, 1);
    position:absolute;
    top:${(props) => (props.genre ? "0%" : "67%")};
    left:50%;
    transform: ${(props) => (props.genre ? "translate(-50%, 0%)" : "translate(-50%, 10%)")};
    
`

const OtherArtistsContainer = styled.div`
    width: 66%;
    display:flex;
`

const ArtistCard = styled.div`
    display:flex;
    flex-direction:column;
    background-color:rgb(17,17,17,0.8);
    width:100%;
    justify-content:center;
`

const ArtistCardContainer = styled.div`
    border-bottom:1px solid rgb(23, 23, 23, 1);
    display:flex;
    flex-direction:row;
    align-items:center;
    padding:20px;

    :last-child {
        border-bottom:none;
    }
`

const ArtistCardImageContainer = styled.div`
    max-height:70px;
    max-width:70px;
    //overflow:hidden;
    border-radius:${(props) => (props.track ? "0" : "70px")};
    margin:0 20px;
`

const ArtistCardImage = styled.img`
    max-height: 70px;
    max-width:70px;
    border-radius:${(props) => (props.track ? "0" : "70px")};
`

const ArtistCardName = styled.h2`
    font-size:${(props) => (props.track ? "16px" : "20px")};
    color: ${(props) => (props.track ? "rgba(100,100,100,1)" : "#fff")};
    margin:0;
    font-weight:400;
`

const ArtistCardPosition = styled.h2`
    font-size:32px;
    color: #fff;
    margin:0;
    margin-left:20px;
`

const DataImageFooterText = styled.p`
    font-size:16px;
    color: #fff;
    text-align:center;
`

const MenuContainer = styled.div`
    width: 80%;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:0 auto;
`

const ButtonsContainer = styled.div`
    margin:0 auto;
`

const ArtistCardNameContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const Tweet = styled.textarea`
    width:92%;
    height:300px;
    color: #fff;
    font-family: Poppins;
    font-size:16px;
    background-color: rgb(20,20,20,1);
    border:none;
    border-bottom:1px solid #47ffbb;
    resize:none;
    padding:10px;
` 

const Counter = styled.span`
    font-size:14px;
    color: #fff;
    padding:5px;
`

const TweetContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    align-items:flex-end;
    margin-bottom:20px;
`

const BtnContainer = styled.div`
    display:flex;
    flex-direction:row;
`


// TWEET MENU

export {Container, CloseButton, InfoContainer, InfoText, InfoTitle, Button, MainButton, DataImageContainer, DataImageTitle, MainArtistContainer, MainArtistImage, MainArtistName, MainArtistPosition, OtherArtistsContainer, DataTitleContainer, ArtistCardContainer, ArtistCardImage, ArtistCardName, ArtistCardPosition, ArtistCard, DataImageFooterText, GeneralContainer, MenuContainer, ArtistCardImageContainer, ButtonsContainer, MainArtistImageContainer, ArtistCardNameContainer, Tweet, Counter, TweetContainer, BtnContainer}