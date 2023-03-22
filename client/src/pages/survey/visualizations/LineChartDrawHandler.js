import React,{useEffect, useState} from 'react';
import LineChartFunc from './LinChartFunc';
import styles from '../articles.module.css'
import { populationData, drugOverdoseData, opioidsData, hivData, gunData, cocaineData, heroinData, italyData,southAfricaData } from './datasets';
import RecallSurvey from '../../../components/recallSurvey/RecallSurvey';

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

  const[showArticle,setShowArticle]=useState(false)
  const handleShowArticle = ()=>{
    setShowArticle(true)
  }

  console.log('ShowArticle',showArticle)

  useEffect(()=>{
    if(props.elicitationStep===0){
        setShowArticle(false)
    }
  },[props.elicitationStep])

  const makeImportant = props.makeImportant
  function dataHandler(){
        return chartTypes[`${props.alias}`].lineData;
    }

    function scaleTypeHandler(){
        return chartTypes[`${props.alias}`].scaleType;
    }

  return (
    
  
        <div style={{ width: "100%"}}>
            <div>
                        {props.subTitle}
            </div>
        
        <LineChartFunc
            type="value" scaleType={scaleTypeHandler()} data={dataHandler()} idLine={1} startYear={2002}
            subTitle={props.subTitle}
            articleName={props.articleName}
            // visStep={props.visStep}
            // handleVisState = {props.handleVisState}
            handleElicitationStep = {props.handleElicitationStep}
            article = {props.article}
            handleShowArticle = {handleShowArticle}
            // completed = {props.completed}
            responses = {props.responses}
            body={props.body}
            elicitationType ={props.elicitationType}
            alias = {props.alias}
        />
        <div>

        {
            showArticle?
            <div>
                
                    <div className={styles.paragraph}>
                        {props.body}
                        
                        <br>
                        </br>
                        <hr/>
                        <br>
                        </br>
                        <br>
                        </br>
                    </div>
                </div>:''
        }

        

        
        </div>
     
            
        

        
        
        </div>
       

  );
}



{/* <div className={styles.articleStructure}>
        
        <div className={styles.subtitle}>
            
            
            
            <p className={styles.txtUnique}>{`${props.subTitle2}`}</p>
        </div>

</div> */}