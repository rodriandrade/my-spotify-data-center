import styled from 'styled-components'

const Text = styled.span`
    //font-size:72px;
    font-size:64px;
    font-weight:bold;
    font-family: Poppins;
    margin-bottom:60px;
    position:relative;

    span{
        color:#47ffbb
    }

    @media (max-width: 480px) {
        font-size:36px;
        text-align:center;
    }
`

const TextContainer = styled.div`
    
    @media (max-width: 480px) {
        text-align:center;
    }
`

export {Text, TextContainer}