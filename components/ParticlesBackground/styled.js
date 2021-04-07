import styled from 'styled-components'

const ParticlesCont = styled.div`
    position: fixed;
    top:0;
    z-index: 0;
    width: 100%;
    height: 100vh;

    @media (max-width: 480px) {
        #tsparticles canvas{
            min-height: 100vh;
        }
    }
`

export default ParticlesCont;