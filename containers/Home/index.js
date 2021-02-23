import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ArtistCard from '../../components/artistCard'
import TrackCard from '../../components/trackCard'
import AlbumCard from '../../components/AlbumCard'
import RecentlyPlayedCard from '../../components/RecentlyPlayedCard'
import CurrentlyPlayingCard from '../../components/CurrentlyPlayingCard'
import PlaylistCard from '../../components/PlaylistCard'
import TopGenres from '../../components/TopGenres'
import {Grid, Col} from '../../components/Grid/index'
import Title from '../../components/Title'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Inner from '../../components/Inner'
import Typical from 'react-typical'
import NavMenu from '../../components/NavMenu'
import Footer from '../../components/Footer'

import {TitleTest, ContainerArtists, Text, ContainerLeftColumn, ContainerHero, Button, MostListened, RefreshIcon, IconContainer, MainButton} from './styled'

const Home = () =>{

    function getHashParams() {
        if (typeof window !== "undefined") {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
        }
      }

      var params = getHashParams();

      const [token, setToken] = useState('');

      const [selected, setSelected] = useState(false);
      const [timePeriod, setTimePeriod] = useState('past 4 weeks')
      
      // Periodo de tiempo para traer artistas y temas. 
      const [tracksTerm, setTracksTerm] = useState('short_term');
      const [artistsTerm, setArtistsTerm] = useState('short_term');
      const [genresTerm, setGenresTerm] = useState('short_term');
      const [albumsTerm, setAlbumsTerm] = useState('short_term');

      // Artistas
      const [artistsTopTen, setArtistsTopTen] = useState([]);
      const [artists, setArtists] = useState([]);
      const [totalArtists, setTotalArtists] = useState([]);

      // Canciones
      const [tracksTopTen, setTracksTopTen] = useState([]);
      const [tracks, setTracks] = useState([]);
      const [totalTracks, setTotalTracks] = useState([]);

      // Albums
      const [albums, setAlbums] = useState([]);
      const [totalAlbums, setTotalAlbums] = useState([]);

      // Historial de reproducción y reproduciendo actualmente
      const [recentlyPlayed, setRecentlyPlayed] = useState([]);
      const [playing, setPlaying] = useState([]);
      const [playingData, setPlayingData] = useState([]);
      const [minutesListened, setMinutesListened] = useState('')
      const [streamsDays, setStreamsDay] = useState('')

      const [playingRightNow, setPlayingRightNow] = useState([]);

      // Playlists
      const [playlists, setPlaylists] = useState([]);

      // Usuario
      const [loggedIn, setLoggedIn] = useState(false)
      const [user, setUser] = useState('')

      // Genres
      const [genres, setGenres] = useState([])

      // Recomendaciones
      const [recommendations, setRecommendations] = useState([])
      const [newRec, setNewRec] = useState(false);
      const [recommendationsTerm, setRecommendationsTerm] = useState('tracks');
      const [recommendationsArtistsNames, setRecommendationsArtistsNames] = useState([]);

      // Descriptions 
      const [recommendationsDescription, setRecommendationsDescription] = useState('We prepare a list of recommendations based in your most listened track in the past 4 weeks.')

      const getNewToken = async () =>{
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': params.refresh_token
            }
          });
        setToken(responseRefreshToken.data.access_token)
      }

      useEffect(() => {
        const getToken = () =>{
          if(params.access_token){
            const access_token = params.access_token;
            setToken(access_token)
          }
        }
        getToken();
      }, [])

      useEffect(() => {
        const fetchData = async () => {
  
            if(token){
              const access_token = params.access_token;

              try {
                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // PLAYLISTS DATA
                  const responsePlaylists = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  setPlaylists(responsePlaylists.data.items);
                 

                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // CURRENTLY PLAYING DATA
                  //console.log("Se hizo de nuevo el fetch");
                  const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  //console.log("ACTUALIZA3")
                  //console.log(responsePlaying.data.item);
                  setPlaying(responsePlaying.data.item);
                  setPlayingData(responsePlaying.data)
                  
                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // ARTISTS DATA

                  const responseArtists = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${artistsTerm}&limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  setArtists(responseArtists.data.items)
                
                  // Which artists appears more than once 

                  const artistsNames = responseArtists.data.items.map(artist =>{
                    return artist.name
                  })
                  const artistsNamesFilter = artistsNames.filter( (artist, index ) => {
                    return index < 5;
                  })
                  console.log(artistsNamesFilter)
                  setTotalArtists(artistsNamesFilter)

                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // TRACKS DATA

                  const responseTracks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${tracksTerm}&limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  setTracks(responseTracks.data.items);
                  const tracksNames = responseTracks.data.items.map(track =>{
                    return track.name
                  })
                  const tracksNamesFilter = tracksNames.filter( (artist, index ) => {
                    return index < 5;
                  })
                  console.log(tracksNamesFilter);
                  setTotalTracks(tracksNamesFilter)
                  
                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // RECENTLY PLAYED DATA

                  const responseRecentlyPlayed = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  setRecentlyPlayed(responseRecentlyPlayed.data.items);
                  // Total days

                  const findDay = responseRecentlyPlayed.data.items.map(song=>{
                    return song.played_at.slice(0, 10);
                  })
                  const totalDay = findDay.reduce((acc, val, ind, array) => {
                    if(array.lastIndexOf(val) === ind){
                       return ++acc;
                    };
                    return acc;
                  }, 0);
                  setStreamsDay(totalDay);

                  // Total minutes

                  const durationTrack = responseRecentlyPlayed.data.items.map(song => {
                    return song.track.duration_ms;
                  })
                  const totalDuration = durationTrack.reduce((acc, value)=>{
                    return acc + value;
                  }, 0);
                  let minutesListenedToShow = (totalDuration / 60000).toFixed(0);
                  setMinutesListened(minutesListenedToShow)

                  //////////////////////////////////////////////////////////////////////////////////////////////////////

                  // USER DATA

                  const responseUser = await axios.get(`https://api.spotify.com/v1/me`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  setUser(responseUser.data.id)
                  if(user){
                    setLoggedIn(true);
                  }

              } catch (error) {
                  console.error('este es mi error',error);
                  if (error.response.status === 401) {
                    getNewToken();
                  }
              }
            }
        }
        fetchData()
      }, [artistsTerm, tracksTerm, token, playingRightNow])
    
      const createPlaylist = async () => {
        if(token){
          const access_token = params.access_token;
          try {
              const responseUserProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                  headers: {
                  'Authorization': 'Bearer ' + token
                  }
              });
    
              const user_id = responseUserProfile.data.id;
              //console.log(user_id);
              //console.log(tracksTerm)
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
                  name: playlistName[tracksTerm],
                  description: 'New playlist description',
                  public: false
                },
                headers: { 'Authorization': 'Bearer ' + token }
              })
              .then(function (response) {
                const tracksURI = [];
                const playlist_id = response.data.id;
                tracks.map(track => {
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
              console.error('este es mi error',error);
              if (error.response.status === 401) {
                getNewToken(); 
              }
          }
        }
    
        // <h2>Top genres</h2>
        //  {params !== undefined && <TopGenres token={params.token} data={tracks}/>}
      }

      // Albums
      useEffect(() => {
        const fetchAlbums = async () =>{
          if(token){
            try{
            const access_token = params.access_token;
            const responseTracksFourWeeks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${albumsTerm}&limit=50`, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            });
            //console.log(responseTracksFourWeeks.data.items);
            const getAlbums = responseTracksFourWeeks.data.items.map(track =>{
              return track.album
            })
            const allAlbums = getAlbums.filter(album =>{
              if(album.album_type === "ALBUM" || album.album_type === "COMPILATION"){
                return album
              }
            })
            //console.log(allAlbums);
            const albumsNames = allAlbums.map(album=>{
              return {
                name: album.name,
                artist: album.artists[0].name,
              }
            })

            let counter = {}
            albumsNames.forEach(function(obj) {
                var key = JSON.stringify(obj)
                counter[key] = (counter[key] || 0) + 1
            })
            
            const artistsAlbums = albumsNames.reduce((obj, album) =>{
              obj[album.name] = (obj[album.name] || 0) + 1;
              return obj
            }, {})
            //console.log(albumsNames);
            //console.log(artistsAlbums);
            /*
            const albumsToSet = []
            let albumsNameToShow = Object.keys(artistsAlbums);
            albumsNameToShow.map(albumName =>{
              albumsNames.map(album =>{
                if(albumName === album.name){
                  let albumToStore = {};
                  albumToStore.name = album.name;
                  albumToStore.artist = album.artist;
                  albumToStore.repetitions = artistsAlbums[albumName]
                  console.log(albumToStore);
                  albumsToSet.push(albumToStore);
                }
              })
            })
            */
            //console.log(albumsToSet);
            
            //console.log(artistsAlbums);
            let keysSortedFourWeeks = Object.keys(artistsAlbums).sort(function(a,b){return artistsAlbums[b]-artistsAlbums[a]})
            //console.log(keysSortedFourWeeks)

            // Which artists appears more than once 

            const albumsNamesFilter = keysSortedFourWeeks.filter( (artist, index ) => {
              return index < 5;
            })

            setTotalAlbums(albumsNamesFilter)
            setAlbums(keysSortedFourWeeks);

            } catch(error) {
              console.error('este es mi error',error);
              if (error.response.status === 401) {
                getNewToken();
              }
            }
          }
        }
        fetchAlbums()
      }, [albumsTerm, token])

      // Genres
      useEffect(() => {
        const fetchGenres = async () =>{
          if(token){
            try{
            const access_token = params.access_token;
            let artistsID = [];
            
            let more = [];
            const responseTracksGenres = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${genresTerm}&limit=50`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            //console.log(responseTracksGenres.data.items);
            
            const findArtistsIDS = responseTracksGenres.data.items.map(track =>{
              track.artists.map(artist=>{
                  artistsID.push(artist.id)
              })
            })

            let artists_genres = [];
            const findGenres = artistsID.map(async (id) =>{
              const responseArtist = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                  headers: {
                      Authorization: "Bearer " + token,
                  },
              });
              responseArtist.data.genres.map((genre) => {
                artists_genres.push(genre);
              });
              //artists_genres.push(more);
            

              //console.log(artists_genres);
              //console.log(artists_genres);

              const countGenres = artists_genres.reduce((obj, genre) =>{
                obj[genre] = (obj[genre] || 0) + 1;
                return obj
              }, {})

              //console.log(countGenres);

              //let orderGenres = Object.keys(countGenres).sort(function(a,b){return countGenres[b]-countGenres[a]})
              let orderGenres = Object.keys(countGenres).sort(function(a,b){return countGenres[b]-countGenres[a]})
              let orderValues = Object.values(countGenres).sort(function(a,b){return countGenres[b]-countGenres[a]})
              //console.log(orderGenres);
              //console.log(orderValues);
              const genresToShow = orderGenres.filter((genre, index) =>{
                return index < 5
              })
              //console.log(orderGenres);
              setGenres(genresToShow)
            })
            } catch(error) {
            console.error('este es mi error',error);
            if (error.response.status === 401) {
              getNewToken();
            }
          }
          }
        }
        fetchGenres()
      }, [genresTerm, token])
    
      // Recommendations
      useEffect(() => {
        const fetchRecommendations = async() =>{
          if(token){
            try{
            const access_token = params.access_token;
            if(tracks.length > 0){
              if(recommendationsTerm === "tracks"){
                const moreTracks = tracks.filter((artist, index) => {
                  return index < 5;
                })
                const getNames = moreTracks.map(track=>{
                  return track.name
                })
                setRecommendationsArtistsNames(getNames);
                const getIds = moreTracks.map(track=>{
                  return track.id
                })
                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_tracks=${getIds}&min_energy=0.4&min_popularity=50`, {
                          headers: {
                          'Authorization': 'Bearer ' + token
                          }
                });
                setRecommendations(responseRecommendations.data.tracks);
                setRecommendationsDescription(`We prepare a list of recommendations based in your most listened tracks in the past 4 weeks, which includes`)
              } 
              else if(recommendationsTerm === "genres"){
                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_genres=${genres}&min_energy=0.4&min_popularity=50`, {
                  headers: {
                  'Authorization': 'Bearer ' + token
                  }
                });
                //console.log(responseRecommendations)
                setRecommendationsArtistsNames(genres);
                setRecommendations(responseRecommendations.data.tracks);
                setRecommendationsDescription(`We prepare a list of recommendations based in your most listened genres in the past 4 weeks, which includes`)
              } else if(recommendationsTerm === "artists"){
                  const moreArtists = artists.filter((artist, index) => {
                    return index < 5;
                  })
                  const getNames = moreArtists.map(artist=>{
                    return artist.name
                  })
                  setRecommendationsArtistsNames(getNames);
                  const getArtistsIds = moreArtists.map(track=>{
                    return track.id
                  })
                  //console.log(getArtistsIds);
                  const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_artists=${getArtistsIds}&min_energy=0.4&min_popularity=50`, {
                            headers: {
                            'Authorization': 'Bearer ' + token
                            }
                  });
                  setRecommendations(responseRecommendations.data.tracks);
                  setRecommendationsDescription(`We prepare a list of recommendations based in your most listened artists in the past 4 weeks, which includes`)
              }
            }
            } catch(error) {
              console.error('este es mi error',error);
              if (error.response.status === 401) {
                getNewToken();
              }
            }
          }
          
        }
        fetchRecommendations();
      }, [tracks, recommendationsTerm, newRec, token])
      
      const createPlaylistWithRecommendations = async () => {
        if(token){
          const access_token = params.access_token;
          try {
              const responseUserProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                  headers: {
                  'Authorization': 'Bearer ' + token
                  }
              });
              //console.log(responseUserProfile)
              const user_id = responseUserProfile.data.id;
              const base_url = `https://api.spotify.com/v1/users/${user_id}/playlists`
              const playlistName = {
                'tracks': 'Recommendations by  your favorites tracks - My Spotify Data Center',
                'artists': 'Recommendations by your favorites artists - My Spotify Data Center',
                'genres': 'Recommendations by your favorites genres - My Spotify Data Center',
              }
              axios({
                method: 'post',
                url: base_url,
                data: {
                  name: playlistName[recommendationsTerm],
                  description: 'New playlist description',
                  public: false
                },
                headers: { 'Authorization': 'Bearer ' + token }
              })
              .then(function (response) {
                const tracksURI = [];
                const playlist_id = response.data.id;
                recommendations.map(track => {
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
              console.error('este es mi error',error);
              if (error.response.status === 401) {
                getNewToken();
              }
          }
        }        
      }

      function handleArtistButton(buttonTerm) {
        return artistsTerm === buttonTerm;
      }

      function handleTracksButton(buttonTerm) {
        return tracksTerm === buttonTerm;
      }

      function handleAlbumsButton(buttonTerm) {
        return albumsTerm === buttonTerm;
      }

      function handleGenresButton(buttonTerm) {
        return genresTerm === buttonTerm;
      }

      function handleRecommendationsButton(buttonTerm) {
        return recommendationsTerm === buttonTerm;
      }



      return (
        
        <div>
          
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NavMenu />
          <ParticlesBackground />
          <Inner>
          
          {!user ? 
          <section id="home_section">
            <Grid colGap={30} rowGap={40}>
              <Col desktop={12} tablet={6} mobile={12}>
                <ContainerHero>
                  <Title size="h1">Welcome to your Spotify Data Center</Title>
                  {!user && <a href="http://localhost:8888/login">
                    <MainButton>Login with Spotify</MainButton>
                  </a>}
                </ContainerHero>
              </Col>
            </Grid>
          </section>
          : 
          <section id="home_section">
            <Grid colGap={30} rowGap={40}>
              <Col desktop={12} tablet={6} mobile={12}>
                <ContainerHero>
                  <Title size="h1" margin="0 0 0 0">Hi, {user} :)</Title>
                  {user && playing && <CurrentlyPlayingCard data={playing} token={token} playingData={playingData} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} setPlaying={setPlaying} />}
                </ContainerHero>
              </Col>
            </Grid>
          </section>}
          
          {user ?
          <section id="artists_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={6} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">These are your favorites artists</Title>}
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <ContainerLeftColumn>
                  {totalArtists && <Text>You listen to these artists for the most part in the past 4 weeks! You spend a lot of time listening to <MostListened>{totalArtists.join(", ")}</MostListened></Text>}
                  <Text>Show artists by:</Text>
                  <Button activeButton={handleArtistButton('short_term')} onClick={ () => setArtistsTerm('short_term')}>Past 4 weeks</Button>
                  <Button activeButton={handleArtistButton('medium_term')} onClick={ () => setArtistsTerm('medium_term')}>6 months</Button>
                  <Button activeButton={handleArtistButton('long_term')} onClick={ () => setArtistsTerm('long_term')}>Several years</Button>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {artists.map((artist, index) => (<ArtistCard key={artist.id} data={artist} index={index} token={token} gridSize={3} refreshToken={params.refresh_token}/>))}
                </Grid>
              </Col>
            </Grid>
          </section>  
          : <p>Loading...</p> }

          {user ?
          <section id="tracks_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={6} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">These are your favorites tracks</Title>}
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <ContainerLeftColumn>
                  {totalTracks && <Text>You listen to these tracks for the most part in the past 4 weeks! You spend a lot of time listening to <MostListened>{totalTracks.join(", ")}</MostListened></Text>}
                  <Text>Show artists by:</Text>
                  <Button activeButton={handleTracksButton('short_term')} onClick={ () => setTracksTerm('short_term')}>Past 4 weeks</Button>
                  <Button activeButton={handleTracksButton('medium_term')} onClick={ () => setTracksTerm('medium_term')}>6 months</Button>
                  <Button activeButton={handleTracksButton('long_term')} onClick={ () => setTracksTerm('long_term')}>Several years</Button>
                  <Text margin="30px 0 0 0">Do you want to create a playlist with your 50 favorites tracks?</Text>
                  <MainButton onClick={createPlaylist}>Create playlist</MainButton>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {tracksTopTen.map((track, index) => (<TrackCard key={track.id} data={track} index={index} token={token} gridSize={3} setToken={setToken} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow}/>))}
                  {tracks.map((track, index) => (<TrackCard key={track.id} data={track} index={index} token={token} refreshToken={params.refresh_token} gridSize={3} setToken={setToken} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow}/>))}
                </Grid>
              </Col>
            </Grid>
          </section>
          : <p>Loading...</p> }

          {user ?
          <section id="albums_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={7} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">These are your favorites albums</Title>}
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <ContainerLeftColumn>
                  <Text>You listen these albums for the most part in the past 4 weeks! You spend a lot of time listening to <MostListened>{totalAlbums.join(", ")}</MostListened></Text>
                  <Text>Show artists by:</Text>
                  <Button activeButton={handleAlbumsButton('short_term')} onClick={ () => setAlbumsTerm('short_term')}>Past 4 weeks</Button>
                  <Button activeButton={handleAlbumsButton('medium_term')} onClick={ () => setAlbumsTerm('medium_term')}>6 months</Button>
                  <Button activeButton={handleAlbumsButton('long_term')} onClick={ () => setAlbumsTerm('long_term')}>Several years</Button>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {albums.map((album, index) => (<AlbumCard key={album.id} data={album} index={index} token={token} gridSize={3} imageSizeLarge refreshToken={params.refresh_token} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} />))}
                </Grid>
              </Col>
            </Grid>
          </section>  
          : <p>Loading...</p> }

          {user ?
          <section id="genres_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={7} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">These are your favorites genres</Title>}
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <ContainerLeftColumn>
                  <Text>You listen these artists for the most part in the past 4 weeks! You spend a lot of time listening to {totalArtists.join(", ")}</Text>
                  <Text>Show artists by:</Text>
                  <Button activeButton={handleGenresButton('short_term')} onClick={ () => setGenresTerm('short_term')}>Past 4 weeks</Button>
                  <Button activeButton={handleGenresButton('medium_term')} onClick={ () => setGenresTerm('medium_term')}>Past 6 months</Button>
                  <Button activeButton={handleGenresButton('long_term')} onClick={ () => setGenresTerm('long_term')}>Several years</Button>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {genres && genres.map(genre => 
                    <p>{genre}</p>)
                    }
                </Grid>
              </Col>
            </Grid>
          </section>  
          : <p>Loading...</p> }

          {user ?
          <section id="recently-played_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={9} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">These are your recently played tracks</Title>}
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <ContainerLeftColumn>
                  <Text>You listen {minutesListened} minutes in the last {streamsDays} days</Text>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={10} rowGap={10}>
                  {recentlyPlayed.map((track) => (<RecentlyPlayedCard key={track.id} data={track} token={token} />))}
                </Grid>
              </Col>
            </Grid>
          </section>
          : <p>Loading...</p> }

          {/*
          {user ?
          <section>             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={7} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">These are your playlists</Title>}
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid>
                  {playlists && playlists.map((playlist) => (<PlaylistCard key={playlist.id} data={playlist} />))}
                </Grid>
              </Col>
            </Grid>
          </section>  
          : null }
          */}

          {user ?
          <section id="recommendations_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={6} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">Recommendations</Title>}
              </Col>
              {/*
              <Col desktop={6} tablet={6} mobile={12}>
                <IconContainer>
                    <RefreshIcon src="/refresh.svg" />
                </IconContainer>
              </Col>
              */}
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <ContainerLeftColumn>
                  <Text>{recommendationsDescription}<MostListened> {recommendationsArtistsNames.join(", ")}</MostListened></Text>
                  <Text>Show recommendations by:</Text>
                  <Button activeButton={handleRecommendationsButton('tracks')} onClick={ () => setRecommendationsTerm('tracks')}>By Tracks</Button>
                  <Button activeButton={handleRecommendationsButton('artists')} onClick={ () => setRecommendationsTerm('artists')}>By Artists</Button>
                  <Button activeButton={handleRecommendationsButton('genres')} onClick={ () => setRecommendationsTerm('genres')}>By Genre</Button>
                  <Button onClick={() => setNewRec(!newRec)}>Refresh recommendations</Button>
                  <Text margin="30px 0 0 0">Do you want to create a playlist with your 50 favorites tracks?</Text>
                  <MainButton onClick={createPlaylistWithRecommendations}>Create playlist</MainButton>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                {tracks && recommendations.map((track, index) => (<TrackCard key={track.id} data={track} token={token} gridSize={3} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} margin="20px 0 5px 0" />))}
                </Grid>
              </Col>
            </Grid>
          </section>
          : <p>Loading...</p> }

           <Footer />
          </Inner>

        </div>
      )
}
    

export default Home