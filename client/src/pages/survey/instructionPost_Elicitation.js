import React, { useRef, lazy, Suspense, useState } from 'react';


import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import { Divider, Typography, Container, Button } from "@mui/material";

import "survey-react/survey.css";
import styles from "./articles.module.css";
import { bitcoinData } from './visualizations/datasets';

const LineChart = lazy(() => import('./visualizations/LineChartVisual_bitcoin'));

const Recall_drugOverdose = (props) => {
  const lineData = bitcoinData;

  const history = useHistory();
    const location = useLocation();
    const json = {
        elements: [
            {
                name: "Superbowl",
        type: "text",
        title:
          "What did you understand from the article above?",
        isRequired: true,
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

    const onComplete = (survey, options) => {
        //Write survey results into database
        // console.log("Survey results: " + JSON.stringify(survey.data));
        axios.post("/api/cogref1", survey.data).then((response) => {
            // console.log(response);
            let nextPage = pageHandler(props.pages, location.pathname);
            history.push(nextPage);
        });
    };
    const model = new Survey.Model(json);
    model.showCompletedPage = false;


  return (
    <Container
            // style={{
            //     width: "100%",
            //     height: "100%",
            //     margin: "0 auto",
            //     overflow: "auto",
            //     paddingTop: "30px",
            //     paddingBottm: "30px",
            // }}
            className={styles.mainContainer}
        >
          <div className={styles.articleContainer}>
                {/* <p className={styles.surveyTitle}>Please read through the article below.</p> */}
                <Typography variant="h3">
                  <span>Now we ask you to   <span
                  style={{fontWeight: "bold"}}> practice drawing </span> a timeline in the chart below</span>
                </Typography>
                <Typography variant={"body1"}>
                         <p>Please draw an <span
                        className={styles.txtImportant}>Increasing trend after year 2017</span> You can adjust individual data point after drawing the line as needed by dragging the data points.
                            <span className={styles.txtImportant}> </span> </p>
                </Typography>

                <div className="viz" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ width: "100%",margin:"0 auto"}}>
                    <Suspense fallback={<div>loading...</div>}>
                      <LineChart type="value" data={lineData} idLine={1} startYear={2016} />
                    </Suspense>
                  </div>
                </div>       
            </div>
            <Survey.Survey model={model} onComplete={onComplete}/>

        </Container>
    
  );
}

export default Recall_drugOverdose;



