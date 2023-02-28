import React, { useRef, lazy, Suspense, useState } from 'react';


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
const LineChart = lazy(() => import('./visualizations/recallLinechart_DrugOverdose'));

const Recall_drugOverdose = (props) => {
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


  // const quizResponses = useRef([]);
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
            html: "<span style='font-family: serif; font-size: 1.25rem;'> 👉👉👉 <span style='font-weight: bold; color:gray;'> Article 1.</span> Since 2002, the <span style='font-weight: bold'>number</span> of Americans who have died every year from" +
                "<span style='font-weight: bold'> Drug Overdose</span> ...</span>",
 
          },
           

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
        paddingTop: "2%",
        // paddingBottm: "5%",
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
              <span>How Bad Is the <span
                  style={{fontWeight: "bold"}}> Drug Overdose </span> epidemic?</span>
        </Typography>

        <Typography variant={"body1"}>
                        <span className={styles.txtImportantUnique}> Article 1</span> <p>Since 2002, the <span
                        className={styles.txtImportant}>number</span> of Americans who have died every year from
                            <span className={styles.txtImportant}> Drug Overdose _______.</span> </p>
         </Typography>

      </div>
      {/*<Survey.Survey*/}
      {/*  model={model}*/}
      {/*/>*/}

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
              style={{marginTop: '5%',marginLeft: '500px', marginRight: '20px'}}
            >
              Continue
        </Button>

      </div>
    </Container>

  );
}

export default Recall_drugOverdose;



