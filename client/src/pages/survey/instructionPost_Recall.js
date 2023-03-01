import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

const InstructionPost_Recall = (props) => {
  const history = useHistory();
  const location = useLocation();
  const json = {
    elements: [
      {
        type: "html",
        html: "<h3> Now you will see the visualization from the articles you have seen before please try to replicate what you saw from the article <h3/>",
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

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/instructionPost_Recall", survey.data).then((response) => {
      console.log(response);
      let nextPage = pageHandler(location.pathname);
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
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default InstructionPost_Recall