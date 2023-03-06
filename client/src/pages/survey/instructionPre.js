import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import {Divider, Typography, Container, Button} from "@mui/material";
import styles from "./articles.module.css";

const InstructionPre = (props) => {
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
        <Typography variant="h5">
            <span className={`${styles.textBody1} ${styles.title1}`}>In the next section you will see a series of news articles related to the <span
                style={{fontWeight: "bold"}}> drug overdose epidemic. </span>  Each article includes a data visualization and accompanying text. Please review the visualization and read the text carefully to ensure you understand the message of each article.</span>
        </Typography>

         
      </div>
      
      

      

      <div>
        <Button
              variant="contained"
              color="primary"
              onClick={() => {
                let nextPage = pageHandler(props.pages, location.pathname);
                history.push(nextPage);
              }}
              style={{marginTop: '50%',marginLeft: '450px', marginRight: '20px'}}
              
            >
              Continue
        </Button>

      </div>
    </Container>

  );
};

export default InstructionPre
