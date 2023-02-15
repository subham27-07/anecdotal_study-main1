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

const PreSurveyPage1 = (props) => {
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
            name: "understand_before",
            type: "radiogroup",
            title: "Please continue with the study",
            // isRequired: true,
            // choices: ["yes", "no"],
          },
          
        ],
      },
      // {
      //   elements: [
      //     {
      //       type: "html",
      //       html: "<h4>We are asking you to respond to these questions to make sure you understand the task at hand. You will not be able to move forward if you answer incorrectly.<h4/>",
      //     },
      //     {
      //       name: "claim",
      //       type: "radiogroup",
      //       title: `The tweet: "Spielberg is one of the worst directors of the recent decade." is ___.`,
      //       isRequired: true,
      //       choices: [
      //         "a conclusion about a topic",
      //         "a news headline",
      //         "I don't know",
      //       ],
      //       // correctAnswer: "a conclusion about a topic",
      //     },
      //     {
      //       name: "headline",
      //       type: "radiogroup",
      //       title: `The tweet: "Steven Spielberg's latest three movies were among the worst rated in Rotten Tomatoes." is ___.`,
      //       isRequired: true,
      //       choices: [
      //         "a conclusion about a topic",
      //         "a news headline",
      //         "I don't know",
      //       ],
      //       // correctAnswer: "a news headline",
      //     },
      //     ...extraQuestions,
      //   ],
      // },
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

  const onCompleting = (survey, options) => {
    // console.log(options);
    let allTrue = true;
    survey.getAllQuestions().forEach((q) => {
      let correct = isAnswerCorrect(q);
      correct = correct == undefined ? true : correct;

      allTrue = allTrue && correct;
      renderCorrectAnswer(q);
    });
    quizResponses.current.push(survey.data);
    if (allTrue) {
      options.allowComplete = true;
    } else {
      options.allowComplete = false;
    }
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    // console.log(options);

    console.log("Survey results: " + JSON.stringify(quizResponses.current));
    axios.post("/api/quiz8", quizResponses.current).then((response) => {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    });
  };

  const onCurrentPageChanging = (survey, option) => {
    if (!option.isNextPage) return;
    let allTrue = false;
    survey.getAllQuestions().forEach((q) => {
      if (survey.currentPage == q.page) {
        let correct = isAnswerCorrect(q);
        correct = correct == undefined ? true : correct;

        allTrue = allTrue && correct;
        renderCorrectAnswer(q);
      }
    });
    console.log(allTrue);
    // if (allTrue) {
    //   option.allowChanging = true;
    // } else {
    //   option.allowChanging = false;
    // }
    // console.log(survey.currentPage());
    // option.oldCurrentPage.questions.forEach((q) => {
    //   console.log(q);
    // });
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
  function isAnswerCorrect(q) {
    const right = q.correctAnswer;
    if (right == undefined) return undefined;
    if (!right || q.isEmpty()) return undefined;
    var left = q.value;
    if (!Array.isArray(right)) return right == left;
    if (!Array.isArray(left)) left = [left];
    for (var i = 0; i < left.length; i++) {
      if (right.indexOf(left[i]) < 0) return false;
    }
    return true;
  }

  function renderCorrectAnswer(q) {
    if (!q) return;
    const isCorrect = isAnswerCorrect(q);
    if (!q.prevTitle) {
      q.prevTitle = q.title;
    }
    if (isCorrect === undefined) {
      q.title = q.prevTitle;
    } else {
      q.title = q.prevTitle + " " + (isCorrect ? correctStr : inCorrectStr);
    }
  }

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  model.onTextMarkdown.add((sender, options) => {
    var text = options.text;
    var html = getTextHtml(text, correctStr, true);
    if (!html) {
      html = getTextHtml(text, inCorrectStr, false);
    }
    if (!!html) {
      options.html = html;
    }
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
        <Typography variant="h5">
          Please read through the article below👇
        </Typography>
        <Divider></Divider>
        <div style={{ width: "60%", margin: "50px" }}>
          
        <img src={"https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/10.JPG"} width="110%" height="100%" />
        {/* <p align="justify"> has increased by more than 650 percent.  In 2015, more Americans died from drug overdoses than from car accidents and gun homicides combined. It’s the worst drug overdose epidemic in American history, spurred by rising drug abuse, increased availability of prescription opioids and an influx of potent synthetics like fentanyl and carfentanil. Drug overdoses are now the leading cause of death for Americans under 50.“It’s horrifying,” said Dr. Dan Ciccarone, a heroin researcher and a professor of family and community medicine at the University of California, San Francisco. “It’s not even the magnitude — it’s the steepness at which it’s climbing.” Preliminary numbers for 2017 suggest that overdose deaths are growing...</p> */}
        <p align="justify">Share of population with drug use disorders <span style={{ fontWeight: "bold" }}> 1999 to 2019</span>  The United States is currently in the grips of a powerful drug epidemic, 
        with the <span style={{ fontWeight: "bold" }}>share of population </span>  with drug use disorders steadily climbing every year. A drug use disorder is a mental disorder that affects a person’s brain and behavior, leading to a person’s 
        inability to control their use of drugs including legal or illegal drugs. Drug use disorders occur when an individual 
        compulsively misuses drugs or alcohol and continues abusing the substance despite knowing the negative impact it has on their life.
        
      </p>
        </div>
      </div>
      <Divider></Divider>
      <Survey.Survey
        model={model}
        onComplete={onComplete}
        onCompleting={onCompleting}
        onCurrentPageChanging={onCurrentPageChanging}
      />
    </Container>
  );
};

export default PreSurveyPage1;
