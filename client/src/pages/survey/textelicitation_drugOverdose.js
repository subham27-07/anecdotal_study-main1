import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import { Divider, Typography, Container, Button } from "@mui/material";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { useRecoilValue } from "recoil";
import { questionState } from "../../atoms/questionSelector";
import "survey-react/survey.css";

const Textelicitation_drugOverdose = (props) => {
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
        
        ],
      },
      {
        elements: [
          {
            type: "html",
            html: "<p style='font-size: 22px;'> 👉👉👉 <span style='font-weight: bold; color:gray;'> Article 1.</span>  Since 2002, the <span style='font-weight: bold;'>number</span> of Americans who have died every year from <span style='font-weight: bold;'>Drug Overdose</span>  </p>",
           
          },
          {
            name: "claim",
            type: "radiogroup",
            title: `"How would you categorize this trend"`,
            isRequired: true,
            choices: [
              "Significant Decrease",
              "Slight Decrease",
              "Mostly Flat",
              "Slight Increase",
              "Significant Increase",
            ],
            
          },
          
          ...extraQuestions,
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
  //  

  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
// 

  const onCompleting = (survey, options) => {
    
    let allTrue = true;
    survey.getAllQuestions().forEach((q) => {
    
    });
    quizResponses.current.push(survey.data);
    
  };

  const onComplete = (survey, options) => {
    
    setCompleted(true);
    setMessage("");

    console.log("Survey results: " + JSON.stringify(quizResponses.current));
    axios.post("/api/textelicitation_drugOverdose", quizResponses.current).then((response) => {
      let nextPage = pageHandler(location.pathname);
    
    });
  };

  const onCurrentPageChanging = (survey, option) => {
    if (!option.isNextPage) return;
    let allTrue = true;
    survey.getAllQuestions().forEach((q) => {
      if (survey.currentPage == q.page) {
        
      }
    });
    console.log(allTrue);
    if (allTrue) {
      option.allowChanging = true;
    } else {
      option.allowChanging = false;
    }
    
  };

  function getTextHtml(text, str, isCorrect) {
    if (text.indexOf(str) < 0) return undefined;
    return (
      text.substring(0, text.indexOf(str)) +
      "<span style='color:" +
      (isCorrect ? "green" : "red") +
      "'>" +
      str +
      "</span>"
    );
  }
  

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  model.onTextMarkdown.add((sender, options) => {
    var text = options.text;
    
  });
  

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
        onCompleting={onCompleting}
        onCurrentPageChanging={onCurrentPageChanging}
      />
      {completed ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <Typography variant="h5">{message}</Typography>
          <img src={"https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/b.JPG"} width="60%" height="100%" alt="Completion image" />
          <p align="justify">    has increased by more than <span style={{ fontWeight: "bold" }}>222.16 percent</span>.  In 2015, more Americans died from drug overdoses than from car accidents 
            and gun homicides combined. It’s the worst drug overdose epidemic in American history, spurred by rising drug abuse, 
            increased availability of prescription opioids and an influx of Data Sharing <span></span>potent synthetics like fentanyl and carfentanil. 
            Drug overdoses are now the leading cause of death for Americans under 50.
            </p>
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              let nextPage = pageHandler(location.pathname);
              history.push(nextPage);
            }}
          >
            Continue
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default Textelicitation_drugOverdose;
