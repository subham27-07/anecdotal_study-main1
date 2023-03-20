// import React from 'react';
// import LineChartFunc from './LinChartFunc';
// // import Random from 'react-random';

// import { populationData, drugOverdoseData, opioidsData, hivData, gunData, cocaineData, heroinData, italyData,southAfricaData } from './datasets';


// const chartTypes ={
//     drugOverdose:
//         {
//             lineData: drugOverdoseData,
//             scaleType: 'number'
//         },
//     population:
//         {
//             lineData: populationData,
//             scaleType: 'percentage'
//         },
//     italy:
//         {
//             lineData: italyData,
//             scaleType: 'percentage'
//         },
//     southAfrica:
//         {
//             lineData: southAfricaData,
//             scaleType: 'percentage'
//         },
//     opioids:
//             {
//                 lineData: opioidsData,
//                 scaleType: 'number'
//             },
//     hiv:
//             {
//                 lineData: hivData,
//                 scaleType: 'number'
//             },
//     gun:
//             {
//                 lineData: gunData,
//                 scaleType: 'number'
//             },
//     cocaine:
//             {
//                 lineData: cocaineData,
//                 scaleType: 'number'
//             },
//     heroin:
//             {
//                 lineData: heroinData,
//                 scaleType: 'number'
//             }
// }

// export default function LineChartDrawHandler (props) {
//     // const completed = props.interactionStep !== ''

//   const articleName=props.articleName;
  
//   function dataHandler(){
//         let lineData = chartTypes[`${props.alias}`].lineData
//         console.log(lineData)
//         return lineData
//         // return chartTypes[`${props.alias}`].lineData;
//     }
    


//     function scaleTypeHandler(){
//         return chartTypes[`${props.alias}`].scaleType;
//     }




//   return (
  
//         <div style={{ width: "100%"}}>
//         <LineChartFunc
//             type="value" scaleType={scaleTypeHandler()} data={dataHandler()} idLine={1} startYear={2002}
//             articleName={props.articleName}
//             visStep={props.visStep}
//             handleVisState = {props.handleVisState}
//             article = {props.article}
//             completed = {props.completed}
//             responses = {props.responses}
//             elicitationType ={props.elicitationType}
//             alias = {props.alias}
//         />
//         </div>

//   );
// }

import React from 'react';
import LineChartFunc from './LinChartFunc';

import { populationData, drugOverdoseData, opioidsData, hivData, gunData, cocaineData, heroinData, italyData,southAfricaData } from './datasets';

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
            },
    italy:
                    {
                        lineData: italyData,
                        scaleType: 'percentage'
                    },
    southAfrica:
                    {
                        lineData: southAfricaData,
                        scaleType: 'percentage'
                    },
    hiv:
                                {
                                    lineData: hivData,
                                    scaleType: 'number'
                                },
    gun:
                                {
                                    lineData: gunData,
                                    scaleType: 'number'
                                },
    cocaine:
                                {
                                    lineData: cocaineData,
                                    scaleType: 'number'
                                },
    heroin:
                                {
                                    lineData: heroinData,
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
