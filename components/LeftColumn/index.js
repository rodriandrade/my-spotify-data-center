import { ContainerLeftColumn, Text, MostListened, Button, MainButton, ContainerButtons} from './styled'
import React, {useState, useEffect, createRef} from 'react'
import axios from 'axios'
import Modal from '../Modal'

const LeftColumn = props =>{

    const [playlistCreation, setCreatePlaylist] = useState(false);
    const [token, setToken] = useState(props.token ? props.token : null)
    const [isSticky, setIsSticky] = useState(false)
    const [flag, setFlag] = useState(false)
    const ref = React.createRef()

    // State para modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [playlistModalState, setPlaylistModalState] = useState('');

    const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': props.refreshToken
            }
          });
        //console.log(responseRefreshToken.data.access_token);
        setToken(responseRefreshToken.data.access_token)
    }

    // Title when position sticky get triggered
    useEffect(()=>{
        const cachedRef = ref.current

        
        const observer = new IntersectionObserver(
                ([e]) => 
                setIsSticky(e.intersectionRatio > 1)
                ,{threshold: [1]}
        )

        if(flag === false){
            observer.unobserve(cachedRef)
        } else{
            observer.observe(cachedRef)
        }

        observer.observe(cachedRef)
        
        // unmount
        return function(){
          observer.unobserve(cachedRef)
        }
      }, [])

    // Check if props.createPlaylist exist
    useEffect(() => {
        const checkPlaylist = async () =>{
            if(props.createPlaylist === true){
                setCreatePlaylist(true)
            }
        }
        checkPlaylist();
    }, [])

    // Create playlist 
    const createPlaylist = async () => {
        if(token){
          try {
              const responseUserProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                  headers: {
                  'Authorization': 'Bearer ' + token
                  }
              });
              setModalIsOpen(!modalIsOpen);
              setPlaylistModalState(true);
              const user_id = responseUserProfile.data.id;
              const base_url = `https://api.spotify.com/v1/users/${user_id}/playlists`
              const playlistName = {
                'short_term': 'My Favs 50 tracks - Past 4 weeks',
                'medium_term': 'My Favs 50 tracks - Past 6 months',
                'long_term': 'My Favs 50 tracks - Several Years',
              }
              axios({
                method: 'post',
                url: base_url,
                data: {
                  name: playlistName[props.typeTerm],
                  description: 'New playlist description',
                  public: false
                },
                headers: { 'Authorization': 'Bearer ' + token }
              })
              .then(function (response) {
                const tracksURI = [];
                const playlist_id = response.data.id;
                props.tracks.map(track => {
                  tracksURI.push(track.uri)
                })
                const base_url_playlist = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
                axios({
                  method: 'post',
                  url: base_url_playlist,
                  data: tracksURI,
                  headers: { 'Authorization': 'Bearer ' + token }
                })
                .then(function (response) {
                  //console.log(response);
                });
              });
          } catch (error) {
            if (error.response.status === 401) {
                getNewToken();
            }
            if (error.response.status === 500) {
                console.log(error);
            }
            if (error.response.status === 504) {
                console.log(error);
            }
          }
        }
    }

    function handleArtistButton(buttonTerm) {
        return props.typeTerm === buttonTerm;
    }

    function handleAlbumsButton(buttonTerm) {
        return props.typeTerm === buttonTerm;
    }

    function handleGenresButton(buttonTerm) {
        return props.typeTerm === buttonTerm;
    }

    function handleTracksButton(buttonTerm) {
        return props.typeTerm === buttonTerm;
    }

    return(
      
        <ContainerLeftColumn className={isSticky ? " isSticky" : ""} ref={ref} sectionTitle={props.sectionTitle}>
            {playlistModalState && 
                <Modal 
                    modalIsOpen={modalIsOpen} 
                    setModalIsOpen={setModalIsOpen} 
                    title={"Success"}
                    text={"Your playlist was created"}
                    buttonText={""}
            />}
            <Text>{props.description} <MostListened>{props.mostListened.join(", ")}</MostListened></Text>
            <Text>{props.showBy}</Text>
            <ContainerButtons>
                <Button activeButton={props.handlerButton('short_term')} onClick={ () => props.setTypeTerm('short_term')}>Past 4 weeks</Button>
                <Button activeButton={props.handlerButton('medium_term')} onClick={ () => props.setTypeTerm('medium_term')}>Past 6 months</Button>
                <Button activeButton={props.handlerButton('long_term')} onClick={ () => props.setTypeTerm('long_term')}>Several years</Button>
            </ContainerButtons>
            {playlistCreation ? 
                <div>
                    <Text margin="30px 0 0 0">Do you want to create a playlist with your 50 favorites tracks?</Text>
                    <MainButton onClick={createPlaylist}>Create playlist</MainButton>
                </div>
            : null}
        </ContainerLeftColumn>
    )
}

export default LeftColumn