import React, {useState, useRef, useEffect} from "react";
import styles from './articles.module.css'
import pageHandler from "../pageHandler";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import LineChartDrawHandler from "../survey/visualizations/LineChartDrawHandler";
import RecallSurvey from "../../components/recallSurvey/RecallSurvey";


const articleContent = {
    title: 'How Bad Is the Drug Overdose Epidemic?',
    articles2: [{
        alias: 'drugOverdose',
        name: "Deaths from Drug Overdose",
        id: "One",
        text: {
            subTitle:["Since 2002, the", "number of", "Americans who have died" +
            " every year from Drug Overdose..."],
            subTitle2: "",

            body: ['Since 2002,',' the number of',' Americans who have died every year from Drug Overdoses has' +
            ' increased by more than', '200 percent.',
                ' In 2015, more Americans died from drug overdoses than from car accidents and gun homicides' +
                ' combined.It\'s' +
                ' the worst drug overdose epidemic in American history, spurred by rising drug abuse, ' +
                'increased availability of prescription opioids and an influx of Drug Overdose potent synthetics like Fentanyl and Carfentanil.' +
                ' Drug overdoses are now the leading cause of death for Americans under 50.'],
            instructions: "How has the number of Americans died from drug overdoses in the US changed since 2002?" +
                " Recreate the line you saw for this article in the chart below.",
            definitions: "",
        },
        image: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/001.png',
    },
        {
            alias: 'population',
            name: "% of American Population with Drug Overdose Disorder",
            id: "Two",
            text: {
                subTitle: ["Since 2002, the", "percentage of","American population with drug use disorders has..."],
                subTitle2: "Drug use disorder is a complex condition in which there is uncontrolled use of a drug despite harmful consequences.",

                body: ["Since 2002,"," the percentage of"," American population with drug use disorders has" +
                " increased by more than"," 38.6 percent.",
                    "The United States is currently in the grips of a powerful drug epidemic, with the share of" +
                    " population with drug use disorders steadily climbing every year."+
                    "A drug use disorder is a behavioral condition that affects a person’s brain and behavior, leading" +
                    " to a person’s inability to control their use of drugs including legal or illegal drugs."+
                    "Drug use disorders occur when an individual compulsively misuses drugs and continues" +
                    " abusing the substance despite knowing the negative impact it has on their life."],
                instructions: "How has the percentage of Americans with drug use disorders in the US changed since" +
                    " 2002?" + " Recreate the line you saw for this article in the chart below.",
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/002.png",
        },
        {
            alias: 'opioids',
            name: "Deaths from Synthetic Opioids Overdose",
            id: "Three",
            text: {
                subTitle: ["Since 2002, the","number of","Americans who have died every year from overdoses of" +
                " synthetic" +
                " opioids..."],

                subTitle2: "Synthetic opioids are a type of opioids that are synthesized in a laboratory. Other" +
                    " (non-synthetic) opioids include illegal drugs such as heroin and cocaine and prescription" +
                    " opioids such as Oxycodone.",

                body: ["Since 2002,"," the number of ", "Americans who have died every year from overdoses of" +
                " synthetic" + " opioids has increased by more than"," 5351 percent.", "Substance use disorders" +
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
                    " 2002?" + " Recreate the line you saw for this article in the chart below.",
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/003.png",
        }]
}

export default function ArticlesRecall(props) {

    const [article, setArticle] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [interactionStep, setInteractionStep] = useState(0);
    const location = useLocation();
    const [trend, setTrend] = React.useState("");
    const [formCompleted, setFormCompleted] = useState(false);
    const articleResponses = useRef({
        treatment: props.treatment.current,
        responses: {}
    })
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    useEffect(()=>{
        console.log(
            ['!completed', !completed],
            ['formCompleted', !formCompleted],
            ['cond', (props.treatment.current !== 'control')],
            ['disabled', (!completed && props.treatment.current !== 'control' && !formCompleted)]

        )
    },[completed,formCompleted])

    function makeImportant(whichText) {
        return articleContent.articles2[article].text[whichText].map((d) => {
            if (['number', 'percentage', 'percent'].some(
                (keyword) => {
                    return d.includes(keyword);
                }
            )) {
                return (<strong> {d} </strong>);
            } else {
                return (d)
            }
        });
    }

    // This function controls the behavior of Next button
    function articleChanger() {

                if (article === 2) {
                    axios.post("/api/articlesRecall", articleResponses.current).then((response) => {
                        let nextPage = pageHandler(props.pages, location.pathname);
                        history.push(nextPage);
                    });
                } else {
                    setFormCompleted((prev) => false);
                    setCompleted((prev) => false);
                    setInteractionStep(0);
                    setArticle((prev) => prev + 1);
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
        if (interactionStep === 1 && formCompleted) {
            setCompleted(() => true);
        }
    };


    function ArticleTypeSelector() {
                return (<div className={styles.articleStructure}>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>
                    <div className={styles.subtitle}>
                        <p className={styles.txtUnique}>{`${articleContent.articles2[article].text.instructions}`}</p>
                        <hr/>
                        <p>{
                            makeImportant('subTitle')
                        }</p>
                        <p className={styles.txtUnique}>{`${articleContent.articles2[article].text.subTitle2}`}</p>
                    </div>

                    <LineChartDrawHandler
                        alias={articleContent.articles2[article].alias}
                        articleName={articleContent.articles2[article].name}
                        visStep={interactionStep}
                        handleVisState={interactionStepHandler}
                        article={article}
                        completed={completed}
                        responses={articleResponses}
                        elicitationType='recall'
                    />
                    {(() => {
                        if (interactionStep === 1) {
                            return (
                                <div style={{display:"flex", flexDirection:'column'}}>
                                    <div className={styles.paragraph}>
                                        {makeImportant('body')}
                                    </div>
                                    {(() => {
                                        if (formCompleted) {
                                            return (
                                                <div className={styles.messageContainer}>
                                                    <p className={styles.messageCorrect}>Your answers are saved.</p>
                                                </div>
                                            )
                                        } else {
                                            return (<RecallSurvey
                                                pages={props.pages}
                                                location={location}
                                                responses={articleResponses}
                                                alias={articleContent.articles2[article].alias}
                                                setFormCompleted={setFormCompleted}
                                            />)
                                        }
                                    })()}

                                </div>
                            )
                        } else {
                            return ("")
                        }
                    }
                    )()}
                </div>);
    }
        useEffect(() => {
            visualBehaviorHandler();
        }, [interactionStep])

        return <div className={styles.mainContainer}>
            <div className={styles.articleContainer}>
                <div className={styles.progressBar}>
                    {(() => {
                        return articleContent.articles2.map((d, i) => {
                            if (i === article) {
                                return <span
                                        key={`article${i}`}
                                        className={styles.articleIdActive}> Article {`${articleContent.articles2[i].id}`}</span>
                            } else {
                                return <span
                                        key={`article-deactive-${i}`}
                                        className={styles.articleIdDeactive}> Article {`${articleContent.articles2[i].id}`}</span>
                            }

                        });
                    })()
                    }
                </div>
                {ArticleTypeSelector()}
            </div>
            <div className={styles.navigationContainer}>
                <button className={styles.actions} type={"button"} onClick={articleChanger}
                        disabled={!completed && !formCompleted}>
                    Next
                </button>
            </div>
        </div>
    };