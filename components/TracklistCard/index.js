import {ContainerTrack, ContainerTrackData, TrackSave, TrackNumber, TrackDuration, TrackName} from './styled'
import axios from 'axios';
import React, {useEffect, useState} from 'react'

const TracklistCard = props =>{
    const {name, duration_ms, track_number, id} = props.data;

    // Save & unsave album
    const [saveIcon, setSaveIcon] = useState('');
    const [save, setSave] = useState();

    useEffect(() => {
        const checkSave = async () =>{
            if(props.token){
            const responseSavedTrack = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
                headers: {
                'Authorization': 'Bearer ' + props.token
                }
            });
            setSave(responseSavedTrack.data.toString());
            
            if(responseSavedTrack.data.toString() === "true"){
                setSaveIcon('/heart.svg');
              } else{
                setSaveIcon('/heart_no_fill.svg');
              }
            }
        }
        checkSave();
    }, [])

    const handleSave = async () => {
        const base_url = `https://api.spotify.com/v1/me/tracks?ids=${id}`
          axios({
            method: save === "true" ? 'delete' : 'put',
            url: base_url,
            headers: { 'Authorization': 'Bearer ' + props.token }
          })
        setSave(save === "true" ? 'false' : 'true')
        setSaveIcon(save === "true" ? '/heart_no_fill.svg' : '/heart.svg');
    }

    return(
        <>
            <ContainerTrack>
                <ContainerTrackData>
                    <TrackSave onClick={handleSave} src={saveIcon} alt="save_icon"/>
                    <TrackNumber>{track_number}.</TrackNumber>
                    <TrackName>{name}</TrackName>
                </ContainerTrackData>
                <TrackDuration>{(duration_ms / 60000).toFixed(2)}</TrackDuration>
            </ContainerTrack>
        </>
    )
}

export default TracklistCard