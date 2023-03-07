import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import styles from '../articles/articles.module.css'
import {Container} from "@mui/material/";
const PreSurveyPage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const json = {
    elements: [
      {
        name: "race",
        type: "text",
        title:
          "If you’re running a race and you pass the person in second place, what place are you in?? _____ place",
        isRequired: true,
      },
      {
        name: "sheep",
        type: "text",
        title:
          "A farmer had 15 sheep and all but 8 died. How many are left? _____ sheeps.",
        isRequired: true,
      },
      {
        name: "name",
        type: "text",
        title:
          "Emily’s father has three daughters. The first two are named April and May. What is the third daughter’s name? _____ name. ",
        isRequired: true,
      },
      {
        name: "volume",
        type: "text",
        title:
          "How many cubic feet of dirt are there in a hole that is 3’ deep x 3’ wide x 3’ long?? _____ volume. ",
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
    axios.post("/api/cogref", survey.data).then((response) => {
      // console.log(response);
      let nextPage = pageHandler(props.pages, location.pathname);
      history.push(nextPage);
    });
  };
  //   console.log(props.setChoice);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const result = await axios("/study/getData");
  //       // console.log(result.data);
  //       console.log(result.data);
  //     }

  //     fetchData();
  //   }, []);
  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  return (
    
    <Container
        className={styles.mainContainer}
      // style={{
      //   width: "100%",
      //   height: "100%",
      //   margin: "0 auto",
      //   overflow: "auto",
      //   paddingTop: "30px",
      //   paddingBottm: "30px",
      // }}
    >
      <div className={styles.articleContainer}>
        <p className={styles.surveyTitle}>Please respond to these questions below.</p>

      </div>
      <Survey.Survey model={model} onComplete={onComplete} />
    </Container>
  );
};

export default PreSurveyPage;
