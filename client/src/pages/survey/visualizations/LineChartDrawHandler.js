import React, {lazy, Suspense, useState} from 'react';
import LineChartFunc from './LinChartFunc';

import { populationData, drugOverdoseData, opioidsData } from './datasets';

// const LineChart = lazy(() => import('./LineChartDraw'));
// import LineChartDraw from "./LineChartDraw";


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
        return chartTypes[`${props.articleName}`].lineData;
    }

    function scaleTypeHandler(){
        return chartTypes[`${props.articleName}`].scaleType;
    }

  console.log(props.articleName)
  return (
  
        <div style={{ width: "100%"}}>
        <LineChartFunc
            type="value" scaleType={scaleTypeHandler()} data={dataHandler()} idLine={1} startYear={2002}
            articleName={props.articleName}
            visStep={props.visStep}
            handleVisState = {props.handleVisState}
            article = {props.article}
            completed = {props.completed}

        />
       {/*<Suspense fallback={<div>loading...</div>}>*/}
       {/*     <LineChart type="value" scaleType={scaleTypeHandler()} data={dataHandler()} idLine={1} startYear={2002} showText={props.showText}/>*/}
       {/*   </Suspense>*/}

        </div>

  );
}

