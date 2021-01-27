import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ArtistCard from '../../components/artistCard'
import TrackCard from '../../components/trackCard'
import RecentlyPlayedCard from '../../components/RecentlyPlayedCard'
import CurrentlyPlayingCard from '../../components/currentlyPlayingCard'
import PlaylistCard from '../../components/PlaylistCard'
import TopGenres from '../../components/TopGenres'
import {Grid, Col} from '../../components/Grid/index'
import Button from '../../components/Button'
import Title from '../../components/Title'
import Modal from '../../components/Modal'
import ParticlesBackground from '../../components/ParticlesBackground'
import Inner from '../../components/Inner'

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
      
      const [tracksTerm, setTracksTerm] = useState('short_term');
      const [artistsTerm, setArtistsTerm] = useState('short_term');
      const [tracks, setTracks] = useState([]);
      const [artists, setArtists] = useState([]);
      const [recentlyPlayed, setRecentlyPlayed] = useState([]);
      const [playing, setPlaying] = useState([]);
      const [playlists, setPlaylists] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
  
            if(params.access_token){
              const access_token = params.access_token;
              const refresh_token = params.refresh_token;
              const client_id = '1b015d21997143e28e0724a9646dedd3';
              const client_secret = '732b088b97ba44ecb86a96a290f1f8e4'
              try {

                /*
                var refresh_token = req.query.refresh_token;
                var authOptions = {
                  url: 'https://accounts.spotify.com/api/token',
                  headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
                  form: {
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token
                  },
                  json: true
                };
              
                request.post(authOptions, function(error, response, body) {
                  if (!error && response.statusCode === 200) {
                    var access_token = body.access_token;
                    res.send({
                      'access_token': access_token
                    });
                  }
                });
                */

                /*
               axios({
                 method: 'post',
                 headers: { 
                   'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                   'Content-Type': 'application/x-www-form-urlencoded'
                },
                 url: 'https://accounts.spotify.com/api/token',
                 data: {
                  grant_type: 'refresh_token',
                  refresh_token: refresh_token
                },
                json: true,
                params: {
                  grant_type: 'client_credentials'
                },
               })
               .then(function (response) {
                console.log(response.data)
              });
              */

              /*
               $.ajax({
                url: '/refresh_token',
                data: {
                  'refresh_token': refresh_token
                }
                }).done(function(data) {
                  access_token = data.access_token;
                  oauthPlaceholder.innerHTML = oauthTemplate({
                    access_token: access_token,
                    refresh_token: refresh_token
                  });
                });
                */
              
                /*
                  const refreshUrl = `https://accounts.spotify.com/api/token`;
                  axios({
                    method: 'post',
                    url: refreshUrl,
                    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
                    form: {
                      grant_type: 'refresh_token',
                      refresh_token: refresh_token
                    },
                    json: true
                  })
                  .then(function (response) {
                    console.log("Holanda", response);
                  });
                  */

                  const responsePlaylists = await axios.get(`https://api.spotify.com/v1/me/playlists?limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  const responsePlaying = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  const responseArtists = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${artistsTerm}&limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  const responseTracks = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${tracksTerm}&limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
                  const responseRecentlyPlayed = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
                    headers: {
                      'Authorization': 'Bearer ' + access_token
                    }
                  });
    
                  setPlaylists(responsePlaylists.data.items);
                  setPlaying(responsePlaying.data.item);
                  setArtists(responseArtists.data.items);
                  setTracks(responseTracks.data.items);
                  setRecentlyPlayed(responseRecentlyPlayed.data.items);

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
    
    //console.log(params)
      // 
      return (
        
        <div>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          
            <Inner>
              {playing ? (
              <Title size="h1">My Spotify Data Center</Title>
              ) : <p>Loading</p>}
    
                <a href="http://localhost:8888">
                  <button>Login with Spotify</button>
                </a>
                
              {playing && <Title>Currently Playing</Title>}
              {playing && <CurrentlyPlayingCard data={playing} />}

              {artists && <Title>Artists</Title>}
              <button onClick={ () => setArtistsTerm('short_term')}>Past 4 weeks</button>
              <button onClick={ () => setArtistsTerm('medium_term')}>6 months</button>
              <button onClick={ () => setArtistsTerm('long_term')}>Several years</button>
              <Grid colGap={30} rowGap={40}>
                {artists.map((artist, index) => (<ArtistCard key={artist.id} data={artist} index={index} token={params.access_token} />))}
              </Grid>

              {tracks && <Title>Tracks</Title>}
              <button onClick={ () => setTracksTerm('short_term')}>Past 4 weeks</button>
              <button onClick={ () => setTracksTerm('medium_term')}>6 months</button>
              <button onClick={ () => setTracksTerm('long_term')}>Several years</button>
              <Grid colGap={30} rowGap={40}>
                {tracks.map((track, index) => (<TrackCard key={track.id} data={track} index={index} token={params.access_token}/>))}
              </Grid>
              <button onClick={createPlaylist}>Create playlist</button>

              {recentlyPlayed && <Title>Recently Played</Title>}
              {recentlyPlayed.map((track) => (<RecentlyPlayedCard key={track.id} data={track} token={params.access_token} />))}
    
              {playlists && <Title>Playlists</Title>}
              <Grid colGap={30} rowGap={40}>
                {playlists && playlists.map((playlist) => (<PlaylistCard key={playlist.id} data={playlist} />))}
              </Grid>

            </Inner>
          
        </div>
      )
}
    

export default Home