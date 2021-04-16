import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content:flex-start;
    flex-direction:column;

    @media (max-width: 480px) {
        align-items:center;
    }
`

const GenreTitle = styled.h1`
    //font-size:26px;
    font-size:24px;
    margin:0;
    color: #47ffbb;
    position:relative;

    @media (max-width: 768px) {
        font-size:20px;
    }

    @media (max-width: 480px) {
        text-align:center;
    }
`

const GenrePosition = styled.h1`
    //font-size:66px;
    font-size:60px;
    margin:0;
    color: #fff;
    margin-right:20px;
    position:relative;

    @media (max-width: 768px) {
        margin-right:0;
        font-size:48px;
    }

    @media (max-width: 480px) {
        margin-right:0;
    }
`

export { Container, GenreTitle, GenrePosition }

