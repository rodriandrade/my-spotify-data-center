import { ResponsiveBar } from '@nivo/bar'
import ChartContainer from './styled'
import React, {useState, useEffect} from 'react'
import { linearGradientDef } from '@nivo/core'

const BarChart = props => {

    console.log(props.audioFeatures)
    const { danceability, energy, speechiness, acousticness, instrumentalness, liveness, valence } = props.audioFeatures;
    const values = [danceability, energy, speechiness, acousticness, instrumentalness, liveness, valence];
    //const newValues = [];
    console.log(values);
        const newValues = values.map((value) => {
            if (Math.floor(value) !== value){
                let decimalValue = value.toString().split(".")[1].length || 0;
                if(decimalValue === 2){
                    return (Math.round(value * 10))
                    //newValues.push(Math.round(value * 10))
                } else if(decimalValue === 3){
                    return (Math.round(value * 100))
                    //newValues.push(Math.round(value * 100))
                } else if(decimalValue === 4){
                    return (Math.round(value * 1000))
                    //newValues.push(Math.round(value * 1000))
                } else if(decimalValue === 5){
                    return (Math.round(value * 10000))
                    //newValues.push(Math.round(value * 10000))
                } else if(decimalValue === 6){
                    return (Math.round(value * 100000))
                    //newValues.push(Math.round(value * 100000))
                } else{
                    return (Math.round(value * 1000000))
                    //newValues.push(Math.round(value * 1000000))
                }
            }
        });
    console.log(newValues);

    const data = [
        {
            "feature": "Danceability",
            "value": newValues[0]
        },
        {   
            "feature": "Energy",
            "value": newValues[1]
        },
        {
            "feature": "Speechiness",
            "value": newValues[2]
        },
        {
            "feature": "Valence",
            "value": newValues[6]
        },
        {
            "feature": "Instrumentalness",
            "value": newValues[4]
        },
        {
            "feature": "Liveness",
            "value": newValues[5]
        },
        {
            "feature": "Acousticness",
            "value": newValues[3]
        }
    ];
    console.log(data);

    return(
    <ChartContainer>
        <ResponsiveBar
            data={data}
            keys={[ 'value' ]}
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
        />
    </ChartContainer>
    )
}

export default BarChart