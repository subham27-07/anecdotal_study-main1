import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import pageHandler from "../pageHandler";
import "survey-react/survey.css";
import styles from './articles.module.css'
const PreSurveyPage = (props) => {
  const location = useLocation();
  const history = useHistory();
  function createAgeList(start, end){
    let age_list = []
    for(let i = start; i<= end;i++){
      age_list.push(i)
    }
    return age_list
  }
  // const history = useHistory();
  const json = {
    elements: [
      {
        type: "radiogroup",
        name: "gender",
        title: "What is your gender?",
        isRequired: true,
        colCount: 5,
        choices: ["Woman", "Man", "Prefer not to say"],
        hasOther: true,
      },
      {
        type: "radiogroup",
        name: "race",
        title: "What is your race/ethnicity?",
        isRequired: true,
        hasNone: true,
        hasOther: true,
        colCount:2,
        choices: [
          "White/Caucasian/European",
          "African American/Black",
          "Native American",
          "Hispanic/Latino",
          "East Asian e.g. Chinese, Japanese, South-East Asian",
          "Indian, Pakistani, Bangladeshi, or any other Asian",
          "Middle Eastern",
          "Pacific Islander",
          "Australian Aboriginal",
          "Prefer not to say",
        ],
      },
      {
        type: "radiogroup",
        name: "education",
        title: "What is your highest level of educational attainment?",
        isRequired: true,
        hasOther: true,
        colCount: 3,
        choices: [
          "High School",
          "Undergraduate",
          "Masters",
          "Doctorate",
          "Prefer not to say",
        ],
      },
      {
        name: "age",
        type: "dropdown",
        choices: createAgeList(18,99),
        inputType: "number",
        title: "What is your age?",
        isRequired: true,
        validators: [
          { "type": "numeric", "text": "Value must be a number between 18 and 99.", "minValue": 18 , "maxValue": 99 },

        ]
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
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/preq", survey.data).then((response) => {
      // history.push("/instructions1");
      let nextPage = pageHandler(props.pages, location.pathname);
      history.push(nextPage);
    });
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        paddingBottm: "30px",
      }}
    >
      <h3 className={styles.txtImportant} > Please answer the questions below.  </h3>
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default PreSurveyPage;
