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
          "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost? _____ cents",
        isRequired: true,
      },
      {
        name: "5Machines",
        type: "text",
        title:
          "If it takes 5 machines 5 min to make 5 widgets, how long would it take 100 machines to make 100 widgets? _____ min.",
        isRequired: true,
      },
      {
        name: "lakeSize",
        type: "text",
        title:
          "In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take for the patch to cover half of the lake? _____ days. ",
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
