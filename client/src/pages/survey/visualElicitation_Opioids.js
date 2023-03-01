import React, { useRef, lazy, Suspense, useState} from 'react';


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
import styles from "./articles.module.css";
const LineChart = lazy(() => import('./visualizations/LineChartVisual_Opioids'));


const VisualElicitation_Opioids = (props) => {
  const lineData = [
    {
      id: 1,
      value: 730,
      year: 1999,
    },
    {
      id: 1,
      value: 782,
      year: 2000,
    },
    {
      id: 1,
      value: 957,
      year: 2001,
    },
    {
      id: 1,
      value: 1295,
      year: 2002,
    },
    {
      id: 1,
      value: 1400,
      year: 2003,
    },
    {
      id: 1,
      value: 1664,
      year: 2004,
    },
    {
      id: 1,
      value: 1742,
      year: 2005,
    },
    {
      id: 1,
      value: 2707,
      year: 2006,
    },
    {
      id: 1,
      value: 2213,
      year: 2007,
    },
    {
      id: 1,
      value: 2306,
      year: 2008,
    },
    {
      id: 1,
      value: 2946,
      year: 2009,
    },
    {
      id: 1,
      value: 3007,
      year: 2010,
    },
    {
      id: 1,
      value: 2666,
      year: 2011,
    },
    {
      id: 1,
      value: 2628,
      year: 2012,
    },
    {
      id: 1,
      value: 3105,
      year: 2013,
    },
    {
      id: 1,
      value: 5544,
      year: 2014,
    },
    {
      id: 1,
      value: 9580,
      year: 2015,
    },
    {
      id: 1,
      value: 19413,
      year: 2016,
    },
    {
      id: 1,
      value: 28466,
      year: 2017,
    },
    {
      id: 1,
      value: 31335,
      year: 2018,
    },
    {
      id: 1,
      value: 36359,
      year: 2019,
    },
    {
        id: 1,
        value: 56516,
        year: 2020,
    },
    {
        id: 1,
        value: 70601,
        year: 2021,
    },
  ];


  const quizResponses = useRef([]);
  const history = useHistory();
  const location = useLocation();

  const [clipAnimation, setClipAnimation] = useState(false);

  const handleShowAnimation = () => {
    setClipAnimation(true);
  };

  const questionCondition = useRecoilValue(questionState);

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
            html: "<span style='font-family: serif; font-size: 1.25rem;'>👉👉👉 <span style='font-weight: bold; color:gray;'> Article 3.</span> Since 2002, the <span style='font-weight: bold'>number</span> of Americans who have died every year from overdoses of <span style='font-weight: bold;'>synthetic opioids...</span>  </span>",

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
              <span className={`${styles.textBody} ${styles.title}`}>How Bad Is the <span
                  style={{fontWeight: "bold"}}> Drug Overdose </span> epidemic?</span>
        </Typography>
        <Typography variant={"body1"}>
                   <span
                       className={`${styles.txtImportantUnique} ${styles.articleThree}`}>Article 3</span><p> Since 2002, the <span
                className={styles.txtImportant}>number</span> of Americans who have died every year from overdoses of <span
                className={styles.txtImportant}>synthetic opioids _______.</span></p>
        </Typography>
        
      </div>
      {/* <Survey.Survey
        model={model}
      /> */}

      <div className="viz" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%",margin:"0 auto"}}>
          <Suspense fallback={<div>loading...</div>}>
            <LineChart type="value" data={lineData} idLine={1} startYear={2002} />
          </Suspense>
        </div>
      </div>
      <div>
        <Button
              variant="contained"
              color="primary"
              onClick={() => {
                let nextPage = pageHandler(props.pages, location.pathname);
                history.push(nextPage);
              }}
              style={{marginTop: '5%',marginLeft: '230px', marginRight: '20px'}}
            >
              Continue
        </Button>
      
      </div>
    </Container>
  );
}

export default VisualElicitation_Opioids;
