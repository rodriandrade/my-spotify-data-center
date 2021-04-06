import styled from 'styled-components'

const TitleTest = styled.h1`
    font-size:36px;
    font-family: 'Poppins', sans-serif; 
    color: #fff;
    margin:80px 0;
    text-align:center;
`

const ContainerLeftColumn = styled.div`
    position:sticky;
    top:20px;

/*
    ::before{
        content:"Tracks";
        display:block;
        top:0;
        font-size:40px;
        font-weight:bold;
        margin-bottom:15px;
    }
    */
`

const ContainerHero = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    a{
        margin:0;
        padding:0;
        margin:0 auto;
    }
`

const Text = styled.p`
    font-size:16px;
    position:relative;
    font-family: 'Poppins', sans-serif;
    text-align:left;
    color:#fff;
    margin:${(props) => (props.margin ? props.margin : "0 0 0 0")};
    margin-bottom:30px;

    @media (max-width: 480px) {
        font-size:14px;
    }
`

const MostListened = styled.span`
    font-size:16px;
    font-family: 'Poppins', sans-serif;
    text-align:left;
    color:#47ffbb;
    margin:0px 0;
    margin-bottom:30px;
`

const MainButton = styled.button`
    padding:10px;
    border: none;
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    //font-weight: bold;
    background-color: rgb(10,10,10,1);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
    height:50px;
    margin-left:0;
    position: relative;
`

const Button = styled.button`
    padding:10px 50px;
    border: none;
    color: ${(props) => (props.activeButton ? "#47ffbb" : "rgb(100,100,100)")};
    font-family: Poppins;
    font-size: 16px;
    font-weight: bold;
    background-color: ${(props) => (props.activeButton ? "rgba(66, 133, 108, 0.1)" : "rgb(10,10,10,0.0)")};
    border-radius:5px;
    margin:0px;
    cursor: pointer;
    border-bottom:${(props) => (props.selected ? "1px solid #47ffbb" : "1px solid rgb(20,20,20)")};
    width:250px;
    position: relative;
`

const RefreshIcon = styled.img`
    width:30px;
    height:30px;
    text-align:right;
`

const IconContainer = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    margin: 280px 0 20px 0;
`

const LoadingContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    height:100vh;
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

const LoadingContainerSection = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

const MasterContainer = styled.div`
    width:94%;
    display:flex;
    justify-content:center;
    flex-direction:column;

    @media (max-width: 1400px) {
        width:92%;
    }

    @media (max-width: 480px) {
        width:100%;
    }

    /*
    @media (max-width: 1440px) {
        width:92%;
    }
    */
`

const SuperContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
`

const NavContainer = styled.div`
    width:6%;
    height:100vh;
    position:relative;

    @media (max-width: 1400px) {
        width:8%;
    }

    @media (max-width: 480px) {
        display:none;
    }

    /*
    @media (max-width: 1440px) {
        width:8%;
    }
    */
`

const WelcomeContainer = styled.div`
    display:flex;
    flex-direction:column;
`

const ScrollDown = styled.div`
    position:absolute;
    bottom:100px;
    animation: blink-cont 1s ;
    transition:1s;
    margin:0 auto;
    background-color:rgba(0,0,0,0);

    span{
        display: block;
        width: 30px;
        height: 30px;
        border-bottom: 5px solid #fff;
        border-right: 5px solid #fff;
        transform: rotate(45deg);
        margin: -10px;
        animation: animate 2s infinite;
    }

    span:nth-child(2){
        animation-delay: -0.2s;
    }
    span:nth-child(3){
        animation-delay: -0.4s;
    }

    @keyframes animate {
        0%{
            opacity: 0;
            transform: rotate(45deg) translate(-20px,-20px);
        }
        50%{
            opacity: 1;
        }
        100%{
            opacity: 0;
            transform: rotate(45deg) translate(20px,20px);
        }
    }

    @media (max-width: 480px) {
        width: 20px;
        height: 20px;
    }
`

export {TitleTest, Text, ContainerLeftColumn, ContainerHero, Button, MostListened, RefreshIcon, IconContainer, MainButton, LoadingImage, LoadingText, LoadingContainer, LoadingContainerSection, MasterContainer, SuperContainer, NavContainer, WelcomeContainer, ScrollDown}