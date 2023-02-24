import React, {useRef, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import {Divider, Typography, Container, Button} from "@mui/material";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import {useRecoilValue} from "recoil";
import {questionState} from "../../atoms/questionSelector";
import "survey-react/survey.css";
import styles from './articles.module.css'

const Textelicitation_drugOverdose = (props) => {
    const quizResponses = useRef([]);
    const history = useHistory();
    const location = useLocation();
    const questionCondition = useRecoilValue(questionState);
    // console.log(questionCondition);
    const extraQuestions =
        questionCondition === "strength"
            ? []
            : [];

    const json = {
        pages: [
            {
                elements: [
                    {
                        name: "claim",
                        type: "radiogroup",
                        title: `"How would you categorize this trend"`,
                        isRequired: true,
                        choices: [
                            "Significant Decrease",
                            "Slight Decrease",
                            "Mostly Flat",
                            "Slight Increase",
                            "Significant Increase",
                        ],

                    },

                    ...extraQuestions,
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

    const correctStr = "Correct";
    const inCorrectStr = "Incorrect";

    Survey.StylesManager.applyTheme();
    //

    const [completed, setCompleted] = useState(false);
    const [message, setMessage] = useState("");
//
const completedSurvey = ()=>{
    return (                <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "30px",
        }}
    >
        <Typography variant="h5">{message}</Typography>
        <img src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/b.JPG" width="100%"
             height="100%" alt="Completion image"/>
        <p className={`${styles.paragraph} ${styles.textBody} ${styles.txtNormal}`}>Since 2002, the <span
            className={styles.txtImportant}>number</span> of Americans who have died every year from <span
            className={styles.txtImportant}> Drug Overdose</span> ... has increased by more than <span
            className={styles.txtImportant}>222.16 percent</span>. In 2015, more Americans died from drug
            overdoses than from car accidents
            and gun homicides combined. It’s the worst drug overdose epidemic in American history, spurred
            by rising drug abuse,
            increased availability of prescription opioids and an influx of Data Sharing potent
            synthetics like Fentanyl and Carfentanil.
            Drug overdoses are now the leading cause of death for Americans under 50.</p>


        <Button
            variant="contained"
            color="primary"
            onClick={() => {
                let nextPage = pageHandler(location.pathname);
                history.push(nextPage);
            }}
            className={styles.actions}
        >
            Continue
        </Button>
    </div>)
    }
    const onCompleting = (survey, options) => {

        let allTrue = true;
        survey.getAllQuestions().forEach((q) => {

        });
        quizResponses.current.push(survey.data);

    };

    const onComplete = (survey, options) => {

        setCompleted(true);
        setMessage("");
        console.log("Survey results: " + JSON.stringify(quizResponses.current));
        axios.post("/api/textelicitation_drugOverdose", quizResponses.current).then((response) => {
            let nextPage = pageHandler(location.pathname);
        });
    };

    const onCurrentPageChanging = (survey, option) => {
        if (!option.isNextPage) return;
        let allTrue = true;
        survey.getAllQuestions().forEach((q) => {
            if (survey.currentPage == q.page) {

            }
        });
        console.log(allTrue);
        if (allTrue) {
            option.allowChanging = true;
        } else {
            option.allowChanging = false;
        }

    };

    function getTextHtml(text, str, isCorrect) {
        if (text.indexOf(str) < 0) return undefined;
        return (
            text.substring(0, text.indexOf(str)) +
            "<span style='color:" +
            (isCorrect ? "green" : "red") +
            "'>" +
            str +
            "</span>"
        );
    }


    const model = new Survey.Model(json);
    model.showCompletedPage = false;
    model.onTextMarkdown.add((sender, options) => {
        var text = options.text;

    });


    return (
        <div>
            <Container
                maxWidth={false}
                style={{
                    width: "100%",
                    overflow: "hidden",
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
                    <Typography variant='h3'>
                    <span className={`${styles.textBody} ${styles.title}`}>How Bad Is the <span
                        style={{fontWeight: "bold"}}> Drug Overdose </span> epidemic?</span>

                    </Typography>

                    <Typography variant={"body1"}>
                        <span className={styles.txtImportantUnique}> Article 1</span> <p>Since 2002, the <span
                        className={styles.txtImportant}>number</span> of Americans who have died every year from
                            <span className={styles.txtImportant}> Drug Overdose _______.</span> </p>
                    </Typography>
                </div>

                <Survey.Survey
                    model={model}
                    onComplete={onComplete}
                    onCompleting={onCompleting}
                    onCurrentPageChanging={onCurrentPageChanging}
                />
            </Container>
            {completed ? (
                completedSurvey()
            ) : null}
        </div>

    );
};

export default Textelicitation_drugOverdose;
