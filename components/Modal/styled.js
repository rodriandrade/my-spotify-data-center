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
    text-align:center;
    font-size:16px;
    display:block;
    color:#fff;
    margin:30px 0;

    @media (max-width: 480px) {
        
    }
`

const InfoTitle = styled.h3`
    text-align:center;
    font-size:20px;
    color:#47ffbb;
    margin:0;

    @media (max-width: 480px) {
        
    }
`

const CloseButton = styled.img`
    cursor: pointer;
    width:30px;
    color: #fff;
    position:absolute;
    top:18%;
    right:32%;

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
    width: 240px;
    background-color: #47ffbb;
    color: black;
    border: none;
`

export { Container, CloseButton, InfoContainer, InfoText, InfoTitle, Button }