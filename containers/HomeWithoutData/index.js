import TypingEffect from '../../components/TypingEffect'
import {Grid, Col} from '../../components/Grid'
import {MainButton, ContainerHero} from './styled'
import ParticlesBackground from '../../components/ParticlesBackground'
import Inner from '../../components/Inner'


const HomeWithoutData = () =>{

    //  {!user && <a href="http://localhost:8888/login"></a>
      // {!user && <a href="https://spotify-server-seven.vercel.app/login">

    return(
        <div> 
              <ParticlesBackground />
              <section id="home_section">
                <Inner>
                <Grid colGap={30} rowGap={40}>
                  <Col desktop={12} tablet={6} mobile={12}>
                    <ContainerHero>
                      <TypingEffect title/>
                        <a href="http://localhost:8888/login">
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