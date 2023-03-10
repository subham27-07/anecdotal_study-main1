import React from 'react';
import LineChartFunc from './LinChartFunc';

import { populationData, drugOverdoseData, opioidsData } from './datasets';

const chartTypes ={
    drugOverdose:
        {
            lineData: drugOverdoseData,
            scaleType: 'number'
        },
    population:
        {
            lineData: populationData,
            scaleType: 'percentage'
        },
        opioids:
            {
                lineData: opioidsData,
                scaleType: 'number'
            }
}

export default function LineChartDrawHandler (props) {

  const articleName=props.articleName;
  function dataHandler(){
        return chartTypes[`${props.alias}`].lineData;
    }

    function scaleTypeHandler(){
        return chartTypes[`${props.alias}`].scaleType;
    }

  return (
  
        <div style={{ width: "100%"}}>
        <LineChartFunc
            type="value" scaleType={scaleTypeHandler()} data={dataHandler()} idLine={1} startYear={2002}
            articleName={props.articleName}
            visStep={props.visStep}
            handleVisState = {props.handleVisState}
            article = {props.article}
            completed = {props.completed}
            responses = {props.responses}
            elicitationType ={props.elicitationType}
            alias = {props.alias}
        />
        </div>

  );
}

