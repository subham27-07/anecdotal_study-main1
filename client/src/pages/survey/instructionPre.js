import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import {Container} from "@mui/material";
import styles from "../articles/articles.module.css";

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
        // console.log("Survey results: " + JSON.stringify(survey.data));
        axios.post("/api/instructionPost_Recall", survey.data).then((response) => {
            // console.log(response);
            let nextPage = pageHandler(location.pathname);
            history.push(nextPage);
        });
    };

    const model = new Survey.Model(json);
    model.showCompletedPage = false;


    return (
        <Container
            maxWidth={false}
            
            className={styles.mainContainer}
        >
            <div
                
                className={styles.articleContainer}
            >
                <div className={styles.articleStructure}>
                    <p className={styles.paragraph}>
            <span
                className={styles.surveyTitle}>In the next section you will see a series of news articles related to the <span
                style={{fontWeight: "bold"}}> drug overdose epidemic. </span>
                Each article includes multiple data visualizations and accompanying text. Please review the visualization and read the text carefully to ensure you understand the message of each article.</span>
                    </p>
                </div>

            </div>
            <div className={styles.navigationContainer}>
                <button
                    type={"button"}
                    className={styles.actions}
                    onClick={() => {
                        let nextPage = pageHandler(props.pages, location.pathname);
                        history.push(nextPage);
                    }}
                    // style={{marginTop: '50%',marginLeft: '450px', marginRight: '20px'}}

                >
                    Continue
                </button>

            </div>
        </Container>

    );
};

export default InstructionPre



