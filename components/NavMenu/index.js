import {Container, List, Menu, Logo, CenterContainer} from './styled'
import BurgerMenu from '../BurgerMenu'
import React, {useState} from 'react'
import NavMenuMobile from '../NavMenuMobile'
import Inner from '../Inner'
import Link from 'next/link'

const NavMenu = props => {

    const [open, setOpen] = useState(false)
    /*
    <Container>
                <div>
                    <h2>Gabriel Piantanida</h2>
                </div>
                <nav>
                    <ul>
                        <List><a href="">Home</a></List>
                        <List><a href="#servicios_section">Sobre mi</a></List>
                        <List><a href="#relatos_section">Relatos</a></List>
                        <List><a href="#multimedia_section">Contenido Multimedia</a></List>
                    </ul>
                </nav>
            </Container>
    */

    return(
        <div>
            <header>
                <BurgerMenu open={open} setOpen={setOpen}/>
                <NavMenuMobile open={open} setOpen={setOpen} />
                <Container>
                    <CenterContainer>
                        <div>
                            <a href="#home_section">My Spotify Data Center</a>
                        </div>
                        <nav>
                            <Menu>

                                <List>
                                    <Link href={
                                        {pathname: `/#access_token=${props.token}&refresh_token=${props.refreshToken}`, 
                                        query: { token: props.token, refreshToken: props.refreshToken }, }
                                        }>
                                        <a href="#home_section">Home</a>
                                    </Link>
                                </List>


                                <List><a href="#artists_section">Artists</a></List>
                                <List><a href="#tracks_section">Tracks</a></List>
                                <List><a href="#albums_section">Albums</a></List>
                                <List><a href="#genres_section">Genres</a></List>
                                <List><a href="#recently-played_section">Listening History</a></List>
                                <List><a href="#recommendations_section">Recommendations</a></List>
                            </Menu>
                        </nav>
                    </CenterContainer>
                </Container>
            </header>
        </div>
        
    )
}

export default NavMenu