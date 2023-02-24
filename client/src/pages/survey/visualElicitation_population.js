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

const VisualElicitation_population = () => {
    
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
      value: 1,
      year: 2010,
    },
    {
      id: 1,
      value: 1,
      year: 2011,
    },
    {
      id: 1,
      value: 1,
      year: 2012,
    },
    {
      id: 1,
      value: 1,
      year: 2013,
    },
    {
      id: 1,
      value: 1,
      year: 2014,
    },
    {
      id: 1,
      value: 1,
      year: 2015,
    },
    {
      id: 1,
      value: 5,
      year: 2016,
    },
    {
      id: 1,
      value: 6,
      year: 2017,
    },
    {
      id: 1,
      value: 6,
      year: 2018,
    },
    {
      id: 1,
      value: 8,
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
        
      </div>

      <div className="viz" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%", height: "500px" }}>
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
              let nextPage = pageHandler(location.pathname);
              history.push(nextPage);
            }}
            style={{marginTop: '300px',marginLeft: '500px', marginRight: '20px'}}
          >
            Continue
          </Button>
      
    </div>
    </Container>
    
  );
}

export default VisualElicitation_population;
