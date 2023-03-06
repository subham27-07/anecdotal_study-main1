import React, { useRef, lazy, Suspense, useState } from 'react';

import { Divider, Typography, Container, Button } from "@mui/material";

import "survey-react/survey.css";
import styles from "./articles.module.css";
import { bitcoinData } from './visualizations/datasets';

const LineChart = lazy(() => import('./visualizations/LineChartVisual_bitcoin'));

const Recall_drugOverdose = (props) => {
  const lineData = bitcoinData;


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
              <span>Now we ask you to   <span
                  style={{fontWeight: "bold"}}> practice drawing </span> a timeline in the chart below</span>
        </Typography>

        <Typography variant={"body1"}>
                         <p>Please draw an <span
                        className={styles.txtImportant}>Increasing trend after year 2017</span> You can adjust individual data point after drawing the line as needed by dragging the data points.
                            <span className={styles.txtImportant}> </span> </p>
         </Typography>
         

      </div>
     

      <div className="viz" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "100%",margin:"0 auto"}}>
          <Suspense fallback={<div>loading...</div>}>
            <LineChart type="value" data={lineData} idLine={1} startYear={2016} />
          </Suspense>
        </div>

    
      </div>
    </Container>

  );
}

export default Recall_drugOverdose;



