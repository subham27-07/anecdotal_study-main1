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
        html: "<h4>Please read through the article below👇. Your responses do not impact your payment!<h4/>",
      },
      {
        name: "Superbowl",
        type: "text",
        title:
          "The Eagles made sure to mention that field conditions didn't decide the game. (It's not like we were playing on ice and they were playing on grass; we all had to play on it, Eagles head coach Nick Sirianni said.) But it affected both teams. The Eagles had 70 sacks in the regular season and none Sunday. There were factors that went into that, such as the Chiefs using a quick passing game. But the field conditions probably slowed down the Eagles pass rushers a bit.It was hard. I beat my man a couple times, trying to turn the corner and just was slipping, Reddick said. It was very disappointing. It’s the NFL, you’d think it would be better so we can get some better play. But it is what it is. Reddick said he didn't want to use the turf as an excuse. He said the Chiefs deserved to win. But it was clearly a point of frustration. Maybe the league can look at it and tell Arizona they’ve got to step their stuff up,Reddick said. I don’t know. It’s not my decision to make, it’s not my call to make.",
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
    axios.post("/api/cogref1", survey.data).then((response) => {
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
