import TypingEffect from '../../components/TypingEffect'
import {Grid, Col} from '../../components/Grid'
import {MainButton, ContainerHero} from './styled'
import ParticlesBackground from '../../components/ParticlesBackground'
import Inner from '../../components/Inner'
import Head from 'next/head'

const HomeWithoutData = () =>{

    //  {!user && <a href="http://localhost:8888/login"></a>
      // {!user && <a href="https://spotify-server-seven.vercel.app/login">

    return(
        <div> 
              <Head>
                  <title>My Spotify Data Center</title>
                  <link rel="icon" href="/favicon.ico" />
              </Head>
              <ParticlesBackground />
              <div id="background"></div>
              <section id="home_section">
                <Inner>
                <Grid colGap={30} rowGap={40}>
                  <Col desktop={12} tablet={6} mobile={12}>
                    <ContainerHero>
                      <TypingEffect title/>
                        <a href="https://spotify-server-seven.vercel.app/login">
                            <MainButton>Login with Spotify</MainButton>
                        </a>
                    </ContainerHero>
                  </Col>
                </Grid>
                </Inner>
              </section>
        </div>
    )
}

export default HomeWithoutData