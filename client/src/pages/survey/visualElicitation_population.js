import React, { useRef, lazy, Suspense,useState} from 'react';


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
const LineChart = lazy(() => import('./visualizations/LineChartVisual_Population'));

const VisualElicitation_population = (props) => {
    
  const lineData = [
    {
      id: 1,
      value: 2.51,
      year: 1999,
    },
    {
      id: 1,
      value: 2.55,
      year: 2000,
    },
    {
      id: 1,
      value: 2.60,
      year: 2001,
    },
    {
      id: 1,
      value: 2.67,
      year: 2002,
    },
    {
      id: 1,
      value: 2.75,
      year: 2003,
    },
    {
      id: 1,
      value: 2.81,
      year: 2004,
    },
    {
      id: 1,
      value: 2.87,
      year: 2005,
    },
    {
      id: 1,
      value: 2.91,
      year: 2006,
    },
    {
      id: 1,
      value: 2.94,
      year: 2007,
    },
    {
      id: 1,
      value: 2.98,
      year: 2008,
    },
    {
      id: 1,
      value: 3.01,
      year: 2009,
    },
    {
      id: 1,
      value: 3.05,
      year: 2010,
    },
    {
      id: 1,
      value: 3.11,
      year: 2011,
    },
    {
      id: 1,
      value: 3.19,
      year: 2012,
    },
    {
      id: 1,
      value: 3.28,
      year: 2013,
    },
    {
      id: 1,
      value: 3.37,
      year: 2014,
    },
    {
      id: 1,
      value: 3.46,
      year: 2015,
    },
    {
      id: 1,
      value: 3.56,
      year: 2016,
    },
    {
      id: 1,
      value: 3.64,
      year: 2017,
    },
    {
      id: 1,
      value: 3.67,
      year: 2018,
    },
    {
      id: 1,
      value: 3.70,
      year: 2019,
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
            html: "",
           
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
                        <span className={`${styles.txtImportantUnique} ${styles.articleTwo}`}>Article 2</span><p> Since 2002, <span
                        className={styles.txtImportant}>percentage</span> of American population with <span
                        className={styles.txtImportant}>drug use disorders _______.</span></p>
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
            style={{marginTop: '5%',marginLeft: '230px', marginRight: '20px'}}
          >
            Continue
          </Button>
      
    </div>
    </Container>
    
  );
}

export default VisualElicitation_population;
