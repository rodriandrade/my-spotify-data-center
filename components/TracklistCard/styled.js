import styled from 'styled-components'

const TrackPlay = styled.img`
    max-width:18px;
    max-height:18px;
    margin:0 20px;
    cursor:pointer;
    opacity:0;
`

const ContainerTrack = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width:100%;
    justify-content:space-between;
    border-bottom:1px solid rgb(20,20,20);

    ::last-child{
        border-bottom:none;
    }

    &:hover ${TrackPlay} {
        opacity: 1;
    }

    
`

const ContainerTrackData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
    position: relative;
`

const TrackName = styled.p`
    font-size:14px;
    color:#fff;
    cursor: pointer;
    position: relative;

    :hover{
        text-decoration:underline 1px solid #47ffbb;
    }

    @media (max-width: 480px) {
        font-size:16px;
    }
`

const TrackNumber = styled.p`
    font-size:14px;
    color:#fff;
    margin-right:10px;
    position: relative;

    @media (max-width: 480px) {
        font-size:16px;
    }
`

const TrackDuration = styled.p`
    font-size:14px;
    color:#fff;
    margin:0 20px;
    position: relative;

    @media (max-width: 480px) {
        font-size:16px;
    }
`

const TrackSave = styled.img`
    max-width:18px;
    max-height:18px;
    margin:0 20px;
    cursor:pointer;
    position: relative;
`



export { ContainerTrack, ContainerTrackData, TrackDuration, TrackNumber, TrackSave, TrackName, TrackPlay }