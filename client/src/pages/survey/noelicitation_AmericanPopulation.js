import React, {useRef} from "react";
import {useHistory, useLocation} from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import {Divider, Typography, Container} from "@mui/material";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import {useRecoilValue} from "recoil";
import {questionState} from "../../atoms/questionSelector";
import "survey-react/survey.css";
import styles from "./articles.module.css";

const Noelicitation_AmericanPopulation = (props) => {
    const quizResponses = useRef([]);
    const history = useHistory();
    const location = useLocation();
    const questionCondition = useRecoilValue(questionState);
    // console.log(questionCondition);
    const extraQuestions =
        questionCondition == "strength"
            ? []
            : [];

    const json = {
        pages: [
            {
                elements: [
                    {
                        type: "html",
                        name: "image_and_text",
                        html: "",
                    },

                ],
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
        // console.log(options);

        console.log("Survey results: " + JSON.stringify(quizResponses.current));
        axios.post("/api/noelicitation_AmericanPopulation", quizResponses.current).then((response) => {
            let nextPage = pageHandler(props.pages, location.pathname);
            history.push(nextPage);
        });
    };


    const model = new Survey.Model(json);
    model.showCompletedPage = false;
    model.questionTitleTemplate = "";
    model.showQuestionNumbers = "none";


    return (
        <Container
            maxWidth={false}
            style={{
                width: "100%",
                overflow: "auto",
                height: "100%",
                paddingTop: "30px",
                paddingBottm: "30px",
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
    <span className={`${styles.textBody} ${styles.title}`}>How Bad Is the <span
        style={{fontWeight: "bold"}}> Drug Overdose </span> epidemic?</span>
                </Typography>
                <Typography variant={'body1'}>
                    <span className={styles.txtImportantUnique}>Article 2</span><p>Since 2002, <span
                    className={styles.txtImportant}>percentage</span> of Americans population with <span
                    className={styles.txtImportant}>drug use disorders...</span></p>
                </Typography>

            </div>
            <div><img
                src='https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/c.JPG' width='100%' height='100%'/>
                <p className={`${styles.paragraph} ${styles.textBody}`}>Since 2002, <span
                    className={styles.txtImportant}>percentage</span> of Americans population with <span
                    className={styles.txtImportant}>drug use disorders </span> has increased by more
                    than <span className={styles.txtImportant}> 137 percent</span>. The United States is currently in
                    the
                    grips of a powerful drug epidemic, with drug use disorders steadily climbing every year. A drug use
                    disorder is a mental disorder that affects a person’s brain and behavior, leading to a person’s
                    inability to control their use of drugs including legal or illegal drugs. Drug use disorders occur
                    when an individual compulsively misuses drugs or alcohol and continues abusing the substance despite
                    knowing the negative impact it has on their life.</p></div>
            <Survey.Survey
                model={model}
                onComplete={onComplete}
            />
        </Container>
    );
};

export default Noelicitation_AmericanPopulation;
