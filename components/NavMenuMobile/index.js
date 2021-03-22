import {Container, List, Menu, Logo, MenuContainer, ContainerSocial, IconSocial} from './styled'
import BurgerMenu from '../BurgerMenu'
import React, {useState} from 'react'
import Link from 'next/link'

const NavMenuMobile = ({open, setOpen, access_token, refresh_token}) => {

    /*
    const access_token = props.access_token;
    const refresh_token = props.refresh_token;
    */

    return(
        <div>
            <Container open={open}>
                <MenuContainer>
                <div>
                    {/*<Logo src="" alt="gabriel-piantanida-logo"/>*/}
                </div>
                <nav>
                    <Menu>
                        <List onClick={() => setOpen(!open)}>
                            <Link href={{pathname: `/`, query: { access_token: access_token, refresh_token: refresh_token }}}>
                                <a href="#home_section">Home</a>
                            </Link>
                        </List>
                        <List onClick={() => setOpen(!open)}><a href="#artists_section">Artists</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#tracks_section">Tracks</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#albums_section">Albums</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#genres_section">Genres</a></List>
                        <List onClick={() => setOpen(!open)}><a href="#recommendations_section">Recommendations</a></List>
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