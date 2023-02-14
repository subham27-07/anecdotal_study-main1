import React, { useRef } from "react";
import { atom, selector } from "recoil";
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

const PreSurveyPage2 = (props) => {
  const quizResponses = useRef([]);
  const history = useHistory();
  const location = useLocation();
  const questionCondition = useRecoilValue(questionState);
  // console.log(questionCondition);
  const extraQuestions =
    questionCondition == "strength"
      ? [
        //   {
        //     name: "support",
        //     type: "radiogroup",
        //     title: `When I read: "Spielberg is one of the worst directors of the recent decade." I should:`,
        //     isRequired: true,
        //     choices: [
        //       "Evaluate whether it is supported by the headline.",
        //       "Give my opinion whether I think it is true regardless of the headline.",
        //       "I don't know.",
        //     ],
        //     correctAnswer: "Evaluate whether it is supported by the headline.",
        //   },

        //   {
        //     name: "headline_true",
        //     type: "radiogroup",
        //     title: `When I read: "Steven Spielberg's latest three movies were among the worst rated in Rotten Tomatoes." I should:`,
        //     isRequired: true,
        //     choices: [
        //       "Evaluate whether the headline is accurate.",
        //       "Assume that the headline is true.",
        //       "I don't know.",
        //     ],
        //     correctAnswer: "Assume that the headline is true.",
        //   },
        ]
      : [];


      

  const json = {
    pages: [
    //   {
    //     elements: [
    //       {
    //         name: "understand_before",
    //         type: "radiogroup",
    //         title: "Do you understand what this study is asking you to do?",
    //         isRequired: true,
    //         choices: ["yes", "no"],
    //       },
    //       {
    //         name: "understand-text_before",
    //         type: "text",
    //         title:
    //           "Please in sentence or two, please describe what this study is asking you to do",
    //         isRequired: true,
    //       },
    //     ],
    //   },
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
    axios.post("/api/quiz2", quizResponses.current).then((response) => {
      let nextPage = pageHandler(location.pathname);
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
        Please Answer the questions below👇.
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
    </Container>
  );
};

export const labelSelector = selector({
    key: "labelQuestionSelector",
    get: ({ get }) => {
      let questionCondition = get(questionState);
      switch (questionCondition) {
        case "share":
          // return [
          //   "Not likely at all",
          //   "Slightly likely",
          //   "Moderately Likely",
          //   "Completely likely",
          // ];
          // return ["No", "Slightly", "Moderately", "Strongly"];
          return [
            "Definitely no",
            "Probably no",
            "Probably yes",
            "Definitely yes",
          ];
          break;
        case "strength":
          return [
            "Extremely Serious Problem",
            "Serious Problem",
            "Moderate Problem",
            "Minor Problem",
            "Not a Problem",
          ];
  
          break;
      }
    },
  });

export default PreSurveyPage2;