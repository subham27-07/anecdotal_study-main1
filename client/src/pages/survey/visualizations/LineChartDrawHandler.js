import React, {lazy,Suspense} from 'react';


import { populationData, drugOverdoseData, opioidsData } from './datasets';

const LineChart = lazy(() => import('./LineChartDraw'));


export default function LineChartDrawHandler(props){
    
  let lineData ;
  const articleName=props.articleName;
  let scaleType;
  switch (articleName){

    case "drugOverdose":
        lineData = drugOverdoseData;
        scaleType='number';
        break;

    case "population":
        lineData = populationData;
        scaleType='percentage';
        break;
    
    case "opioids":
        lineData = opioidsData;
        scaleType='number';
    
  }

  return (
  
        <div style={{ width: "100%"}}>
       
       <Suspense fallback={<div>loading...</div>}>
            <LineChart type="value" scaleType={scaleType} data={lineData} idLine={1} startYear={2002}/>
          </Suspense>

        </div>

  );
}
