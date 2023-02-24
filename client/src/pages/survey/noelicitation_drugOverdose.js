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

const Noelicitation_drugOverdose = (props) => {
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
            html: "<p style='font-size: 22px;'> 👉👉👉 <span style='font-weight: bold; color:gray;'> Article 1.</span>  Since 2002, the <span style='font-weight: bold;'>number</span> of Americans who have died every year from <span style='font-weight: bold;'>Drug Overdose</span>  </p>",
           
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
                html: "<div style='text-align: center'><img src='https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/b.JPG' width='80%' height='100%' /><br/><br/><p style='text-align: justify'>...has increased by more than <span style='font-weight: bold;'> 222.82 percent </span>.  In 2015, more Americans died from drug overdoses than from car accidents and gun homicides combined. It’s the worst drug overdose epidemic in American history, spurred by rising drug abuse, increased availability of prescription opioids and an influx of Drug Overdose potent synthetics like fentanyl and carfentanil. Drug overdoses are now the leading cause of death for Americans under 50.</p></div>",
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

  const correctStr = "Correct";
  const inCorrectStr = "Incorrect";

  Survey.StylesManager.applyTheme();

  const onComplete = (survey, options) => {

    console.log("Survey results: " + JSON.stringify(quizResponses.current));
    axios.post("/api/noelicitation_drugOverdose", quizResponses.current).then((response) => {
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
          How Bad Is the   <span style={{ fontWeight: "bold" }}> Drug Overdose </span> Epidemic?   
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

export default Noelicitation_drugOverdose;
