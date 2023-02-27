import React, { useRef, lazy, Suspense } from 'react';


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
const LineChart = lazy(() => import('./visualizations/LineChart2'));


const Viz1 = () => {
  const lineData = [
    {
      id: 1,
      value: 16849,
      year: 1999,
    },
    {
      id: 1,
      value: 17415,
      year: 2000,
    },
    {
      id: 1,
      value: 19394,
      year: 2001,
    },
    {
      id: 1,
      value: 23518,
      year: 2002,
    },
    {
      id: 1,
      value: 25785,
      year: 2003,
    },
    {
      id: 1,
      value: 27424,
      year: 2004,
    },
    {
      id: 1,
      value: 29813,
      year: 2005,
    },
    {
      id: 1,
      value: 34425,
      year: 2006,
    },
    {
      id: 1,
      value: 36010,
      year: 2007,
    },
    {
      id: 1,
      value: 36450,
      year: 2008,
    },
    {
      id: 1,
      value: 37004,
      year: 2009,
    },
    {
      id: 1,
      value: 38329,
      year: 2010,
    },
    {
      id: 1,
      value: 41340,
      year: 2011,
    },
    {
      id: 1,
      value: 41502,
      year: 2012,
    },
    {
      id: 1,
      value: 43982,
      year: 2013,
    },
    {
      id: 1,
      value: 47055,
      year: 2014,
    },
    {
      id: 1,
      value: 52404,
      year: 2015,
    },
    {
      id: 1,
      value: 63632,
      year: 2016,
    },
    {
      id: 1,
      value: 70237,
      year: 2017,
    },
    {
      id: 1,
      value: 67367,
      year: 2018,
    },
    {
      id: 1,
      value: 70630,
      year: 2019,
    },
    
  ];


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
            html: "<p style='font-size: 22px;'>Since 2002, the number of Americans who have died every year from <span style='font-weight: bold;'>Drug Overdose...</span>  </p>",
           
          },
          
          {
            name: "claim",
            type: "radiogroup",
            title: ` "I would recommend this article to my family and friends"`,
            isRequired: true,
            choices: [
                "Not at All",
                "A little",
                "Moderately",
                "A lot",
                "Extremely",
            ],
            // correctAnswer: "a conclusion about a topic",
          },
          
          {
            name: "suport",
            type: "radiogroup",
            title: ` "The content of this article is surprising to me" `,
            isRequired: true,
            choices: [
                "Not at All",
                "A little",
                "Moderately",
                "A lot",
                "Extremely",
            ],
            // correctAnswer: "a news headline",
          },
          {
            name: "viewOpinion",
            type: "radiogroup",
            title: ` "I felt interested in reading this article" `,
            isRequired: true,
            choices: [
                "Not at All",
                "A little",
                "Moderately",
                "A lot",
                "Extremely",
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
      // let correct = isAnswerCorrect(q);
      // correct = correct == undefined ? true : correct;

      // allTrue = allTrue && correct;
      // renderCorrectAnswer(q);
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
    axios.post("/api/viz1", quizResponses.current).then((response) => {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
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
    var html = getTextHtml(text, correctStr, true);
    
  });
  
  return (
    <Container
      maxWidth={false}
      style={{
        width: "100%",
        overflow: "auto",
        minHeight: "600px",
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
          How Bad Is the <span style={{ fontWeight: "bold" }}>Drug Overdose</span> Epidemic?
        </Typography>
        
      </div>

      <div className="viz" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%", height: "500px" }}>
          <Suspense fallback={<div>loading...</div>}>
            <LineChart type="value" data={lineData} idLine={1} startYear={2002} />
          </Suspense>
        </div>
        <Survey.Survey
          model={model}
          onComplete={onComplete}
          onCompleting={onCompleting}
          onCurrentPageChanging={onCurrentPageChanging}
        />
      </div>
    </Container>
  );
}

export default Viz1;



svg.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");