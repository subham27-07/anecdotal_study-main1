import React, {useState, useRef, useEffect} from "react";
import styles from './articles.module.css'
import Button from "@mui/material/Button";
import pageHandler from "../pageHandler";
import {useHistory, useLocation} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import LineChartDrawHandler from "../survey/visualizations/LineChartDrawHandler";


const articleContent = {
    title: 'How Bad Is the Drug Overdose Epidemic?',
    articles2: [{
        name: "drugOverdose",
        id: "One",
        text: {
            subTitle: "Since 2002, the number of Americans who have died every year from Drug Overdose...",
            subTitle2: "",

            body: 'Since 2002, the number of Americans who have died every year from Drug Overdoses has increased by more than  222.16 percent.' +
                'In 2015, more Americans died from drug overdoses than from car accidents and gun homicides combined.It\'s' +
                ' the worst drug overdose epidemic in American history, spurred by rising drug abuse, ' +
                'increased availability of prescription opioids and an influx of Drug Overdose potent synthetics like Fentanyl and Carfentanil.' +
                ' Drug overdoses are now the leading cause of death for Americans under 50.',
            instructions: "",
            definitions: "",
        },
        image: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/001.png',
    },
        {
            name: "population",
            id: "Two",
            text: {
                subTitle: `The percentage of American population with drug use disorders has...`,
                subTitle2: "",

                body: `Since 2002, the percentage of American population with drug use disorders has increased by more than 137 percent.
                The United States is currently in the grips of a powerful drug epidemic, with the share of population with drug use disorders steadily climbing every year.
                A drug use disorder is a behavioral condition that affects a person’s brain and behavior, leading to a person’s inability to control their use of drugs including legal or illegal drugs. 
                Drug use disorders occur when an individual compulsively misuses drugs or alcohol and continues abusing the substance despite knowing the negative impact it has on their life.`,
                instructions: 'Please answer the questions below',
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/002.png",
        },
        {
            name: "opioids",
            id: "Three",
            text: {
                subTitle: "Since 2002, the of Americans who have died every year from overdoses of synthetic opioids...",
                subTitle2: "Synthetic opioids is a type of opioids that are synthesized in a laboratory. Other opioids include illegal drug heroin, cocaine, prescription opioid such as oxycodone.",
                body: `Since 2002, the number of Americans who have died every year from overdoses of synthetic opioids has increased by more than 5451 percent.
                Substance use disorders refer to direct deaths from overdoses of illicit drugs synthetic opioids (mostly Fentanyl).
                “We know that substance use is more dangerous than it has ever been, as fentanyl has continued to permeate the illicit drug supply, increasing the risk for overdoses among both people with substance use disorders as well as those who use drugs occasionally,”
                said Dr. Nora Volkow, director of the National Institute on Drug Abuse. Deaths involving synthetic opioids such as fentanyl increased by a marked 18% in 2021, according to the CDC data.
                Deaths involving cocaine and psychostimulants such as methamphetamine were also significantly more frequent, while those involving heroin decreased.`,
                instructions: 'Please answer the questions below',
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/003.png",
        }]


}

export default function Articles2(props) {

    const [article, setArticle] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [interactionStep, setInteractionStep] = useState(0);
    const location = useLocation();
    const [trend, setTrend] = React.useState("");
    const articleResponses = useRef({
        treatment: props.treatment.current,
        responses: {}
    })
    const history = useHistory();
    // console.log('location',location)
    // console.log('pages',props.pages)
    useEffect(() => {
        if (trend !== "") {
            // console.log(trend);
            setCompleted(() => true);
        } else if (props.treatment.current === 'control') {
            setCompleted(() => true);
        } else {
            setCompleted(() => false);
        }
    }, [trend])


    // This function controls the behavior of Next button
    function articleChanger() {
        switch (props.treatment.current) {
            case 'txt':
            if (article === 2) {
                let nextPage = pageHandler(props.pages, location.pathname);
                history.push(nextPage);
            } else {
                setCompleted((prev) => false);
                setInteractionStep(0);
                setArticle((prev) => prev + 1);
            }
            break;
            case 'visual':
                if (article === 2) {
                    let nextPage = pageHandler(props.pages, location.pathname);
                    history.push(nextPage);
                } else {
                    setCompleted((prev) => false);
                    setInteractionStep(0);
                    setArticle((prev) => prev + 1);
                }
                break;
        }
    }

    // This function controls the change in the input value for dropdown
    const handleChange = (event) => {
        setTrend(event.target.value);
    };

    const interactionStepHandler = () => {
        if (interactionStep < 2) {
            setInteractionStep((prev) => prev + 1);
        } else {
            setInteractionStep((prev) => 0);

        }
    };

    const visualBehaviorHandler = () => {
        if (interactionStep === 2) {
            setCompleted(() => true);
        }
    };


    function ArticleTypeSelector() {
        switch (props.treatment.current) {
            case 'txt':
                return (<div className={styles.articleStructure}>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>
                    <div className={styles.subtitle}>
                        <p>{`${articleContent.articles2[article].text.subTitle}`}</p>
                    </div>
                    <LineChartDrawHandler
                        articleName={articleContent.articles2[article].name}
                        visStep={interactionStep}
                        handleVisState={interactionStepHandler}
                        article={article}
                        completed={completed}
                    />
                    {(() => {
                            if (interactionStep === 2) {
                                return (
                                    <div className={styles.paragraph}>
                                        {`${articleContent.articles2[article].text.body}`}
                                    </div>
                                )
                            } else {
                                return ("")
                            }
                        }
                    )()}
                </div>);
            case 'visual':
                return (<div className={styles.articleStructure}>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>
                    <div className={styles.subtitle}>
                        <p>{`${articleContent.articles2[article].text.subTitle}`}</p>
                    </div>
                    <LineChartDrawHandler
                        articleName={articleContent.articles2[article].name}
                        visStep={interactionStep}
                        handleVisState={interactionStepHandler}
                        article={article}
                        completed={completed}
                    />
                    {(() => {
                            if (interactionStep === 2) {
                                return (
                                    <div className={styles.paragraph}>
                                        {`${articleContent.articles2[article].text.body}`}
                                    </div>
                                )
                            } else {
                                return ("")
                            }
                        }
                    )()}
                </div>);
            case 'control':
                return (<div className={styles.articleStructure}>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>
                    <div className={styles.subtitle}>
                        <p>{`${articleContent.articles2[article].text.subTitle}`}</p>
                    </div>
                    <LineChartDrawHandler
                        articleName={articleContent.articles2[article].name}
                        visStep={interactionStep}
                        handleVisState={interactionStepHandler}
                        article={article}
                        completed={completed}
                    />
                    {(() => {
                            if (interactionStep === 2) {
                                return (
                                    <div className={styles.paragraph}>
                                        {`${articleContent.articles2[article].text.body}`}
                                    </div>
                                )
                            } else {
                                return ("")
                            }
                        }
                    )()}
                </div>);
            default:
                break;
        }
    }
        console.log({
            article: article,
            completed: completed,
            interactionStep: interactionStep
        })

        useEffect(() => {
            visualBehaviorHandler();
        }, [interactionStep])

        return (
            <div className={styles.mainContainer}>
                <div className={styles.articleContainer}>
                    <div className={styles.progressBar}>
                        {(() => {
                            return articleContent.articles2.map((d, i) => {
                                if (i === article) {
                                    return (
                                        <span
                                            key={`article${i}`}
                                            className={styles.articleIdActive}> Article {`${articleContent.articles2[i].id}`}</span>)
                                } else {
                                    return (
                                        <span
                                            key={`article-deactive-${i}`}
                                            className={styles.articleIdDeactive}> Article {`${articleContent.articles2[i].id}`}</span>)
                                }

                            });
                        })()
                        }
                    </div>
                    {ArticleTypeSelector()}
                </div>
                <div className={styles.navigationContainer}>
                    <button className={styles.actions} type={"button"} onClick={articleChanger} disabled={!completed}>
                        Next
                    </button>
                </div>
            </div>)
    };