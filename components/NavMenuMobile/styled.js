import styled from 'styled-components'

const Container = styled.div`
    display:none;
    
    @media (max-width: 480px) {
        display: flex;
        align-items: center;
        width:100%;
        background-color: #fff;
        height:100vh;
        position:fixed;
        top:0;
        flex-direction: column;
        justify-content: center;
        transition: transform 0.3s ease-in-out;
        transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
        z-index:3;
    }
`

const List = styled.li`
    display: inline-block;

    a{
        padding:0 10px;
        text-decoration: none;
        color: rgb(12, 12, 12)
    }
    
    a:hover{
        text-decoration: underline 1px solid black;
    }


    @media (max-width: 480px) {
        display:block;
        text-align:center;
        padding:20px 0;
        border-bottom: 1px solid rgb(240, 240, 240);
        font-size:24px;

        :last-child{
            border-bottom: none
        }
    }

`


const MenuContainer = styled.div`

    @media (max-width: 480px) {
        height:70vh;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
    }
    
`

const Menu = styled.ul`

    @media (max-width: 480px) {
        padding:0;
    }
    
`

const Logo = styled.img`
    width:250px;

    @media (max-width: 480px) {
        width:200px;

    }
`

const ContainerSocial = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:120px;

    @media (max-width: 480px) {
        margin:15px auto;
    }
`

const IconSocial = styled.img`
    width:26px;
`


export {Container, List, Menu, Logo, MenuContainer, ContainerSocial, IconSocial}