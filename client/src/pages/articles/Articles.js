import React, {useEffect, useRef, useState} from "react";
import styles from './articles.module.css'
import pageHandler from "../pageHandler";
import {useHistory, useLocation} from "react-router-dom";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import LineChartDrawHandler from "../survey/visualizations/LineChartDrawHandler";

const instructionsContent = {
    txt: "Select your guess from the dropdown provided below.",
    visual: " Draw your guess on the chart below.",
    control: "Read the article below."
}


export default function Articles(props) {
    const treatment = localStorage.getItem('treatment');
    const [article, setArticle] = useState(()=>{
        const savedArticle = JSON.parse(localStorage.getItem('ArticleNumber'));
        return savedArticle || 0;
    });
    const [completed, setCompleted] = useState(()=>{
        const articleCompleted = JSON.parse(localStorage.getItem('articleCompleted'));
        return articleCompleted || false;
    });
    const [interactionStep, setInteractionStep] = useState(()=>{
        const savedIntStep = JSON.parse(localStorage.getItem('articleIntStep'));
        return savedIntStep || 0;
    });
    const location = useLocation();
    const [trend, setTrend] = React.useState("");
    const articleResponses = useRef({
        treatment: treatment,
        responses: {}
    })
    const history = useHistory();

    const articleContent = {
        title: 'How Bad Is the Drug Overdose Epidemic?',
        articles: [{
            alias: 'drugOverdose',
            name: "Deaths from Drug Overdose",
            id: "One",
            text: {
                subTitle: ["Since 2002, the", "number of", "Americans who have died" +
                " every year from Drug Overdose..."],
                subTitle2: "",

                body: ['Since 2002,', ' the number of', ' Americans who have died every year from Drug Overdoses has' +
                ' increased by more than', '200 percent.',
                    ' In 2015, more Americans died from drug overdoses than from car accidents and gun homicides' +
                    ' combined.It\'s' +
                    ' the worst drug overdose epidemic in American history, spurred by rising drug abuse, ' +
                    'increased availability of prescription opioids and an influx of Drug Overdose potent synthetics like Fentanyl and Carfentanil.' +
                    ' Drug overdoses are now the leading cause of death for Americans under 50.'],
                instructions: "How has the number of Americans died from drug overdoses in the US changed since 2002?" +
                    ` ${instructionsContent[treatment]}`,
                definitions: "",
            },
            image: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/001.png',
        },
            {
                alias: 'population',
                name: "% of American Population with Drug Overdose Disorder",
                id: "Two",
                text: {
                    subTitle: ["Since 2002, the", "percentage of", "American population with drug use disorders has..."],
                    subTitle2: "Drug use disorder is a complex condition in which there is uncontrolled use of a drug despite harmful consequences.",

                    body: ["Since 2002,", " the percentage of", " American population with drug use disorders has" +
                    " increased by more than", " 38.6 percent.",
                        "The United States is currently in the grips of a powerful drug epidemic, with the share of" +
                        " population with drug use disorders steadily climbing every year." +
                        "A drug use disorder is a behavioral condition that affects a person’s brain and behavior, leading" +
                        " to a person’s inability to control their use of drugs including legal or illegal drugs." +
                        "Drug use disorders occur when an individual compulsively misuses drugs and continues" +
                        " abusing the substance despite knowing the negative impact it has on their life."],
                    instructions: "How has the percentage of Americans with drug use disorders in the US changedsince 2002?"
                        + ` ${instructionsContent[treatment]}`,
                    definitions: "",
                },
                image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/002.png",
            },
            {
                alias: 'opioids',
                name: "Deaths from Synthetic Opioids Overdose",
                id: "Three",
                text: {
                    subTitle: ["Since 2002, the", "number of", "Americans who have died every year from overdoses of" +
                    " synthetic" +
                    " opioids..."],

                    subTitle2: "Synthetic opioids are a type of opioids that are synthesized in a laboratory. Other" +
                        " (non-synthetic) opioids include illegal drugs such as heroin and cocaine and prescription" +
                        " opioids such as Oxycodone.",

                    body: ["Since 2002,", " the number of ", "Americans who have died every year from overdoses of" +
                    " synthetic" + " opioids has increased by more than", " 5351 percent.", "Substance use disorders" +
                    " refer to direct deaths from overdoses of illicit drugs synthetic opioids (mostly Fentanyl)." +
                    " We know that substance use is more dangerous than it has ever been, as" + " fentanyl has continued to" +
                    " permeate the illicit drug supply, increasing the risk for overdoses among both people with" +
                    " substance use disorders as well as those who use drugs occasionally, said Dr. Nora Volkow," +
                    " director of the National Institute on Drug Abuse. Deaths involving synthetic opioids such as" +
                    " fentanyl increased by a marked 18% in 2021, according to the CDC data. Deaths involving" +
                    " cocaine and psychostimulants such as methamphetamine were also significantly more frequent," +
                    " while those involving heroin decreased."],
                    instructions: "How has the number of Americans who have died every year from overdoses of synthetic" +
                        " opioids in the US changed" + " since" +
                        " 2002?" + ` ${instructionsContent[treatment]}`,
                    definitions: "",
                },
                image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/003.png",
            }]
    }

    useEffect(()=>{
        localStorage.setItem('articleNumber', JSON.stringify(article));
    },[article])

    useEffect(()=>{
        localStorage.setItem('articleIntStep', JSON.stringify(interactionStep));
    },[interactionStep])

    useEffect(()=>{
        localStorage.setItem('articleCompleted', JSON.stringify(completed));
    },[completed])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article])

    useEffect(() => {
        if (trend !== "") {
            // console.log(trend);
            setCompleted(() => true);
        } else if (treatment === 'control') {
            setCompleted(() => true);
        } else {
            setCompleted(() => false);
        }
    }, [trend])

    function makeImportant(whichText) {
        return articleContent.articles[article].text[whichText].map((d, i) => {
            if (['number', 'percentage', 'percent'].some(
                (keyword) => {
                    return d.includes(keyword);
                }
            )) {
                return (<strong key={`bodyText_${i}`}> {d} </strong>);
            } else {
                return (d)
            }
        });
    }

    // This function controls the behavior of Next button
    function articleChanger() {
        switch (treatment) {
            case 'txt':
                articleResponses.current.responses[`${articleContent.articles[article].alias}`] = {
                    time: Date.now(),
                    choice: trend,
                }
                if (article === 2) {
                    axios.post("/api/articles", articleResponses.current).then((response) => {
                        let nextPage = pageHandler(props.pages, location.pathname);
                        history.push(nextPage);
                    });
                    // pageHandler(props.pages, location.pathname);
                } else {
                    setArticle((prev) => {

                        return prev + 1
                    });
                    setTrend(() => "");
                    // console.log('res:',articleResponses.current);
                }
                break;
            case 'visual':
                if (article === 2) {
                    axios.post("/api/articles", articleResponses.current).then((response) => {
                        let nextPage = pageHandler(props.pages, location.pathname);
                        history.push(nextPage);
                    });
                } else {
                    setCompleted((prev) => false);
                    setInteractionStep(0);
                    setArticle((prev) => prev + 1);
                }
                break;

            case 'control':
                if (article === 2) {
                    let nextPage = pageHandler(props.pages, location.pathname);
                    history.push(nextPage);
                } else {
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
        if (interactionStep < 1) {
            setInteractionStep((prev) => prev + 1);
        } else {
            setInteractionStep((prev) => 0);
        }
    };

    const visualBehaviorHandler = () => {
        if (interactionStep === 1) {
            setCompleted(() => true);
        }
    };


    function ArticleTypeSelector() {
        switch (treatment) {
            case 'control':
                return (
                    <div className={styles.articleStructure}>
                        <div className={styles.title}>
                            {`${articleContent.title}`}
                        </div>
                        <div className={styles.subtitle}>
                            <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p>
                            <hr/>
                            <p>{
                                makeImportant('subTitle')
                            }</p>
                        </div>
                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.subTitle2}`}</p>
                        <div className={styles.articleImageContainer}>
                            <img src={`${articleContent.articles[article].image}`} className={styles.articleImage}
                                 alt='Since 2002 percentage of Americans population with drug use disorders'/>
                        </div>
                        <div className={styles.paragraph}>
                            {makeImportant('body')}
                        </div>
                    </div>
                );
            case 'txt':
                return (
                    <div className={styles.articleStructure}>
                        <div className={styles.title}>
                            {`${articleContent.title}`}
                        </div>
                        <div className={styles.subtitle}>
                            <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p>
                            <hr/>
                            <div style={{lineHeight: '3rem'}}>{makeImportant('subTitle')}
                                <FormControl
                                    variant="outlined"
                                    sx={{
                                    position: 'relative',
                                    mx: 3,
                                    my: 1,
                                    minWidth: 300,
                                    top: -15,
                                    py: 2,
                                    fontSize: 12
                                }}
                                >
                                    <InputLabel id="trend-selector">Select Your Guess Here</InputLabel>
                                    <Select
                                        labelId="trend-selector"
                                        id="trend-selector-dropdown"
                                        value={trend}
                                        onChange={handleChange}
                                        autoWidth
                                        required={true}
                                        disabled={completed}
                                        // label="Select your guess here..."
                                        style={{
                                            display: 'inline-flex',
                                            position: "relative",
                                            border: '1px solid white',
                                            height: '18pt',
                                            fontSize: '12pt',
                                            backgroundColor: 'lightgray'
                                        }}
                                    >
                                        <MenuItem value={1}>Significantly Decreased</MenuItem>
                                        <MenuItem value={2}>Slightly Decreased</MenuItem>
                                        <MenuItem value={3}>Not Much Changed</MenuItem>
                                        <MenuItem value={4}>Slightly Increased</MenuItem>
                                        <MenuItem value={5}>Significantly Increased</MenuItem>


                                    </Select>
                                    <FormHelperText>Select your guess from the list</FormHelperText>
                                </FormControl>
                            </div>
                            <p className={styles.txtUnique}>{`${articleContent.articles[article].text.subTitle2}`}</p>
                        </div>
                        {(() => {
                            if (completed) {
                                return (<div>
                                    <div className={styles.articleImageContainer}>
                                        <img src={`${articleContent.articles[article].image}`}
                                             className={styles.articleImage}
                                             alt='Since 2002 percentage of Americans population with drug use disorders'/>
                                    </div>
                                    <div className={styles.paragraph}>
                                        {makeImportant('body')}
                                    </div>
                                </div>)
                            } else {
                                return ("");
                            }
                        })()}
                    </div>
                );
            case 'visual':
                return (<div className={styles.articleStructure}>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>

                    <div className={styles.subtitle}>
                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p>
                        <hr/>
                        <p>{
                            makeImportant('subTitle')
                        }</p>
                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.subTitle2}`}</p>
                    </div>

                    <LineChartDrawHandler
                        articleName={articleContent.articles[article].name}
                        alias={articleContent.articles[article].alias}
                        visStep={interactionStep}
                        handleVisState={interactionStepHandler}
                        article={article}
                        completed={completed}
                        responses={articleResponses}
                    />
                    {(() => {
                            if (interactionStep === 1) {
                                return (
                                    <div className={styles.paragraph}>

                                        {makeImportant('body')}
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

    // console.log({
    //     article: article,
    //     completed: completed,
    //     interactionStep: interactionStep
    // })

    useEffect(() => {
        visualBehaviorHandler();
    }, [interactionStep])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.articleContainer}>
                <div className={styles.progressBar}>
                    {(() => {
                        return articleContent.articles.map((d, i) => {
                            if (i === article) {
                                return (
                                    <span
                                        key={`article${i}`}
                                        className={styles.articleIdActive}> Article {`${articleContent.articles[i].id}`}</span>)
                            } else {
                                return (
                                    <span
                                        key={`article-deactive-${i}`}
                                        className={styles.articleIdDeactive}> Article {`${articleContent.articles[i].id}`}</span>)
                            }

                        });
                    })()
                    }
                </div>
                {ArticleTypeSelector()}
            </div>
            <div className={styles.navigationContainer}>
                <button className={styles.actions} type={"button"} onClick={articleChanger}
                        disabled={!completed && treatment !== 'control'}>
                    Next
                </button>
            </div>
        </div>)
};