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

import {TitleTest, ContainerArtists, Text, ContainerLeftColumn, ContainerHero, Button, MostListened} from './styled'

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
      /*
      if(params){
        let access_token = params.access_token
        return access_token
      }
      */

      console.log(params);
      console.log("Hola")

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

      // Historial de reproducción y reproduciendo actualmente
      const [recentlyPlayed, setRecentlyPlayed] = useState([]);
      const [playing, setPlaying] = useState([]);
      const [minutesListened, setMinutesListened] = useState('')
      const [streamsDays, setStreamsDay] = useState('')

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

      useEffect(() => {
        const fetchData = async () => {
  
            if(params.access_token){
              const access_token = params.access_token;

            
              try {

                /*
                  axios({
                    method: 'get',
                    url: 'http://localhost:8888/refresh_token',
                    data: {
                      'refresh_token': params.refresh_token
                    },
                  })
                  .then(function (response) {
                    let access_token_new = response.access_token;
                    console.log(access_token_new)
                  });
                  */

                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // PLAYLISTS DATA
                  console.log("Ya estamos en el useEffect");
                  const responsePlaylists = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  setPlaylists(responsePlaylists.data.items);

                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // CURRENTLY PLAYING DATA

                  const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  console.log(responsePlaying.data);
                  setPlaying(responsePlaying.data.item);
                  
                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // ARTISTS DATA

                  const responseArtists = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${artistsTerm}&limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
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
                  setTotalArtists(artistsNamesFilter)

                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // TRACKS DATA

                  const responseTracks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${tracksTerm}&limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  setTracks(responseTracks.data.items);
                  const tracksNames = tracks.map(track =>{
                    return track.name
                  })
                  const tracksNamesFilter = tracksNames.filter( (artist, index ) => {
                    return index < 5;
                  })
                  setTotalTracks(tracksNamesFilter)
                  
                  //////////////////////////////////////////////////////////////////////////////////////////////////////
                  
                  // RECENTLY PLAYED DATA

                  const responseRecentlyPlayed = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
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
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  setUser(responseUser.data.id)
                  if(user){
                    setLoggedIn(true);
                  }

              } catch (error) {
                  console.error('este es mi error',error);
              }
            }
        }
        fetchData()
      }, [artistsTerm, tracksTerm])
    
      const createPlaylist = async () => {
        if(params.access_token){
          const access_token = params.access_token;
          try {
              const responseUserProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                  headers: {
                  'Authorization': 'Bearer ' + access_token
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
                headers: { 'Authorization': 'Bearer ' + access_token }
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
                  headers: { 'Authorization': 'Bearer ' + access_token }
                })
                .then(function (response) {
                  //console.log(response);
                });
              });
    
          } catch (error) {
              console.error('este es mi error',error);
          }
        }
    
        // <h2>Top genres</h2>
        //  {params !== undefined && <TopGenres token={params.access_token} data={tracks}/>}
      }

      useEffect(() => {
        const fetchAlbums = async () =>{
          if(params.access_token){
            const access_token = params.access_token;
            const responseTracksFourWeeks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${albumsTerm}&limit=50`, {
                headers: {
                  'Authorization': 'Bearer ' + access_token
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
            setAlbums(keysSortedFourWeeks)
          }
        }
        fetchAlbums()
      }, [albumsTerm])

      useEffect(() => {
        const fetchGenres = async () =>{
          if(params.access_token){
            const access_token = params.access_token;
            let artistsID = [];
            let artists_genres = [];
            const responseTracksGenres = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${genresTerm}&limit=50`, {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            });
            //console.log(responseTracksGenres.data.items);
            
            const findArtistsIDS = responseTracksGenres.data.items.map(track =>{
              track.artists.map(artist=>{
                  artistsID.push(artist.id)
              })
            })
            
            const findGenres = artistsID.map(async (id) =>{
              const responseArtist = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                  headers: {
                      Authorization: "Bearer " + access_token,
                  },
              });
              responseArtist.data.genres.map((genre) => {
                artists_genres.push(genre);
              });

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
          }
        }
        fetchGenres()
      }, [genresTerm])
    
      useEffect(() => {
        const fetchRecommendations = async() =>{
          if(params.access_token){
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
                          'Authorization': 'Bearer ' + access_token
                          }
                });
                setRecommendations(responseRecommendations.data.tracks);
                setRecommendationsDescription(`We prepare a list of recommendations based in your most listened tracks in the past 4 weeks, which includes`)
              } 
              else if(recommendationsTerm === "genres"){
                const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_genres=${genres}&min_energy=0.4&min_popularity=50`, {
                  headers: {
                  'Authorization': 'Bearer ' + access_token
                  }
                });
                console.log(responseRecommendations)
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
                  console.log(getArtistsIds);
                  const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_artists=${getArtistsIds}&min_energy=0.4&min_popularity=50`, {
                            headers: {
                            'Authorization': 'Bearer ' + access_token
                            }
                  });
                  setRecommendations(responseRecommendations.data.tracks);
                  setRecommendationsDescription(`We prepare a list of recommendations based in your most listened artists in the past 4 weeks, which includes`)
              }
            }
          }
        }
        fetchRecommendations();
      }, [tracks, recommendationsTerm, newRec])
      
      const createPlaylistWithRecommendations = async () => {
        if(params.access_token){
          const access_token = params.access_token;
          try {
              const responseUserProfile = await axios.get(`https://api.spotify.com/v1/me`, {
                  headers: {
                  'Authorization': 'Bearer ' + access_token
                  }
              });
              console.log(responseUserProfile)
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
                headers: { 'Authorization': 'Bearer ' + access_token }
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
                  headers: { 'Authorization': 'Bearer ' + access_token }
                })
                .then(function (response) {
                  //console.log(response);
                });
              });
          } catch (error) {
              console.error('este es mi error',error);
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
          <Inner>
            
          <section id="home_section">
            <Grid colGap={30} rowGap={40}>
              <Col desktop={12} tablet={6} mobile={12}>
                <ContainerHero>
                  <Title size="h1">Welcome to your Spotify Data Center</Title>
                  {user && <Text>Hi, {user}</Text> }
                  {!user && <a href="http://localhost:8888">
                    <button>Login with Spotify</button>
                  </a>}
                  {user && <Title>Right now you are listening to:</Title>}
                  {playing && <CurrentlyPlayingCard data={playing} />}
                </ContainerHero>
              </Col>
            </Grid>
          </section>

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
                <Grid>
                  {artists.map((artist, index) => (<ArtistCard key={artist.id} data={artist} index={index} token={params.access_token} gridSize={3} />))}
                </Grid>
              </Col>
            </Grid>
          </section>  
          : null }

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
                  {totalTracks && <Text>You listen to these tracks for the most part in the past 4 weeks! You spend a lot of time listening to {totalTracks.join(", ")}</Text>}
                  <Text>Show artists by:</Text>
                  <Button activeButton={handleTracksButton('short_term')} onClick={ () => setTracksTerm('short_term')}>Past 4 weeks</Button>
                  <Button activeButton={handleTracksButton('medium_term')} onClick={ () => setTracksTerm('medium_term')}>6 months</Button>
                  <Button activeButton={handleTracksButton('long_term')} onClick={ () => setTracksTerm('long_term')}>Several years</Button>
                  <Text>Do you want to create a playlist with your 50 favorites tracks?</Text>
                  <button onClick={createPlaylist}>Create playlist</button>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid>
                  {tracksTopTen.map((track, index) => (<TrackCard key={track.id} data={track} index={index} token={params.access_token} gridSize={3}/>))}
                  {tracks.map((track, index) => (<TrackCard key={track.id} data={track} index={index} token={params.access_token} gridSize={3}/>))}
                </Grid>
              </Col>
            </Grid>
          </section>
          : null }

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
                  <Text>You listen these artists for the most part in the past 4 weeks! You spend a lot of time listening to {totalArtists.join(", ")}</Text>
                  <Text>Show artists by:</Text>
                  <Button activeButton={handleAlbumsButton('short_term')} onClick={ () => setAlbumsTerm('short_term')}>Past 4 weeks</Button>
                  <Button activeButton={handleAlbumsButton('medium_term')} onClick={ () => setAlbumsTerm('medium_term')}>6 months</Button>
                  <Button activeButton={handleAlbumsButton('long_term')} onClick={ () => setAlbumsTerm('long_term')}>Several years</Button>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid>
                  {albums.map((album, index) => (<AlbumCard key={album.id} data={album} index={index} token={params.access_token} gridSize={3} imageSizeLarge />))}
                </Grid>
              </Col>
            </Grid>
          </section>  
          : null }

          {user ?
          <section id="genres_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={7} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">Your most listened genres</Title>}
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
                <Grid>
                  {genres && genres.map(genre => (<p>{genre}</p>))}
                </Grid>
              </Col>
            </Grid>
          </section>  
          : null }

          {user ?
          <section id="recently-played_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={9} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">These are your recently played tracks</Title>}
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={12} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={10}>
                  <Text>You listen {minutesListened} minutes in the last {streamsDays} days</Text>
                  {recentlyPlayed.map((track) => (<RecentlyPlayedCard key={track.id} data={track} token={params.access_token} />))}
                </Grid>
              </Col>
            </Grid>
          </section>
          : null }

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

          {user ?
          <section id="recommendations_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={6} tablet={6} mobile={12}>
                  {artists && <Title size="extra-large">Recommendations</Title>}
              </Col>
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
                  <Text>Do you want to create a playlist with your 50 favorites tracks?</Text>
                  <button onClick={createPlaylistWithRecommendations}>Create playlist</button>
                </ContainerLeftColumn>
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid>
                {tracks && recommendations.map((track, index) => (<TrackCard key={track.id} data={track} token={params.access_token} gridSize={3}/>))}
                </Grid>
              </Col>
            </Grid>
          </section>
          : null }
          
          </Inner>

            
        </div>
      )
}
    

export default Home