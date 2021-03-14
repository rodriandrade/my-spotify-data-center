import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ArtistCard from '../../components/artistCard'
import TrackCard from '../../components/trackCard'
import AlbumCard from '../../components/AlbumCard'
import RecentlyPlayedCard from '../../components/RecentlyPlayedCard'
import CurrentlyPlayingCard from '../../components/CurrentlyPlayingCard'
import PlaylistCard from '../../components/PlaylistCard'
import TopGenresCard from '../../components/TopGenresCard'
import {Grid, Col} from '../../components/Grid/index'
import Title from '../../components/Title'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Inner from '../../components/Inner'
import NavMenu from '../../components/NavMenu'
import Footer from '../../components/Footer'
import LeftColumn from '../../components/LeftColumn'
import TypingEffect from '../../components/TypingEffect'

import {Text, ContainerLeftColumn, ContainerHero, Button, MostListened, RefreshIcon, IconContainer, MainButton, LoadingImage, LoadingContainer, LoadingText, LoadingContainerSection, MasterContainer, SuperContainer} from './styled'

const Home = () =>{

    const router = useRouter()

    const [token, setToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    /*
    if(router.query.access_token){
      console.log("jamiroquai");
      setToken(router.query.access_token)
      /*
      const token = router.query.token;
      const refresh_token = router.query.refreshToken
      setToken(token);
      
    }
    */
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

      const [selected, setSelected] = useState(false);
      const [timePeriodTracks, setTimePeriodTracks] = useState('You listen to these tracks for the most part in the past 4 weeks! You spend a lot of time listening to')
      const [timePeriodArtists, setTimePeriodArtists] = useState('You listen to these artists for the most part in the past 4 weeks! You spend a lot of time listening to')
      const [timePeriodAlbums, setTimePeriodAlbums] = useState('You listen to these albums for the most part in the past 4 weeks! You spend a lot of time listening to')
      const [timePeriodGenres, setTimePeriodGenres] = useState('You listen to these genres for the most part in the past 4 weeks! You spend a lot of time listening to')
      
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

      // Devices
      const [activeDevices, setActiveDevices] = useState('');

      // Player
      const [recentlyPlayed, setRecentlyPlayed] = useState([]);
      const [playing, setPlaying] = useState([]);
      const [playingData, setPlayingData] = useState([]);
      const [minutesListened, setMinutesListened] = useState('')
      const [streamsDays, setStreamsDay] = useState('')

      const [playingRightNow, setPlayingRightNow] = useState([]);
      const [blink, setBlink] = useState(false)

      // Playlists
      const [playlists, setPlaylists] = useState([]);

      // Usuario
      const [loggedIn, setLoggedIn] = useState(false)
      const [user, setUser] = useState('')

      // Genres
      const [genres, setGenres] = useState([])
      const [totalGenres, setTotalGenres] = useState([]);

      // Recomendaciones
      const [recommendations, setRecommendations] = useState([])
      const [newRec, setNewRec] = useState(false);
      const [recommendationsTerm, setRecommendationsTerm] = useState('tracks');
      const [recommendationsArtistsNames, setRecommendationsArtistsNames] = useState([]);

      // Descriptions 
      const [recommendationsDescription, setRecommendationsDescription] = useState('We prepare a list of recommendations based in your most listened track in the past 4 weeks.')

      // Loading
      const [pickLoadingText, setPickLoadingText] = useState('');

      let loadingIntro = [];

      useEffect(() => {
        const randomLoadingText = () =>{
          const loadingText = ["Are you listening to this? Well...", "Nice data", "You have a wonderful taste", "Just loading..."]
          const pickLoading = loadingText[Math.floor(Math.random() * 3)]
          loadingIntro.push(pickLoading);
        }
        randomLoadingText();
      }, [])

      // Get New Token (Refresh)
      const getNewToken = async () =>{
        let refresh_token = '';
        if(params.refresh_token){
          refresh_token = params.refresh_token
        } else if(router.query.refresh_token){
          refresh_token = router.query.refresh_token
        }
        const responseRefreshToken = await axios.get(`https://my-spotify-data-center-server.vercel.app/refresh_token`, {
            params: {
              'refresh_token': refresh_token
            }
        });
        setToken(responseRefreshToken.data.access_token)
      }

      // Get Token
      useEffect(() => {
        const getToken = () =>{
          // token from URL
          if(params.access_token){
            const access_token = params.access_token;
            const refresh_token = params.refresh_token;
            setToken(access_token)
            setRefreshToken(refresh_token)
          } else if(router.query.access_token){
            // token from query (link)
            const token = router.query.access_token
            const refreshToken = router.query.refresh_token
            setToken(token)
            setRefreshToken(refreshToken)
          }
        }
        getToken();
      }, [router.query.access_token])

      // Artists
      useEffect(() => {
        const fetchArtists = async () =>{
          if(token){
            try{
              setArtists('');
              if(artistsTerm === "short_term"){
                setTimePeriodArtists('You listen to these artists for the most part in the past 4 weeks! You spend a lot of time listening to')
              } else if(artistsTerm === "medium_term"){
                setTimePeriodArtists('You listen to these artists for the most part in the past 6 months! You spend a lot of time listening to')
              } else if(artistsTerm === "long_term"){
                setTimePeriodArtists('You listen to these artists for the most part in the past several years! You spend a lot of time listening to')
              }
              const responseArtists = await axios.get(
                `https://api.spotify.com/v1/me/top/artists?time_range=${artistsTerm}&limit=50`,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              );
              setArtists(responseArtists.data.items);

              // Which artists appears more than once

              const artistsNames = responseArtists.data.items.map((artist) => {
                return artist.name;
              });
              const artistsNamesFilter = artistsNames.filter((artist, index) => {
                return index < 5;
              });
              //console.log(artistsNamesFilter)
              setTotalArtists(artistsNamesFilter);
            } catch (error){
              console.error("este es mi error", error);
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
        fetchArtists();
      }, [artistsTerm, token])

      // Tracks
      useEffect(() => {
        const fetchTracks = async () =>{
          if(token){
            try{
              setTracks('')
              if(tracksTerm === "short_term"){
                setTimePeriodTracks('You listen to these tracks for the most part in the past 4 weeks! You spend a lot of time listening to')
              } else if(tracksTerm === "medium_term"){
                setTimePeriodTracks('You listen to these tracks for the most part in the past 6 months! You spend a lot of time listening to')
              } else if(tracksTerm === "long_term"){
                setTimePeriodTracks('You listen to these tracks for the most part in the past several years! You spend a lot of time listening to')
              }
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
              //console.log(tracksNamesFilter);
              setTotalTracks(tracksNamesFilter)
            } catch (error){
              console.error("este es mi error", error);
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
        fetchTracks();
      }, [tracksTerm, token])

      // Data
      useEffect(() => {
        const fetchData = async () => {
            if(token){
              try {
                  const responseUserDevices = await axios.get(`https://api.spotify.com/v1/me/player/devices`, {
                      headers: {
                      'Authorization': 'Bearer ' + token
                      }
                  });
                  const devices = responseUserDevices.data.devices;
                  if(devices.length == 0){
                      setActiveDevices(false)
                  } else{
                      setActiveDevices(true)
                  }
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
                  const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  });
                  setPlaying(responsePlaying.data.item);
                  setPlayingData(responsePlaying.data)
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
                  setUser(responseUser.data.display_name)
                  if(user){
                    setLoggedIn(true);
                  }

              } catch (error) {
                  console.error('este es mi error',error);
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
        fetchData()
      }, [token, playingRightNow, blink])
    
      // Albums
      useEffect(() => {
        const fetchAlbums = async () =>{
          if(token){
            try{
              setAlbums('')
              if(albumsTerm === "short_term"){
                setTimePeriodAlbums('You listen to these albums for the most part in the past 4 weeks! You spend a lot of time listening to')
              } else if(albumsTerm === "medium_term"){
                setTimePeriodAlbums('You listen to these albums for the most part in the past 6 months! You spend a lot of time listening to')
              } else if(albumsTerm === "long_term"){
                setTimePeriodAlbums('You listen to these albums for the most part in the past several years! You spend a lot of time listening to')
              }
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
                  image: album.images[0].url,
                  id: album.id
                }
              })

              const artistsAlbums = albumsNames.reduce((obj, album) =>{
                obj[album.name] = (obj[album.name] || 0) + 1;
                return obj
              }, {})

              const keyNames = Object.keys(artistsAlbums);
              
              const fullAlbumData = keyNames.map(album=>{
                let data = albumsNames.find(albumName => {
                  if(album === albumName.name){
                    return albumName
                  }
                })
                return {
                  name: data.name,
                  artist: data.artist,
                  image: data.image,
                  id: data.id,
                  count: artistsAlbums[album]
                }
              })            

              let sortAlbums = fullAlbumData.sort(function(a,b){return b.count - a.count})
              let keysSortedFourWeeks = Object.keys(artistsAlbums).sort(function(a,b){return artistsAlbums[b]-artistsAlbums[a]})

              // Which artists appears more than once 
              const albumsNamesFilter = keysSortedFourWeeks.filter( (artist, index ) => {
                return index < 5;
              })

              setTotalAlbums(albumsNamesFilter)
              setAlbums(sortAlbums);

            } catch(error) {
              console.error('este es mi error',error);
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
        fetchAlbums()
      }, [albumsTerm, token])

      // Genres
      useEffect(() => {
        const fetchGenres = async () =>{
          if(token){
            try{
              setGenres('')
              if(genresTerm === "short_term"){
                setTimePeriodGenres('You listen to these genres for the most part in the past 4 weeks! You spend a lot of time listening to')
              } else if(genresTerm === "medium_term"){
                setTimePeriodGenres('You listen to these genres for the most part in the past 6 months! You spend a lot of time listening to')
              } else if(genresTerm === "long_term"){
                setTimePeriodGenres('You listen to these genres for the most part in the past several years! You spend a lot of time listening to')
              }
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

              //setGenres(artistsID)

              let artists_genres = [];
              const findGenres = artistsID.map(async (id) =>{ 
                //artists_genres.push(id);

                const responseArtist = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                const musicGenre = responseArtist.data.genres.map((genre) => {
                  artists_genres.push(genre);
                  return genre
                });
                //artists_genres.push(more);
                return musicGenre
              })

              const showGenresData = Promise.all(findGenres);
              console.log(await showGenresData);
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
                return index < 20
              })
              //console.log(orderGenres);
              setGenres(genresToShow)

              const genresToFilter = orderGenres.filter((genre, index) =>{
                return index < 5
              })
              //console.log(orderGenres);
              setTotalGenres(genresToFilter)
            
            } catch(error) {
                console.error('este es mi error',error);
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
        fetchGenres()
      }, [genresTerm, token])
    
      // Recommendations
      useEffect(() => {
        const fetchRecommendations = async() =>{
          if(token){
            try{
              setRecommendations('')
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
                else if(recommendationsTerm === "albums")
                {
                   /*
                  console.log(albums)
                  const artistsAlbums = albums.filter((artist, index) =>{
                    return index < 5;
                  })
                  const seedArtists = artistsAlbums.map(album =>{
                    return album.artist
                  })

                  const tracksAlbums = albums.filter((track, index)=>{
                    return index < 5;
                  })

                  const seedTracks = tracksAlbums.map(async (track) =>{
                    const responseAlbumTracks = await axios.get(`https://api.spotify.com/v1/albums/${track.d}`, {
                      headers: {
                        'Authorization': 'Bearer ' + token
                      }
                    }); 
                    const pickTrack = responseAlbumTracks.data.tracks.items[0];
                    return pickTrack
                  })

                  console.log(seedArtists)

                  const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${seedArtists}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                  });
                  console.log(responseRecommendations)
                  const getAlbumsFromRecommendations = responseRecommendations.data.tracks.map(track =>{
                    return track.album;
                  })

                 
                  
                  const tracksId = tracks.map(track =>{
                  return track.id
                  })
                  const tracksIdFilter = tracksId.filter( (artist, index ) => {
                    return index < 5;
                  })
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
                  const responseRecommendations = await axios.get(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${getArtistsIds}&seed_tracks=${tracksIdFilter}&min_energy=0.4&min_popularity=50`, {
                    headers: {
                    'Authorization': 'Bearer ' + newToken
                  }
                  });
                    //console.log(responseRecommendations.data.tracks)

                  const getAlbumsFromRecommendations = responseRecommendations.data.tracks.map(track =>{
                    return track.album;
                  })

                  setRecommendations(responseRecommendations.data.tracks);
                  setRecommendationsDescription(`We prepare a list of recommendations based in your most listened genres in the past 4 weeks, which includes`)
                  */

                } 
                else if(recommendationsTerm === "artists")
                {
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
              if (error.response.status === 500) {
                console.log(error);
              }
              if (error.response.status === 504) {
                console.log(error);
              }
            }
          }
          
        }
        fetchRecommendations();
      }, [tracks, recommendationsTerm, newRec, token])
      
      // Check Currently Playing
      const checkCurrentlyPlaying = async () => {
        if(token){
          try {
            const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            setPlaying(responsePlaying.data.item);
            setPlayingData(responsePlaying.data)
            setBlink(true)
            setPlayingRightNow(responsePlaying.data.item);
          } catch (err) {
            console.error('este es mi error',error);
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
      };
      useEffect(()=>{
        checkCurrentlyPlaying()
        const interval=setInterval(()=>{
          checkCurrentlyPlaying()
         },3000)
         return()=>clearInterval(interval)
      },[token])

      // Create Playlist
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
          <ParticlesBackground />

          <SuperContainer>
          {token && <NavMenu access_token={token} />}
          
          <MasterContainer>
          <Inner>

          {!token ? 
            <section id="home_section">
              <Grid colGap={30} rowGap={40}>
                <Col desktop={12} tablet={6} mobile={12}>
                  <ContainerHero>
                    {/*<Title size="h1" >Welcome to your Spotify Data Center</Title>*/}
                    <TypingEffect title/>
                    {!user && <a href="https://spotify-server-seven.vercel.app/login">
                    {/*{!user && <a href="http://localhost:8888/login">*/}
                      <MainButton>Login with Spotify</MainButton>
                    </a>}
                  </ContainerHero>
                </Col>
              </Grid>
            </section>
          : null}
          
          {user ? 
            <section id="home_section">
            <Grid colGap={30} rowGap={40}>
              <Col desktop={12} tablet={6} mobile={12}>
                <ContainerHero>
                  {/*<Title size="h1" margin="0 0 0 0">Hi, {user} :)</Title>*/}
                  <TypingEffect user={user}/>
                  <Text>Welcome to your Spotify Data Center</Text>
                  {user && playing && <CurrentlyPlayingCard data={playing} token={token} refreshToken={refreshToken} playingData={playingData} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} setPlaying={setPlaying} blink={blink}/>}
                </ContainerHero>
              </Col>
            </Grid>
          </section>
          : 
          <LoadingContainer>
            <LoadingImage src="/loading.gif" alt="loading" />
            <LoadingText>Just loading...</LoadingText>
          </LoadingContainer>
          }
          
          {user ?
          <section id="artists_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={6} tablet={6} mobile={12}>
                  <Title size="extra-large">These are your favorites artists</Title>
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                
                <LeftColumn 
                  description={timePeriodArtists}
                  showBy="Show artists by"
                  mostListened={totalArtists}
                  setTypeTerm={setArtistsTerm}
                  typeTerm={artistsTerm}
                  handlerButton={handleArtistButton}
                  sectionTitle="Artists"
                  data={artists}
                  type="artists"
                />
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {artists ? 
                    artists && artists.map((artist, index) => (<ArtistCard key={artist.id} data={artist} index={index} token={token} gridSize={3} refreshToken={refreshToken}/>))
                  : 
                    <Col desktop={12} tablet={6} mobile={12}>
                      <LoadingContainerSection>
                        <LoadingImage src="/loading.gif" alt="loading" />
                        <LoadingText>Just loading...</LoadingText>
                      </LoadingContainerSection>
                    </Col>
                  }
                </Grid>
                
              </Col>
            </Grid>
          </section>  
          : null }

          {user ?
          <section id="tracks_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={6} tablet={6} mobile={12}>
                  <Title size="extra-large">These are your favorites tracks</Title>
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <LeftColumn 
                  description={timePeriodTracks}
                  showBy="Show tracks by"
                  mostListened={totalTracks}
                  setTypeTerm={setTracksTerm}
                  typeTerm={tracksTerm}
                  handlerButton={handleTracksButton}
                  token={token}
                  refreshToken={refreshToken}
                  createPlaylist={true}
                  tracks={tracks}
                  sectionTitle="Tracks"
                  data={tracks}
                  type="tracks"
                />
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {tracks ? 
                    tracks && tracks.map((track, index) => (<TrackCard key={track.id} data={track} index={index} token={token} refreshToken={refreshToken} gridSize={3} setToken={setToken} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} blink={blink} setBlink={setBlink} activeDevices={activeDevices}/>))
                  : 
                  <Col desktop={12} tablet={6} mobile={12}>
                    <LoadingContainerSection>
                      <LoadingImage src="/loading.gif" alt="loading" />
                      <LoadingText>Just loading...</LoadingText>
                    </LoadingContainerSection>
                  </Col>
                  }
                </Grid>
              </Col>
            </Grid>
          </section>
          : null }

          {user ?
          <section id="albums_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={7} tablet={6} mobile={12}>
                  <Title size="extra-large">These are your favorites albums</Title>
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <LeftColumn 
                    description={timePeriodAlbums}
                    showBy="Show albums by"
                    mostListened={totalAlbums}
                    setTypeTerm={setAlbumsTerm}
                    typeTerm={albumsTerm}
                    handlerButton={handleAlbumsButton}
                    sectionTitle="Albums"
                    data={albums}
                    type="albums"
                  />
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {albums ? 
                    albums.map((album, index) => (<AlbumCard key={album.id} data={album} index={index} token={token} gridSize={3} imageSizeLarge refreshToken={refreshToken} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} setBlink={setBlink} blink={blink} activeDevices={activeDevices} />))
                  :
                  <Col desktop={12} tablet={6} mobile={12}>
                    <LoadingContainerSection>
                      <LoadingImage src="/loading.gif" alt="loading" />
                      <LoadingText>Just loading...</LoadingText>
                    </LoadingContainerSection>
                  </Col>
                  }
                </Grid>
              </Col>
            </Grid>
          </section>  
          : null }

          {user ?
          <section id="genres_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={7} tablet={6} mobile={12}>
                  <Title size="extra-large">These are your favorites genres</Title>
              </Col>
            </Grid>
            <Grid colGap={30} rowGap={40}>
              <Col desktop={3} tablet={6} mobile={12}>
                <LeftColumn 
                    description={timePeriodGenres}
                    showBy="Show genres by"
                    mostListened={totalGenres}
                    setTypeTerm={setGenresTerm}
                    typeTerm={genresTerm}
                    handlerButton={handleGenresButton}
                    sectionTitle="Genres"
                    data={genres}
                    type="genres"
                />
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={60} rowGap={40}>
                  {genres ?
                    genres && genres.map((genre, index) => (<TopGenresCard key={genre} genre={genre} token={token} index={index} gridSize={3} refreshToken={refreshToken} />))
                  :
                  <Col desktop={12} tablet={6} mobile={12}>
                    <LoadingContainerSection>
                      <LoadingImage src="/loading.gif" alt="loading" />
                      <LoadingText>Just loading...</LoadingText>
                    </LoadingContainerSection>
                  </Col>
                  }
                </Grid>
              </Col>
            </Grid>
          </section>  
          : null }

          {user ?
          <section id="recommendations_section">             
            <Grid colGap={30} rowGap={40}>
              <Col desktop={6} tablet={6} mobile={12}>
                  <Title size="extra-large">Recommendations</Title>
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
                <LeftColumn 
                    description={recommendationsDescription}
                    showBy="Show recommendations by"
                    mostListened={recommendationsArtistsNames}
                    setTypeTerm={setRecommendationsTerm}
                    typeTerm={recommendationsTerm}
                    handlerButton={handleRecommendationsButton}
                    sectionTitle="Recommendations"
                    data={recommendations}
                    type="recommendations"
                    setNewRec={setNewRec}
                    newRec={newRec}
                    isRecommendation
                />
              </Col>
              <Col desktop={9} tablet={6} mobile={12}>
                <Grid colGap={30} rowGap={40}>
                  {recommendations ?
                    recommendations.map((track, index) => (<TrackCard key={track.id} data={track} token={token} gridSize={3} playingRightNow={playingRightNow} setPlayingRightNow={setPlayingRightNow} margin="20px 0 5px 0" blink={blink} setBlink={setBlink} refreshToken={refreshToken} activeDevices={activeDevices}/>))
                  :
                  <Col desktop={12} tablet={6} mobile={12}>
                    <LoadingContainerSection>
                      <LoadingImage src="/loading.gif" alt="loading" />
                      <LoadingText>Just loading...</LoadingText>
                    </LoadingContainerSection>
                  </Col>
                  }
                </Grid>
              </Col>
            </Grid>
          </section>
          : null }

           <Footer />

          </Inner>
          </MasterContainer>
          </SuperContainer>
        </div>
      )
}
    

export default Home