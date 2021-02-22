import styled from 'styled-components'

const ContainerTrack = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width:100%;
    justify-content:space-between;
    border-bottom:1px solid rgb(20,20,20)
`

const ContainerTrackData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
`

const TrackName = styled.p`
    font-size:16px;
    color:#fff;
`

const TrackNumber = styled.p`
    font-size:16px;
    color:#fff;
    margin-right:10px;
`

const TrackDuration = styled.p`
    font-size:16px;
    color:#fff;
    margin:0 20px;
`

const TrackSave = styled.img`
    max-width:20px;
    max-height:20px;
    margin:0 20px;
    cursor:pointer;
`

export { ContainerTrack, ContainerTrackData, TrackDuration, TrackNumber, TrackSave, TrackName }