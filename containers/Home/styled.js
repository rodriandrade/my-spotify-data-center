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
`

const ContainerHero = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Text = styled.p`
    font-size:16px;
    font-family: 'Poppins', sans-serif;
    text-align:left;
    color:#fff;
    margin:0px 0;
    margin-bottom:30px;
`

const MostListened = styled.span`
    font-size:16px;
    font-family: 'Poppins', sans-serif;
    text-align:left;
    color:#47ffbb;
    margin:0px 0;
    margin-bottom:30px;
`

const Button = styled.button`
    padding:10px 50px;
    border: none;
    color: ${(props) => (props.activeButton ? "#47ffbb" : "rgb(100,100,100)")};
    font-family: Poppins;
    font-size: 16px;
    font-weight: bold;
    background-color: rgb(10,10,10,0.0);
    border-radius:5px;
    margin:0px;
    cursor: pointer;
    border-bottom:${(props) => (props.selected ? "1px solid #47ffbb" : "1px solid rgb(20,20,20)")};
    width:250px;
`

export {TitleTest, Text, ContainerLeftColumn, ContainerHero, Button, MostListened}