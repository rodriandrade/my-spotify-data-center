import styled from 'styled-components'

const ContainerLeftColumn = styled.div`
    position:sticky;
    top:20px;
    width:100%;

    &.isSticky{
        margin:20px 0 20px 0;
        padding:20px 0 20px 0;
    &::before{
        content:'${props => props.sectionTitle}';
        display:block;
        top:0;
        font-size:40px;
        font-weight:bold;
        margin-bottom:15px;
        transition: .2s ease-out;
    }
  }
`

const Text = styled.p`
    font-size:16px;
    font-family: 'Poppins', sans-serif;
    text-align:left;
    color:#fff;
    margin:${(props) => (props.margin ? props.margin : "0 0 0 0")};
    margin-bottom:30px;
`

const Button = styled.div`
    padding:10px ;
    border: none;
    color: ${(props) => (props.activeButton ? "#47ffbb" : "rgb(100,100,100)")};
    font-family: Poppins;
    font-size: 16px;
    font-weight: bold;
    background-color: rgb(10,10,10,0.0);
    border-radius:5px;
    cursor: pointer;
    border-bottom:${(props) => (props.selected ? "1px solid #47ffbb" : "1px solid rgb(20,20,20)")};
    width:100%;
    text-align:center;

    :hover{
        background-color: rgb(10,10,10,0.5);   
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
    background-color: rgb(10,10,10,0.0);
    border-radius:5px;
    margin-top:10px;
    cursor: pointer;
    border:1px solid #47ffbb;
    height:50px;
    margin-left:0;
    width:100%;

    :hover{
        background-color: rgb(10,10,10,0.5)   
    }
`

const ContainerButtons = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

export { ContainerLeftColumn, MostListened, Text, Button, MainButton, ContainerButtons }