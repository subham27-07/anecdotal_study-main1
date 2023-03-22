import React, {useState, useRef, useEffect} from "react";
import styles from './articles.module.css'
import pageHandler from "../pageHandler";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import LineChartDrawHandler from "../survey/visualizations/LineChartDrawHandler";
import RecallSurvey from "../../components/recallSurvey/RecallSurvey";

const instructionsContent = {
    visual: " Draw your guess on the chart below."

} 
const articleContent = {
    title: 'How Bad Is the Drug Overdose Epidemic?',
    articles: [{
        alias: 'drugOverdose',
        alias1: 'gun',
        alias2: 'hiv',
        name: "Deaths from Drug Overdose",
        name1: "Deaths from Gun Violence",
        name2: "Deaths from HIV",
        id: "One",
        text: {
            subTitle: ["Since 2002, the", "number of", "Americans who have died" +
                " every year from ", "Drug Overdose..."],
                subTitle2: "",

                body: ['Since 2002,', ' the number of', ' Americans who have died every year from Drug Overdoses has' +
                ' increased by more than', '200 percent.',
                    ' In 2015, more Americans died from drug overdoses than from car accidents and gun homicides' +
                    ' combined.It\'s' +
                    ' the worst drug overdose epidemic in American history, spurred by rising drug abuse, ' +
                    'increased availability of prescription opioids and an influx of Drug Overdose potent synthetics like Fentanyl and Carfentanil.' +
                    ' Drug overdoses are now the leading cause of death for Americans under 50.'],
                subTitleExtra1: ["Since 2002, the", "number of", "Americans who have died",
                    " every year from ", "Gun Violence..."],
                bodyExtra1: ['Since 2002,', ' the number of Americans', ' who have died every year from guns has generally ', 'declined','but slowly risen in recent years. Compared to 2002, the ','number of deaths from guns,',' most of which are suicides,', 'decreased by 13.8 percent in 2019.'],
                subTitleExtra2: ["Since 2002, the", "number of", "Americans who have died",
                    " every year from ", "HIV.."],
                bodyExtra2: ['Since 2002,', ' the number of', ' Americans who have died every year','from HIV ',
                    ' has steadily declined',' by 54.4 percent. ', ' Death rates fell sharply since the development of antiretroviral treatments. Nevertheless, H.I.V. remains a leading cause of death for those 25 to 44.'],
                    instructions: "How do the yearly deaths from drug overdoses compare with deaths from HIV and Gun Violence in the U.S.?" +
                    " Recreate the line you saw for these article in the chart below.",
                definitions: "",
            },
            image: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/001.png',
            imageExtra1: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/HIV_data.png',
            imageExtra2: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Gun_violence.png',
                   
    },
    
        {
            alias: 'population',
            alias1: 'southAfrica',
            alias2: 'italy',
            name: "% of American Population with Drug Overdose Disorder",
            name1: "% of South African Population with Drug Overdose Disorder",
            name2: "% of Italian Population with Drug Overdose Disorder",
            id: "Two",
            text: {
                
                subTitle: ["Since 2002, the", "percentage of American", " population with drug use disorders" +
                    " has..."],
                    subTitle2: "Drug use disorder is a complex condition in which there is uncontrolled use of a drug despite harmful consequences.",

                    body: ["Since 2002,", " the percentage of American"," population with drug use disorders has" +
                    " increased by more than", " 38.6 percent.",
                        "The United States is currently in the grips of a powerful drug epidemic, with the share of" +
                        " population with drug use disorders steadily climbing every year."],
                  
                    subTitleExtra1: ["Since 2002, the", "percentage of", " South African", " population with drug use disorders" +
                    " has..."],
                    bodyExtra1: ['Since 2002,', ' the percentage of South African', ' population with drug use disorders has' +
                    ' decreased by more than', '37.1 percent.',
                        'In South Africa,',' the share of population with drug use disorders steadily decline every year.'],
                    subTitleExtra2: ["Since 2002, the", "percentage of Italian"," population with drug use disorders" +
                    " has..."],
                    bodyExtra2: ['Since 2002,', ' the percentage of Italian', ' population with drug use disorders has' +
                    ' decreased by more than', '23.5 percent.',
                        'In Italy,',' the share of population with drug use disorders steadily decline every year. The declining rate is slightly lower than ','South Africa.'],

                        instructions: "How is the percentage of Americans with drug use disorders in the US" + " since 2002 " + " compared to South Africa and Italy?" +
                    ""
                    + " Recreate the line you saw for these article in the chart below.",
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/002.png",
            imageExtra1: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/SouthAfrica.png",
            imageExtra2: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Italy.png",
        },
        {
            alias: 'opioids',
            alias1: 'cocaine',
            alias2: 'heroin',
            name: "Deaths from Synthetic Opioids Overdose",
            name1: "Deaths from Cocaine Overdose",
            name2: "Deaths from Heroin Overdose",
            id: "Three",
            text: {
                subTitle: ["Since 2002, the", "number of Americans"," who have died every year from overdoses of" +
                    " synthetic" +
                    " opioids..."],

                    subTitle2: "Synthetic opioids are a type of opioids that are synthesized in a laboratory. Other" +
                        " (non-synthetic) opioids include illegal drugs such as heroin and cocaine and prescription" +
                        " opioids such as Oxycodone.",

                        body: ["Since 2002,", " the number of ", "Americans who have died every year from" +
                        " synthetic opioids (mostly Fentanyl) overdoses has increased by more than", " 5351 percent.",
                            "Substance use disorders refer to direct deaths from overdoses of illicit drugs." +
                        " We know that substance use is more dangerous than it has ever been, as" + " fentanyl has continued to" +
                        " permeate the illicit drug supply, increasing the risk for overdoses among both people with" +
                        " substance use disorders as well as those who use drugs occasionally, said Dr. Nora Volkow," +
                        " director of the National Institute on Drug Abuse. Deaths involving synthetic opioids such as" +
                        " fentanyl increased by a marked 18% in 2021, according to the CDC data. Deaths involving" +
                        " cocaine and psychostimulants such as methamphetamine were also significantly more frequent," +
                        " while those involving heroin decreased."],
                    subTitleExtra1: ["Since 2002, the", "number of Americans"," who have died" +
                    " every year from ","Cocaine..."],
                    bodyExtra1: ['Since 2002,', ' the number of Americans', ' population ', 'who have died from' ,'Cocaine',' overdose ',
                    ' steadily increased by more than', '242 percent.',
                        ''],
                    subTitleExtra2: ["Since 2002, the", "number of Americans"," who have died" +
                    " every year from ","Heroin..."],
                    bodyExtra2: ['Since 2002,', ' the number of Americans', ' population ','who have died from','Heroin',' overdose ','steadily increased and then declined after 2016. Compared to 2002, the', ' number of Americans ', ' who have died from',' Heroin',' overdose increased by', '339 percent.',
                        ''],
                        instructions: "How has the number of Americans who have died every year from synthetic opioids overdose compared to deaths from Cocaine and Heroin "
                        + " since" +
                    " 2002?" + " Recreate the line you saw for these article in the chart below.",
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/003.png",
            imageExtra1: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/cocain.png",
            imageExtra2: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Heroin.png",
        },

    ]
}

export default function ArticlesRecall(props) {

    const [article, setArticle] = useState(()=>{
        const savedArticle = JSON.parse(localStorage.getItem('RecallArticleNumber'));
        return savedArticle || 0;
    });
    // const [completed, setCompleted] = useState(false);
    const [completed, setCompleted] = useState(() => {
        const articleCompleted = JSON.parse(localStorage.getItem('articleCompleted'));
        return articleCompleted || false;
    });

    // const [interactionStep, setInteractionStep] = useState(()=> {
    //     const RecallIntStep = JSON.parse(localStorage.getItem('RecallIntStep'));
    //     return RecallIntStep || 0;
    // });
    
    const[elicitationStep, setElicitationStep]=useState(()=>{
        const savedElicitationStep = JSON.parse(localStorage.getItem('savedElicitationStep'));
        return savedElicitationStep || 0;
    })
    
    const location = useLocation();
    const [trend, setTrend] = React.useState("");
    const [formCompleted, setFormCompleted] = useState(false);
    const articleResponses = useRef({
        treatment: localStorage.getItem('treatment'),
        responses: {}
    })
    const history = useHistory();

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     if(interactionStep === 1){
    //         window.scrollTo(0, 0);
    //     }
    // }, [article, interactionStep])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article])
    // useEffect(()=>{
    //     console.log(
    //         ['!completed', !completed],
    //         ['formCompleted', !formCompleted],
    //         ['cond', (props.treatment.current !== 'control')],
    //         ['disabled', (!completed && props.treatment.current !== 'control' && !formCompleted)]
    //
    //     )
    // },[completed,formCompleted])

    useEffect(()=>{
        // console.log('elicitationStep',elicitationStep)
    },[elicitationStep])

    useEffect(()=>{
        localStorage.setItem('RecallArticleNumber', JSON.stringify(article))
    },[article])

    const handleElicitationStep= ()=>{
        setElicitationStep((prev) => prev + 1)

    }

    

    // useEffect(()=>{
    //     localStorage.setItem('RecallIntStep', JSON.stringify(interactionStep))
    // },[interactionStep])

    useEffect(()=>{
        if(elicitationStep===3 && formCompleted){
            setCompleted(true)
        } else{
            setCompleted(false)
        }
    },[elicitationStep,formCompleted])


    function makeImportant(whichText) {
        return articleContent.articles[article].text[whichText].map((d, i) => {
            if (['number', 'percentage', 'percent','HIV','Gun Violence','South Africa','Italy','Heroin','Cocaine','Drug Overdose...'].some(
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

        if (article === 2) {
            axios.post("/api/articlesRecall", articleResponses.current).then((response) => {
                let nextPage = pageHandler(props.pages, location.pathname);
                history.push(nextPage);
            });
        } else {
            setCompleted((prev) => false);
            // setInteractionStep(0);
            setFormCompleted(false);

            setElicitationStep(prev=>0)
            
            setArticle((prev) => prev + 1);
        }
    }

    // This function controls the change in the input value for dropdown
    const handleChange = (event) => {
        setTrend(event.target.value);
    };

    // const interactionStepHandler = () => {
    //     if (interactionStep < 1) {
    //         setInteractionStep((prev) => prev + 1);
    //     } else {
    //         setInteractionStep((prev) => 0);

    //     }
    // };

    // const visualBehaviorHandler = () => {
    //     if (interactionStep === 1 && formCompleted) {
    //         setCompleted(() => true);
    //     }
    // };


    function ArticleTypeSelector() {
                return (<div className={styles.articleStructure}>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>

                    <div className={styles.subtitle}>
                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p>
                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.subTitle2}`}</p>
                        <hr/>
                        {/* <p>{
                            makeImportant('subTitle')
                        }</p> */}
                        
                    </div>

                    <div>
                    <LineChartDrawHandler
                    articleName={articleContent.articles[article].name1}
                    subTitle = {makeImportant('subTitleExtra1')}
                    alias={articleContent.articles[article].alias1}
                    // visStep={interactionStep}
                    // handleVisState={interactionStepHandler}
                    elicitationStep = {elicitationStep}
                    handleElicitationStep = {handleElicitationStep}
                    article={article}
                    body = {makeImportant('bodyExtra1')}
                    // completed={completed}
                    responses={articleResponses}
                    elicitationType='recall'
                    >
                        
                    </LineChartDrawHandler>
                    

                    {elicitationStep >= 1?<LineChartDrawHandler
                    articleName={articleContent.articles[article].name2}
                    subTitle = {makeImportant('subTitleExtra2')}
                    alias={articleContent.articles[article].alias2}
                    // visStep={interactionStep}
                    // handleVisState={interactionStepHandler}
                    elicitationStep = {elicitationStep}
                    handleElicitationStep = {handleElicitationStep}
                    article={article}
                    body = {makeImportant('bodyExtra2')}
                    // completed={completed}
                    responses={articleResponses}
                    elicitationType='recall'
                    >
                    </LineChartDrawHandler>:''}

                    {elicitationStep >= 2?<LineChartDrawHandler
                    articleName={articleContent.articles[article].name}
                    subTitle = {makeImportant('subTitle')}
                    alias={articleContent.articles[article].alias}
                    // visStep={interactionStep}
                    // handleVisState={interactionStepHandler}
                    elicitationStep = {elicitationStep}
                    handleElicitationStep = {handleElicitationStep}
                    article={article}
                    body = {makeImportant('body')}
                    // completed={completed}
                    responses={articleResponses}
                    elicitationType='recall'
                    >
                    </LineChartDrawHandler>:''}


                    </div>
                    {(() => {
                        if (elicitationStep >= 3) {
                            return (
                                <div style={{display:"flex", flexDirection:'column'}}>
                                    
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
                                                alias={articleContent.articles[article].alias}
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
        // useEffect(() => {
        //     visualBehaviorHandler();
        // }, [interactionStep])

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
                            disabled={!completed}>
                        Next
                    </button>
                </div>
            </div>)
    };