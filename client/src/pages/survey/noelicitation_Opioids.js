import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import { Divider, Typography, Container } from "@mui/material";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { useRecoilValue } from "recoil";
import { questionState } from "../../atoms/questionSelector";
import "survey-react/survey.css";

const Noelicitation_Opioids = (props) => {
  const quizResponses = useRef([]);
  const history = useHistory();
  const location = useLocation();
  const questionCondition = useRecoilValue(questionState);
  // console.log(questionCondition);
  const extraQuestions =
    questionCondition == "strength"
      ? [
          
        ]
      : [];

  const json = {
    pages: [
      {
        elements: [
          {
            type: "html",
            html: "<p style='font-size: 22px;'><p style='font-size: 22px;'>👉👉👉<span style='font-weight: bold; color:gray;'> Article 3.</span> Since 2002, the <span style='font-weight: bold;'>number</span> of Americans who have died every year from overdoses of <span style='font-weight: bold;'>synthetic opioids...</span>  </p>",
           
          },
            {
              name: "",
              type: "radiogroup",
              title: "",
              // isRequired: true,
              // choices: ["yes", "no"],
              },
              {
                type: "html",
                name: "image_and_text",
                html: "<div style='text-align: center'><img src='https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/d.JPG' width='80%' height='100%' /><br/><br/><p style='text-align: justify'>...has increased by more than <span style='font-weight: bold;'> 5451 percent </span>. Substance use disorders refers to direct deaths from overdoses of illicit drugs synthetic opioids (mostly fentanyl).  “We know that substance use is more dangerous than it has ever been, as fentanyl has continued to permeate the illicit drug supply, increasing the risk for overdoses among both people with substance use disorders as well as those who use drugs occasionally,” said Dr. Nora Volkow, director of the National Institute on Drug Abuse. Deaths involving synthetic opioids such as fentanyl increased by a marked 18% in 2021, according to the CDC data. Deaths involving cocaine and psychostimulants such as methamphetamine were also significantly more frequent, while those involving heroin decreased.</p></div>",
            },
          
        ],
      },
    ],
  };

  var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
  defaultThemeColors["$main-color"] = "black";
  defaultThemeColors["$main-hover-color"] = "lightgrey";
  defaultThemeColors["$text-color"] = "#4a4a4a";
  defaultThemeColors["$header-color"] = "#7ff07f";

  defaultThemeColors["$header-background-color"] = "#4a4a4a";
  defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

 

  Survey.StylesManager.applyTheme();


  const onComplete = (survey, options) => {
 
    console.log("Survey results: " + JSON.stringify(quizResponses.current));
    axios.post("/api/noelicitation_Opioids", quizResponses.current).then((response) => {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    });
  };

  

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  model.questionTitleTemplate = "";
  model.showQuestionNumbers = "none";
 

  return (
    <Container
      maxWidth={false}
      style={{
        width: "100%",
        overflow: "auto",
        height: "100%",
        paddingTop: "30px",
        paddingBottm: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">
          How Bad Is the   <span style={{ fontWeight: "bold" }}> Drug Overdose</span> Epidemic?   
        </Typography>
        <Divider></Divider>
        
      </div>
      <Divider></Divider>
      <Survey.Survey
        model={model}
        onComplete={onComplete}
       
      />
    </Container>
  );
};

export default Noelicitation_Opioids;
