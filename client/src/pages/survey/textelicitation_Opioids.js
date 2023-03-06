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
import styles from "./articles.module.css";

const Textelicitation_Opioids = (props) => {
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
                        html: "<span style='font-family: serif; font-size: 1.25rem;'><span style= 'background-color: darkred; font-weight: bold; font-style: italic; color: white; padding: 0 10px; border-radius: 10pt;'> Article 3.</span> Between 2002 and 2019, the  <span style='font-weight: bold'>number</span> of Americans who have died every year from overdoses of <span style='font-weight: bold;'>synthetic opioids _______.</span> </span> <br><p style= 'font-style: italic;'>'Synthetic opioids is a type of opioids that are synthesized in a laboratory. Other opioids include illegal drug heroin, cocaine, prescription opioid such as oxycodone.'</p>",

                    },
                    {
                        name: "claim",
                        type: "dropdown",
                        title: `Select an option to fill the blank space from drop down menu`,
                        isRequired: true,
                        choices: [
                            "Significant Decrease",
                            "Slight Decrease",
                            "Mostly Flat",
                            "Slight Increase",
                            "Significant Increase",
                        ],
                        // correctAnswer: "a conclusion about a topic",
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

    const [completed, setCompleted] = useState(false);
    const [message, setMessage] = useState("");

    const onCompleting = (survey, options) => {
        // console.log(options);
        let allTrue = true;
        survey.getAllQuestions().forEach((q) => {
            let correct = isAnswerCorrect(q);
            correct = correct == undefined ? true : correct;

            allTrue = allTrue && correct;
            renderCorrectAnswer(q);
        });
        quizResponses.current.push(survey.data);
        if (allTrue) {
            options.allowComplete = true;
        } else {
            options.allowComplete = false;
        }
    };

    const onComplete = (survey, options) => {
        //Write survey results into database
        // console.log(options);

        setCompleted(true);
        setMessage("");

        console.log("Survey results: " + JSON.stringify(quizResponses.current));
        axios.post("/api/textelicitation_Opioids", quizResponses.current).then((response) => {
            let nextPage = pageHandler(props.pages, location.pathname);
            //   history.push(nextPage);
        });
    };

    const onCurrentPageChanging = (survey, option) => {
        if (!option.isNextPage) return;
        let allTrue = true;
        survey.getAllQuestions().forEach((q) => {
            if (survey.currentPage == q.page) {
                let correct = isAnswerCorrect(q);
                correct = correct == undefined ? true : correct;

                allTrue = allTrue && correct;
                renderCorrectAnswer(q);
            }
        });
        console.log(allTrue);
        if (allTrue) {
            option.allowChanging = true;
        } else {
            option.allowChanging = false;
        }
        // console.log(survey.currentPage());
        // option.oldCurrentPage.questions.forEach((q) => {
        //   console.log(q);
        // });
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
const surveyCompleted = ()=>{
        return (    <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "30px",
            }}
        >
            <Typography variant="h5">{message}</Typography>
            <img src={"https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/d.JPG"} width="100%"
                 height="100%" alt="Completion image"/>
            <p className={`${styles.paragraph} ${styles.textBody} ${styles.txtNormal}`}>Since 2002, the <span
                className={styles.txtImportant}>number</span> of Americans who have died every year from overdoses of <span
                className={styles.txtImportant}>synthetic opioids</span> has increased by more
                than <span
                    style={{fontWeight: "bold"}}>5451 percent</span>. Substance use disorders refer to direct
                deaths from overdoses of <span style={{fontWeight: "bold"}}>illicit drugs synthetic opioids (mostly Fentanyl)</span> .“We
                know that substance use is more dangerous than it has ever been, as fentanyl has continued to
                permeate the illicit drug supply, increasing the risk for overdoses among both people with
                substance use disorders as well as those who use drugs occasionally,” said Dr. Nora Volkow,
                director of the National Institute on Drug Abuse. Deaths involving synthetic opioids such as
                fentanyl increased by a marked 18% in 2021, according to the CDC data. Deaths involving cocaine
                and psychostimulants such as methamphetamine were also significantly more frequent, while those
                involving heroin decreased.
            </p>

            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    let nextPage = pageHandler(props.pages, location.pathname);
                    history.push(nextPage);
                }}
            >
                Continue
            </Button>
        </div>)
}
    function isAnswerCorrect(q) {
        const right = q.correctAnswer;
        if (right == undefined) return undefined;
        if (!right || q.isEmpty()) return undefined;
        var left = q.value;
        if (!Array.isArray(right)) return right == left;
        if (!Array.isArray(left)) left = [left];
        for (var i = 0; i < left.length; i++) {
            if (right.indexOf(left[i]) < 0) return false;
        }
        return true;
    }

    function renderCorrectAnswer(q) {
        if (!q) return;
        const isCorrect = isAnswerCorrect(q);
        if (!q.prevTitle) {
            q.prevTitle = q.title;
        }
        if (isCorrect === undefined) {
            q.title = q.prevTitle;
        } else {
            q.title = q.prevTitle + " " + (isCorrect ? correctStr : inCorrectStr);
        }
    }

    const model = new Survey.Model(json);
    model.showCompletedPage = false;
    model.onTextMarkdown.add((sender, options) => {
        var text = options.text;
        var html = getTextHtml(text, correctStr, true);
        if (!html) {
            html = getTextHtml(text, inCorrectStr, false);
        }
        if (!!html) {
            options.html = html;
        }
    });


    return (
<div>
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
            {/* <Typography variant={"body1"}>
                   <span
                       className={`${styles.txtImportantUnique} ${styles.articleThree}`}>Article 3</span><p> Since 2002, the <span
                className={styles.txtImportant}>number</span> of Americans who have died every year from overdoses of <span
                className={styles.txtImportant}>synthetic opioids _______.</span></p>
            </Typography> */}

        </div>

        <Survey.Survey
            model={model}
            onComplete={onComplete}
            onCompleting={onCompleting}
            onCurrentPageChanging={onCurrentPageChanging}
        />
    </Container>
    {completed ? (
        surveyCompleted()
    ) : null}
</div>
    );
};

export default Textelicitation_Opioids;
