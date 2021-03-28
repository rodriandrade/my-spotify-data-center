import {Home as HomeContainer} from '../containers'
import HomeWithoutData from '../containers/HomeWithoutData'
import Title from '../components/Title'
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useToken } from '../pages/TokenContext'

export default function Home() {

  const router = useRouter()
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

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

  return (
    <div>
      <Head>
        <title>My Spotify Data Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {token ?
        <HomeContainer token={token} refreshToken={refreshToken} />
      : 
        <HomeWithoutData />
      }
    </div>
  )
}

