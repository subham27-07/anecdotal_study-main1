import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

const PreSurveyPage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const json = {
    elements: [
      {
        type: "html",
        html: "<h4>Please respond to these questions. Your responses do not impact your payment!<h4/>",
      },
      {
        name: "batBall",
        type: "text",
        title:
          "If you’re running a race and you pass the person in second place, what place are you in?? _____ place",
        isRequired: true,
      },
      {
        name: "5Machines",
        type: "text",
        title:
          "A farmer had 15 sheep and all but 8 died. How many are left? _____ sheeps.",
        isRequired: true,
      },
      {
        name: "lakeSize",
        type: "text",
        title:
          "Emily’s father has three daughters. The first two are named April and May. What is the third daughter’s name? _____ name. ",
        isRequired: true,
      },
      {
        name: "lakeSize",
        type: "text",
        title:
          "How many cubic feet of dirt are there in a hole that is 3’ deep x 3’ wide x 3’ long?? _____ volume. ",
        isRequired: true,
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
    axios.post("/api/cogref", survey.data).then((response) => {
      console.log(response);
      let nextPage = pageHandler(location.pathname);
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

export default PreSurveyPage;
