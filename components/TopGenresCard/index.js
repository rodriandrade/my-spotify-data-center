import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Grid, Col} from '../Grid'
import {GenreTitle, GenrePosition, Container} from './styled'
//import {TrackImage, TrackName, TrackPosition, ArtistName, PlayOnSpotify, ImageContainer, ContainerTrack, TextContainer, Text} from './styled'

const TopGenresCard = props =>{

    const {genre} = props;

    const position = props.index + 1;
    //console.log(props.genre)
    if(genre.includes("espanol")){
        let findIndex = genre.lastIndexOf("n");
        let getCharacter = genre.replace(genre.charAt(12), "ñ")
    }
    if(genre.includes("electronica")){
        let getCharacter = genre.replace(genre.charAt(6), "ó")
        //genre = getCharacter;
        //return genre
    }

    /*<Container>
                    <GenrePosition>{position}</GenrePosition>
                    <GenreTitle>{props.genre}</GenreTitle>
    </Container>               */

     return(
        <Col desktop={props.gridSize} tablet={4} mobile={6}>
            <Container>
                <GenrePosition>{position}</GenrePosition>
                <GenreTitle>{genre.charAt(0).toUpperCase() + genre.slice(1)}</GenreTitle>
            </Container>
        </Col>
    )
}

export default TopGenresCard