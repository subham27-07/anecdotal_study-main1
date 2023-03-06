import React, { useRef, lazy, Suspense, useState } from 'react';

import { Divider, Typography, Container, Button } from "@mui/material";

import "survey-react/survey.css";
import styles from "./articles.module.css";

import LineChartDrawHandler from './visualizations/LineChartDrawHandler';

const Recall_drugOverdose = (props) => {
  

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
      <div>
     
      <LineChartDrawHandler articleName="drugOverdose">
        
      </LineChartDrawHandler>

      </div>
    </Container>

  );
}

export default Recall_drugOverdose;



