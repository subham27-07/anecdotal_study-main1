import React, { useRef } from "react";

import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import { Divider, Typography, Container } from "@mui/material";

import { useRecoilValue } from "recoil";
import { questionState } from "../../atoms/questionSelector";
import "survey-react/survey.css";

const Attitude_ElicitationPost = (props) => {
  const quizResponses = useRef([]);
  const history = useHistory();
  const location = useLocation();
  const questionCondition = useRecoilValue(questionState);
  // console.log(questionCondition);
  const extraQuestions =
    questionCondition === "strength"
      ? [
       
        ]
      : [];


      

  const json = {
    pages: [
   
      {
        elements: [
          {
            type: "html",
            html: "<h4><h4/>",
          },
          {
            name: "claim",
            type: "radiogroup",
            title: ` "What is your opinion on drug overdose in US ?"`,
            isRequired: true,
            choices: [
                "Extremely serious problem",
                "serious problem",
                "Moderate problem",
                "Minor Problem",
                "Not at all a problem",
            ],
            // correctAnswer: "a conclusion about a topic",
          },
          {
            name: "new",
            type: "radiogroup",
            title: ` "Should the US make combating drug abuse and overdose a priority, i:e allocating tax dollars to treatment and prevention programs?" `,
            isRequired: true,
            choices: [
                "High Priority",
                "Moderate Priority",
                "Neutral",
                "Low Priority",
                "Not a Priority"
            ],
            // correctAnswer: "a news headline",
          },
          {
            name: "headline",
            type: "radiogroup",
            title: ` "What is your opinion on drug legalization and decrimination in the US?" `,
            isRequired: true,
            choices: [
                "Strongly Oppose",
              "Somewhat Oppose",
              "Neutral",
              "Somewhat Favor",
              "Strongly Favor",
            ],
            // correctAnswer: "a news headline",
          },
          ...extraQuestions,
        ],
      },
    ],
  };

  var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
  defaultThemeColors["$main-color"] = "black";
  defaultThemeColors["$main-hover-color"] = "darkorange";
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

    console.log("Survey results: " + JSON.stringify(quizResponses.current));
    axios.post("/api/attitude_ElicitationPost", quizResponses.current).then((response) => {
      let nextPage = pageHandler(props.pages, location.pathname);
      history.push(nextPage);
    });
  };

  const onCurrentPageChanging = (survey, option) => {
    if (!option.isNextPage) return;
    let allTrue = true;
    survey.getAllQuestions().forEach((q) => {
      if (survey.currentPage == q.page) {
        let correct = isAnswerCorrect(q);
        correct = correct == undefined ? true : correct;

        allTrue = allTrue && correct;
        renderCorrectAnswer(q);
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
        Please Answer the questions below👇.
        </Typography>
      </div>
      <Survey.Survey
        model={model}
        onComplete={onComplete}
        onCompleting={onCompleting}
        onCurrentPageChanging={onCurrentPageChanging}
      />
    </Container>
  );
};

export default Attitude_ElicitationPost;
