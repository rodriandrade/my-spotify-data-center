import { ResponsiveBar } from '@nivo/bar'
import {ChartContainer, BarDescription} from './styled'
import React, {useState, useEffect} from 'react'
import { linearGradientDef } from '@nivo/core'

const BarChart = props => {

    const { danceability, energy, speechiness, acousticness, instrumentalness, liveness, valence } = props.audioFeatures;
    const values = [danceability, energy, speechiness, acousticness, instrumentalness, liveness, valence];
    
    const newValues = values.map((value) => {
      if (Math.floor(value) !== value) {
        let decimalValue = value.toString().split(".")[1].length || 0;
        if (decimalValue === 2) {
          return Math.round(value * 10);
        } else if (decimalValue === 3) {
          return Math.round(value * 100);
        } else if (decimalValue === 4) {
          return Math.round(value * 1000);
        } else if (decimalValue === 5) {
          return Math.round(value * 10000);
        } else if (decimalValue === 6) {
          return Math.round(value * 100000);
        } else {
          return Math.round(value * 1000000);
        }
      }
    });

    const data = [
        {
            "feature": "Danceability",
            "value": newValues[0] != undefined ? newValues[0] : 0,
            "description": "describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."
        },
        {   
            "feature": "Energy",
            "value": newValues[1] != undefined ? newValues[1] : 0,
            "description": "is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."
        },
        {
            "feature": "Speechiness",
            "value": newValues[2] != undefined ? newValues[2] : 0,
            "description": "detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks."
        },
        {
            "feature": "Valence",
            "value": newValues[6] != undefined ? newValues[6] : 0,
            "description": "is a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."
        },
        {
            "feature": "Instrumentalness",
            "value": newValues[4] != undefined ? newValues[4] : 0,
            "description": "predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0."
        },
        {
            "feature": "Liveness",
            "value": newValues[5] != undefined ? newValues[5] : 0,
            "description": "detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live."
        },
        {
            "feature": "Acousticness",
            "value": newValues[3] != undefined ? newValues[3] : 0,
            "description": "is a confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic."
        }
    ];

    return(
    <ChartContainer>
        <ResponsiveBar
            data={data}
            indexBy="feature"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            maxValue={100}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                },
                {
                    id: 'gradientA',
                    type: 'linearGradient',
                    colors: [
                        { offset: 0, color: '#1E0358' },
                        { offset: 100, color: '#68F4DB' },
                    ],
                },
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                },
                { match: '*', id: 'gradientA' },
            ]}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Spotify Data',
                legendPosition: 'middle',
                legendOffset: 45
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Percentage',
                legendPosition: 'middle',
                legendOffset: -50
            }}
            enableGridY={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            tooltip={(point) => {
                return (
                <BarDescription>
                  <strong>{point.data.feature}</strong> {point.data.description}
                </BarDescription>
              )}}
        />
    </ChartContainer>
    )
}

export default BarChart