import {Button, MainButton, Container, CloseButton, InfoContainer, InfoText, InfoTitle, DataImageContainer, DataImageTitle, MainArtistContainer, MainArtistImage, MainArtistName, MainArtistPosition, OtherArtistsContainer, DataTitleContainer, ArtistCardContainer, ArtistCardImage, ArtistCardName, ArtistCardPosition, ArtistCard, DataImageFooterText, GeneralContainer, MenuContainer, ArtistCardImageContainer, ButtonsContainer, MainArtistImageContainer, ArtistCardNameContainer, Tweet, Counter, TweetContainer, BtnContainer, TweetSent} from './styled'
import React, {useRef, useState, useEffect} from 'react'
import ClientOnlyPortal from '../ClientOnlyPortal'
import axios from 'axios'
import domtoimage from "dom-to-image";
import {Grid, Col} from '../../components/Grid/index'

const Modal = props => {

    const [topArtists, setTopArtists] = useState('')
    const [firstArtist, setFirstArtist] = useState('')
    const [term, setTerm] = useState('')

    // Main name (track name, artist name, genre, album name)
    const [mainName, setMainName] = useState('')
    const [topNames, setTopNames] = useState('')

    // Artists Names (tracks, albums)
    const [firstArtistsNames, setFirstArtistsNames] = useState('')
    const [topArtistsNames, setTopArtistsNames] = useState('')

    // Images
    const [topArtistsImages, setTopArtistsImages] = useState('')
    const [firstArtistsImages, setFirstArtistsImages] = useState('')

    // Input
    const [count, setCount] = useState(0)
    const [tweet, setTweet] = useState('')

    const [disabled, setDisabled] = useState(true)
    const [tweetMenu, setTweetMenu] = useState(false)
    const [tweetDone, setTweetDone] = useState(false)
 
    const modalRef = useRef();

    const closeModal = e =>{
        if(modalRef.current === e.target){
            props.setModalIsOpen(false)
        }
    }

    useEffect(() => {
      const getArtists = () =>{
        if(props.data){
            setTweetDone(false)
            const topArtistsFilter = props.data.filter((artist, index) => {
                return index < 5;
            })
            const firstArtistFilter = topArtistsFilter.filter((artist, index) => {
                return index < 1;
            })

            setFirstArtist(firstArtistFilter)
            const topArtistsToShow = topArtistsFilter.shift()
            setTopArtists(topArtistsFilter)

            if(props.type === "artists"){
                setMainName(firstArtistFilter[0].name)
                setFirstArtistsImages(firstArtistFilter[0].images[0].url)
                /*
                const imagesFirstArtist = topArtistsFilter.map(artist =>{
                    return artist.images[0].url
                })
                */
                const namesTopArtists = topArtistsFilter.map(artist =>{
                    return artist.name
                })
                setTopNames(namesTopArtists)

                const imagesTopArtists = topArtistsFilter.map(artist =>{
                    return artist.images[0].url
                })
                
                setTopArtistsImages(imagesTopArtists)
            }

            if(props.type === "tracks"){

                // MAIN NAMES
                setMainName(firstArtistFilter[0].name)
                const namesTopArtists = topArtistsFilter.map(track =>{
                    return track.name
                })
                setTopNames(namesTopArtists)

                // NAMES
                const artistsNames = topArtistsFilter.map(track =>{
                    const boca = track.artists.map(artist =>{
                        return artist.name
                    })
                    return boca
                })
                setTopArtistsNames(artistsNames)
                const topArtistNames = firstArtistFilter.map(track =>{
                    const boca = track.artists.map(artist =>{
                        return artist.name
                    })
                    return boca
                })
                setFirstArtistsNames(topArtistNames)

                // IMAGES
                const imagesFirstArtist = firstArtistFilter.map(artist =>{
                    return artist.album.images[0].url
                })
                setFirstArtistsImages(imagesFirstArtist)
                const imagesTopArtists = topArtistsFilter.map(artist =>{
                    return artist.album.images[0].url
                })
                setTopArtistsImages(imagesTopArtists)
                
            }

            if(props.type === "albums"){

                // MAIN NAMES
                setMainName(firstArtistFilter[0].name)
                const namesTopArtists = topArtistsFilter.map(album =>{
                    return album.name
                })
                setTopNames(namesTopArtists)

                // IMAGES
                const imagesFirstArtist = firstArtistFilter.map(album =>{
                    return album.image
                })
                setFirstArtistsImages(imagesFirstArtist)
                const imagesTopArtists = topArtistsFilter.map(artist =>{
                    return artist.image
                })
                setTopArtistsImages(imagesTopArtists)

                // NAMES
                const artistsNames = topArtistsFilter.map(album =>{
                    return album.artist
                })
                setTopArtistsNames(artistsNames)
                const topArtistNames = firstArtistFilter.map(album =>{
                    return album.artist
                })
                setFirstArtistsNames(topArtistNames)
            }

            if(props.type === "genres"){

                console.log(firstArtistFilter)
                console.log(topArtistsFilter)

                // NAMES
                setMainName(firstArtistFilter[0])
                const namesTopArtists = topArtistsFilter.map(genre =>{
                    return genre
                })
                setTopNames(namesTopArtists)
            }
            
            if(props.term === "short_term"){
                setTerm("past 4 weeks");
            } else if(props.term === "medium_term"){
                setTerm("past 6 months")
            } else if(props.term === "long_term"){
                setTerm("past several years")
            }
        }
      }
      getArtists()
    }, [props.data])

    const handleShare = async () => {

        let node = document.getElementById(`content-to-be-copied`); 
        /*
        const generateImage = await domtoimage.toPng(node);
        console.log(generateImage)
        */
       
        domtoimage
            .toPng(node)
          .then(dataUrl => {
            axios
              .post(
                "/api/hello",
                {
                  dataUrl: dataUrl,
                  tweet: tweet
                }
              )
              .then(res => {
                if(res.status === 200){
                    console.log(res)
                    setTweetDone(true)
                }
              })
              .catch(err => console.log(err, "Error trying to tweet"))
          })
          .catch(err => console.log(err));
          
    };

    const saveImage = () =>{
        domtoimage.toPng(document.getElementById('content-to-be-copied'), { quality: 1 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = `My top ${props.type} ${term}`;
            link.href = dataUrl;
            link.click();
        });
    }

    const charactersCount = (e) =>{
        const target = e.target;
        const maxLength = target.getAttribute('maxLength');
        const currentLength = target.value.length;
        if(currentLength > 0){
            setDisabled(false)
        } else{
            setDisabled(true)
        }
        setTweet(e.target.value)
        setCount(currentLength)
    }

    return(
        <div>
        {props.modalIsOpen ? 
        <ClientOnlyPortal selector="#modal">
            <Container ref={modalRef} onClick={closeModal}>
            {!props.dataImage ?
                <InfoContainer>
                    <CloseButton src="/cancel.svg" onClick={ () => props.setModalIsOpen(!props.modalIsOpen)} />
                    <InfoTitle>{props.title}</InfoTitle>
                    <InfoText>{props.text}</InfoText>
                    {props.buttonText && <Button onClick={ () => props.setModalIsOpen(!props.modalIsOpen)}>{props.buttonText}</Button>}
                </InfoContainer> 
            : 
                <div>
                    <GeneralContainer>
                        <Grid colGap={30} rowGap={40}>
                            <Col desktop={9} tablet={6} mobile={12}>
                                <CloseButton src="/cancel.svg" onClick={ () => props.setModalIsOpen(!props.modalIsOpen)} />
                                <DataTitleContainer id="content-to-be-copied">
                                    {term && <DataImageTitle>My top {props.type} {term}</DataImageTitle>}
                                    <DataImageContainer>
                                        {firstArtist && <MainArtistContainer>
                                            <MainArtistImageContainer>
                                                {props.type === "artists" ?
                                                    <MainArtistImage src={firstArtistsImages}/>
                                                : 
                                                    <MainArtistImage track src={firstArtistsImages}/>
                                                }
                                                {firstArtistsImages ?
                                                    <MainArtistPosition>1</MainArtistPosition>
                                                :
                                                    <MainArtistPosition genre>1</MainArtistPosition>
                                                }
                                            </MainArtistImageContainer>
                                            <ArtistCardNameContainer>
                                                <MainArtistName>{mainName}</MainArtistName>
                                                {firstArtistsNames && <MainArtistName track>{firstArtistsNames.join(', ""')}</MainArtistName>}
                                            </ArtistCardNameContainer>
                                        </MainArtistContainer>}
                                        <OtherArtistsContainer>
                                            <ArtistCard>
                                                {topArtists && 
                                                    topArtists.map((artist, index) => (
                                                        <ArtistCardContainer>
                                                            <ArtistCardPosition>{index + 2}</ArtistCardPosition>
                                                            {artist.images ?
                                                                <ArtistCardImageContainer>
                                                                    <ArtistCardImage src={topArtistsImages[index]}/>
                                                                </ArtistCardImageContainer>
                                                            :
                                                                <ArtistCardImageContainer track>
                                                                    <ArtistCardImage track src={topArtistsImages[index]}/>
                                                                </ArtistCardImageContainer>
                                                            }
                                                            <ArtistCardNameContainer>
                                                                <ArtistCardName>{topNames[index]}</ArtistCardName>
                                                                {topArtistsNames && <ArtistCardName track>{topArtistsNames[index]}</ArtistCardName>}
                                                            </ArtistCardNameContainer>
                                                        </ArtistCardContainer>  
                                                    ))
                                                }
                                            </ArtistCard>      
                                        </OtherArtistsContainer>
                                    </DataImageContainer>
                                    <DataImageFooterText>Data from My Spotify Data Center</DataImageFooterText>
                                </DataTitleContainer>
                            </Col>
                            <Col desktop={3} tablet={6} mobile={12}>
                                <MenuContainer>
                                    {!tweetMenu ?
                                    <ButtonsContainer>  
                                        <InfoText>We prepared an image with your Top 5 {props.type}! You could save it in your device o share your fantastic taste on Twitter :)</InfoText>
                                        <MainButton onClick={saveImage}>Save as image</MainButton>
                                        <MainButton onClick={ () => setTweetMenu(true)}>Share On Twitter</MainButton>
                                    </ButtonsContainer>
                                    :
                                    <ButtonsContainer> 
                                        <InfoTitle align="left" margin color>Your tweet</InfoTitle>
                                        <TweetContainer>
                                            <Tweet type="text" maxLength="240" onInput={charactersCount} placeholder="Start tweeting..."></Tweet>
                                            <Counter>{count} / 240</Counter>
                                        </TweetContainer>
                                        <BtnContainer>
                                            <Button size="small" look="primary" onClick={() => { setTweetMenu(false); setTweetDone(false);}}>Back</Button>
                                            <Button size="small" disabled={disabled} onClick={handleShare}>Tweet</Button>
                                        </BtnContainer>
                                        {tweetDone && <TweetSent>Tweet sent!</TweetSent>}
                                    </ButtonsContainer> 
                                    }
                                </MenuContainer>
                            </Col>
                        </Grid>         
                    </GeneralContainer>
                </div>
            }
            </Container>
        </ClientOnlyPortal>
        : null}
        </div>
    )
}

export default Modal