import {Container, List, Menu, Logo, MenuContainer, ContainerSocial, IconSocial} from './styled'
import BurgerMenu from '../BurgerMenu'
import React, {useState} from 'react'

const NavMenuMobile = ({open, setOpen}) => {

    return(
        <div>
            <Container open={open}>
                <MenuContainer>
                <div>
                    <Logo src="" alt="gabriel-piantanida-logo"/>
                </div>
                <nav>
                    <Menu>
                        <List onClick={() => setOpen(!open)}><a href="#home_section">Home</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#sobre_mi_section">Artists</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#relatos_section">Tracks</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#multimedia_section">Albums</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#multimedia_section">Genres</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#multimedia_section">Recommendations</a></List>
                    </Menu>
                </nav>
                    <ContainerSocial>
                        
                    </ContainerSocial>
                </MenuContainer>
            </Container>
        </div>
        
    )
}

export default NavMenuMobile