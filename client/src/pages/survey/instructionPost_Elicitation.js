// import React, {useRef, lazy, Suspense, useState} from 'react';
//
//
// import {useHistory, useLocation} from "react-router-dom";
// import pageHandler from "../pageHandler";
// import axios from "axios";
// import * as Survey from "survey-react";
// // import { Divider, Typography, Container, Button } from "@mui/material";
// import {Divider, Typography, Container, Button} from "@mui/material";
// import {useRecoilValue} from "recoil";
// import {questionState} from "../../atoms/questionSelector";
// import styles from '../articles/articles.module.css'
// import "survey-react/survey.css";
// import LineChartBitcoin from "./visualizations/LineChartVisual_bitcoin";
// // import styles from "./articles.module.css";
//
// const LineChart = lazy(() => import('./visualizations/LineChartVisual_bitcoin'));
//
// const InstructionPost_Elicitation = (props) => {
//     const lineData = [
//         {
//             id: 1,
//             value: 16819,
//             year: 2014,
//         },
//         {
//             id: 1,
//             value: 18819,
//             year: 2015,
//         },
//         {
//             id: 1,
//             value: 23518,
//             year: 2016,
//         },
//         {
//             id: 1,
//             value: 25518,
//             year: 2017,
//         },
//         {
//             id: 1,
//             value: 28518,
//             year: 2018,
//         },
//         {
//             id: 1,
//             value: 30518,
//             year: 2019,
//         },
//         {
//             id: 1,
//             value: 32518,
//             year: 2020,
//         },
//         {
//             id: 1,
//             value: 35518,
//             year: 2021,
//         },
//         {
//             id: 1,
//             value: 40518,
//             year: 2022,
//         },
//
//     ];
//
//     const [isCorrect, setIsCorrect] = useState(false);
//     // const quizResponses = useRef([]);
//
//     // const [clipAnimation, setClipAnimation] = useState(false);
//
//     // const handleShowAnimation = () => {
//     //   setClipAnimation(true);
//     // };
//     const quizResponses = useRef([]);
//     const history = useHistory();
//     const location = useLocation();
//     const questionCondition = useRecoilValue(questionState);
//     // console.log(questionCondition);
//     const extraQuestions =
//               questionCondition == "strength"
//                   ? []
//                   : [];
//
//     const json = {
//         pages: [
//
//             {
//                 elements: [
//                     {
//                         type: "html",
//                         html: "<p style='font-size: 18px;'><span style='font-weight: bold;'>Congratulations! You succeeded...</span> Please click on Complete</p>",
//
//                     },
//
//
//                 ],
//             },
//         ],
//     };
//
//     var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
//     defaultThemeColors["$main-color"] = "black";
//     defaultThemeColors["$main-hover-color"] = "darkorange";
//     defaultThemeColors["$text-color"] = "#4a4a4a";
//     defaultThemeColors["$header-color"] = "#7ff07f";
//
//     defaultThemeColors["$header-background-color"] = "#4a4a4a";
//     defaultThemeColors["$body-container-background-color"] = "#f8f8f8";
//
//     const correctStr = "Correct";
//     const inCorrectStr = "Incorrect";
//
//     Survey.StylesManager.applyTheme();
//
//     const onCompleting = (survey, options) => {
//         // console.log(options);
//         let allTrue = true;
//         survey.getAllQuestions().forEach((q) => {
//
//         });
//         quizResponses.current.push(survey.data);
//         if (allTrue) {
//             options.allowComplete = true;
//         } else {
//             options.allowComplete = false;
//         }
//     };
//
//
//     const [visCompleted, setVisCompleted] = useState(false);
//
//     function visStateHandler() {
//         setVisCompleted((prevState) => !prevState);
//         console.log('VisStateHandler triggered', visCompleted);
//     }
//
//
//     function PageContentHandler() {
//         // console.log('PageContentHandler triggered!', visCompleted)
//         if (visCompleted) {
//             return (
//                 <div className={styles.surveyContainer}><Survey.Survey
//                     model={model}
//                     onComplete={() => {
//                         let nextPage = pageHandler(props.pages, location.pathname);
//                         history.push(nextPage);
//                     }}
//                     onCompleting={onCompleting}
//                     onCurrentPageChanging={onCurrentPageChanging}
//
//                 />
//                 </div>)
//         } else {
//             return ("")
//         }
//
//     }
//
//     const onComplete = (survey, options) => {
//         // console.log("Survey results: " + JSON.stringify(quizResponses.current));
//         axios.post("/api/recall_drugOverdose", quizResponses.current).then((response) => {
//             let nextPage = pageHandler(location.pathname);
//             history.push(nextPage);
//         });
//     };
//
//     const onCurrentPageChanging = (survey, option) => {
//         if (!option.isNextPage) return;
//         let allTrue = true;
//         // survey.getAllQuestions().forEach((q) => {
//         //   // if (survey.currentPage == q.page) {
//         //   //
//         //   // }
//         // });
//         // console.log(allTrue);
//         if (allTrue) {
//             option.allowChanging = true;
//         } else {
//             option.allowChanging = false;
//         }
//     };
//
//     function getTextHtml(text, str, isCorrect) {
//         if (text.indexOf(str) < 0) return undefined;
//         return (
//             text.substring(0, text.indexOf(str)) +
//             "<span style='color:" +
//             (isCorrect ? "green" : "red") +
//             "'>" +
//             str +
//             "</span>"
//         );
//     }
//
//
//     const model = new Survey.Model(json);
//     model.showCompletedPage = false;
//     model.onTextMarkdown.add((sender, options) => {
//         var text = options.text;
//         var html = getTextHtml(text, correctStr, true);
//
//     });
// function handleIsCorrect(){
//     setIsCorrect(prev=>!prev);
// }
//
// function createAlert(){
//     if(isCorrect){
//         return (<div className={styles.messageContainer}>
//             <div className={styles.messageCorrect}>
//                 Success! Your answer is correct. You may now proceed to the next page.
//             </div>
//         </div> )
//     }
//     else{
//         return(<div className={styles.messageContainer}>
//             <div className={styles.messageWrong}>
//                 Please make sure that the data for the last year (2022) is <b>higher</b> than the data for the year (2017).
//             </div>
//         </div> )
//     }
// }
//     return (
//         <Container
//             maxWidth={false}
//
//             className={styles.mainContainer}
//         >
//             <div
//
//                 className={styles.articleContainer}
//             >
//                 <div className={styles.articleStructure}>
//
//                     <Typography variant="h3">
//                   <span>Now we ask you to   <span
//                       style={{fontWeight: "bold"}}> practice drawing </span> a timeline in the chart below</span>
//                     </Typography>
//
//                     <Typography variant={"body1"}>
//                         <p>Please draw an <span
//                             className={styles.txtImportant}>Increasing trend after year 2017</span> You can adjust
//                            individual data point after drawing the line as needed by dragging the data points. You will
//                            be only allowed to proceed further if the end data is higher than the data point of the year
//                            2017.
//                             <span className={styles.txtImportant}> </span></p>
//                     </Typography>
//
//                 </div>
//
//             </div>
//             <div className={styles.navigationContainer}>
//                 <div className="viz" style={{
//                     display: "flex",
//                     flexDirection: "column"
//                 }}>
//                     <div style={{
//                         width: "100%",
//                         margin: "0 auto"
//                     }}>
//                         <Suspense fallback={<div>loading...</div>}>
//                             <LineChartBitcoin type="value" data={lineData} idLine={1} startYear={2016} visState={visCompleted}
//                                        stateHandler={visStateHandler} isCorrect={isCorrect}
//                                        handleIsCorrect={handleIsCorrect}/>
//                         </Suspense>
//                     </div>
//                     <div style={{marginLeft: '100px'}}>
//                         {PageContentHandler()}
//                     </div>
//                     {createAlert()}
//
//                 </div>
//
//             </div>
//         </Container>
//
//     );
// }
//
// export default InstructionPost_Elicitation;
//
//
//


// articleName={props.articleName}
// visStep={props.visStep}
// handleVisState = {props.handleVisState}
// article = {props.article}
// completed = {props.completed}
// responses = {props.responses}

import React, {useEffect, useRef, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import styles from '../articles/articles.module.css'
import LineChartDrawHandler from "./visualizations/LineChartDrawHandler";
import pageHandler from "../pageHandler";

const articleContent = {
    title: ' Now we ask you to practice drawing a timeline in the chart below',
    articles: [{
        name: "bitcoin",
        id: "One",
        text: {
            subTitle: "Please draw an increasing trend after year 2017. You can adjust individual data point after" +
                " drawing the line as needed by dragging the data points. You will be only allowed to proceed" +
                " further if the end data is higher than the data point of the year 2017.",
            subTitle2: "",

            body: '',
            instructions: "",
            definitions: "",
        }
    }]}




export default function InstructionPost_Elicitation(){
    const history = useHistory();
    const location = useLocation();
    const [visStep, setVisStep] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const userResponse = useRef({
        responses: {}
    });

    useEffect(()=>{
        handleUserResponse();
        handleIsComplete();
    },[visStep])
    function handleVisStep(){
        setVisStep(prev=>prev+1);
    }

    function handleOnclick(){
        let nextPage = pageHandler(location.pathname);
            history.push(nextPage);
    }

    function handleUserResponse(){
        if(userResponse.current && userResponse.current[1] <= userResponse.current[-1] ){
            setIsCorrect(prev =>  true);
        }else{
            setIsCorrect(prev =>  false);
        }
    }

    function handleIsComplete(){
        if(isCorrect){
            setCompleted(prev=>true);
        }else{
            setCompleted(prev=>false);
        }
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.articleStructure}>
                <div className={styles.title}>
                    {`${articleContent.title}`}
                </div>
                <div className={styles.subtitle}>
                    {`${articleContent.articles[0].text.subTitle}`}
                </div>
                <div className={styles.articleImageContainer}>
                    <LineChartDrawHandler
                    articleName = 'bitcoin'
                    visStep = {visStep}
                    handleVisState={handleVisStep}
                    article ={0}
                    responses = {userResponse}
                    visType = {'instructions'}

                    />
                </div>
            </div>
            <div className={styles.navigationContainer}>
                <button type={'button'} className={styles.actions} onClick={handleOnclick} disabled={isCorrect && completed}>
                    Next
                </button>
            </div>
        </div>
    )
}