import styled from 'styled-components'

const Container = styled.div`
    background-color: rgb(12,12,12);
    width:800px;
    padding:30px;
    border-radius:10px;
    margin:10px;
`

const PlaylistImage = styled.img`
    max-height:200px;
    max-width: 200px;
    :hover{
        opacity:0.6;
    }
`

const PlaylistName = styled.h4`
    font-size:16px;
    color: #fff;
    margin:0;
`

const OwnerPlaylistName = styled.p`
    font-size:12px;
    color: #47ffbb;
    margin:0;
`

export { OwnerPlaylistName, PlaylistName, PlaylistImage}