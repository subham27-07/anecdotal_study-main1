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
const LineChart = lazy(() => import('./visualizations/LineChartVisual_DrugOverdose'));

const VisualElicitation_drugOverdose = () => {
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
          How Bad Is the <span style={{ fontWeight: "bold" }}>Drug Overdose</span> Epidemic?
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

export default VisualElicitation_drugOverdose;


