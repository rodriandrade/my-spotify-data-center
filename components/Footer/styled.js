import styled from 'styled-components'

const Container = styled.footer`
    display: flex;
    flex-direction: row; 
    align-items: center;
    border-top: 1px solid rgb(20, 20, 20);
    padding:30px;
    justify-content: center;
    margin-top:80px;
    background-color:rgb(5,5,5)
`

const SocialMediaContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width:250px;
`

const IconSocial = styled.img`
    width:26px;
`

export {SocialMediaContainer, IconSocial, Container}