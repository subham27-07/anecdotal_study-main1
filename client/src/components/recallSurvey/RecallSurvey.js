import React, {useRef, useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Survey from "survey-react";
import { Divider, Typography, Container } from "@mui/material";
import { useRecoilValue } from "recoil";
import { questionState } from "../../atoms/questionSelector";
import "survey-react/survey.css";
import styles from '../../pages/articles/articles.module.css'
export default function RecallSurvey(props){
    const quizResponses = useRef([]);


    const questionCondition = useRecoilValue(questionState);
    // console.log(questionCondition);
    const extraQuestions =
              questionCondition === "strength"
                  ? [
                  ]
                  : [];
    const json = {
        pages: [
            {
                elements: [
                    {
                        type: "html",
                        html: "<h4><h4/>",
                    },
                    {
                        name: "Recommend_article",
                        type: "radiogroup",
                        title: ` "I would recommend this article to my family and friends"`,
                        isRequired: true,
                        choices: [
                            "Not at All",
                            "A little",
                            "Moderately",
                            "A lot",
                            "Extremely",
                        ],
                        // correctAnswer: "a conclusion about a topic",
                    },
                    {
                        name: "Content_surprise",
                        type: "radiogroup",
                        title: ` "The content of this article is surprising to me" `,
                        isRequired: true,
                        choices: [
                            "Not at All",
                            "A little",
                            "Moderately",
                            "A lot",
                            "Extremely",
                        ],
                        // correctAnswer: "a news headline",
                    },
                    {
                        name: "view_opinion",
                        type: "radiogroup",
                        title: ` "I felt interested in reading this article" `,
                        isRequired: true,
                        choices: [
                            "Not at All",
                            "A little",
                            "Moderately",
                            "A lot",
                            "Extremely",
                        ],
                        // correctAnswer: "a news headline",
                    },
                    ...extraQuestions,
                ],
            },
        ],
    };
    var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "black";
    defaultThemeColors["$main-hover-color"] = "darkorange";
    defaultThemeColors["$text-color"] = "#4A4A4A";
    defaultThemeColors["$header-color"] = "#7FF07F";
    defaultThemeColors["$header-background-color"] = "#4A4A4A";
    defaultThemeColors["$body-container-background-color"] = "#F8F8F8";
    const correctStr = "Correct";
    const inCorrectStr = "Incorrect";
    Survey.StylesManager.applyTheme();
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
        console.log("Survey results: " + JSON.stringify(quizResponses.current));
        props.responses.current[props.alias] = quizResponses.current;

        props.setFormCompleted(()=> true);
        // axios.post("/api/articlesRecall", quizResponses.current).then((response) => {
        //     let nextPage = pageHandler(props.pages, props.location);
        //     history.push(nextPage);
        // });
    };
    const onCurrentPageChanging = (survey, option) => {
        if (!option.isNextPage) return;
        let allTrue = true;
        survey.getAllQuestions().forEach((q) => {
            if (survey.currentPage === q.page) {
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
                <Typography variant="h5">
                    Please Answer the questions below.
                </Typography>
            </div>
            <Survey.Survey
                model={model}
                onComplete={onComplete}
                onCompleting={onCompleting}
                onCurrentPageChanging={onCurrentPageChanging}
            />
        </Container>
    );
};
