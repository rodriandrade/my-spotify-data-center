import styled from 'styled-components'

const ContainerHero = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    @media (max-width: 480px) {
       width:100%;
       margin:0;
       justify-content:center;
        align-items:center;
    }
`

const MainButton = styled.button`
    padding:10px;
    border: none;
    color: #fff;
    font-family: Poppins;
    font-size: 14px;
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

export {MainButton, ContainerHero}