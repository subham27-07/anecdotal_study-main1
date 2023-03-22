import React, {useEffect, useRef, useState} from "react";
import styles from './articles.module.css'
import pageHandler from "../pageHandler";
import {useHistory, useLocation} from "react-router-dom";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import axios from "axios";
import LineChartDrawHandler from "../survey/visualizations/LineChartDrawHandler";
import TextElicitation from "../../components/TextElicitation/TextElicitation";

const instructionsContent = {
    txt: "Select your guess from the dropdown provided below.",
    visual: " Draw your guess on the chart below.",
    control: "Read the article below."
}


export default function Articles(props) {
    const treatment = localStorage.getItem('treatment');
    const [article, setArticle] = useState(() => {
        const savedArticle = JSON.parse(localStorage.getItem('articleNumber'));
        return savedArticle || 0;
    });
    
    const [completed, setCompleted] = useState(() => {
        const articleCompleted = JSON.parse(localStorage.getItem('articleCompleted'));
        return articleCompleted || false;
    });
    // const [interactionStep, setInteractionStep] = useState(() => {
    //     const savedIntStep = JSON.parse(localStorage.getItem('articleIntStep'));
    //     return savedIntStep || 0 ;
    // });
    
    const[elicitationStep, setElicitationStep]=useState(()=>{
        const savedElicitationStep = JSON.parse(localStorage.getItem('savedElicitationStep'));
        return savedElicitationStep || 0;
    })
    

    const location = useLocation();
    
    const [trend, setTrend] = useState(() => {
        const savedArticleTrend = JSON.parse(localStorage.getItem('articleTrend'));
        return savedArticleTrend || "";
    });
    const [trend2, setTrend2] = useState(() => {
        const savedArticleTrend = JSON.parse(localStorage.getItem('articleTrend2'));
        return savedArticleTrend || "";
    });
    const [trend3, setTrend3] = useState(() => {
        const savedArticleTrend = JSON.parse(localStorage.getItem('articleTrend3'));
        return savedArticleTrend || "";
    });

    useEffect(()=>{
        // console.log('elicitationStep',elicitationStep)
    },[elicitationStep])

    const handleElicitationStep= ()=>{
        setElicitationStep((prev) => prev + 1)

    }

    // const handleElicitationStep= ()=>{
    //     // setElicitationStep((prev) => prev + 1)
    //     if(elicitationStep>=3){
    //         setElicitationStep
    //     } else {
    //         setElicitationStep((prev) => prev + 1)

    //     }

    // }

    
    const articleResponses = useRef({
        treatment: treatment,
        responses: {}
    })
    const history = useHistory();

    const articleContent = {
        title: 'How Bad Is the Drug Overdose Epidemic?',
        articles: [{
            alias: 'drugOverdose',
            alias1: 'gun',
            alias2: 'hiv',
            name: "Deaths from Drug Overdose",
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
                        ` ${instructionsContent[treatment]}`,
                    definitions: "",
                },
                image: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/001.png',
                imageExtra1: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Gun_violence.png',
                imageExtra2: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/HIV_data.png',
                       
        },
        
            {
                alias: 'population',
                alias1: 'southAfrica',
                alias2: 'italy',
                name: "% of American Population with Drug Overdose Disorder",
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
                        + ` ${instructionsContent[treatment]}`,
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
                        " 2002?" + ` ${instructionsContent[treatment]}`,
                    definitions: "",
                },
                image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/003.png",
                imageExtra1: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/cocain.png",
                imageExtra2: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Heroin.png",
            },

        ]
    }

    useEffect(() => {
        localStorage.setItem('articleNumber', JSON.stringify(article));
    }, [article])

    useEffect(() => {
        localStorage.setItem('articleTrend', JSON.stringify(trend));
    }, [trend])

    useEffect(() => {
        localStorage.setItem('articleTrend2', JSON.stringify(trend2));
    }, [trend2])

    useEffect(() => {
        localStorage.setItem('articleTrend3', JSON.stringify(trend3));
    }, [trend3])


    // useEffect(() => {
    //     localStorage.setItem('articleIntStep', JSON.stringify(interactionStep));
    // }, [interactionStep])



    useEffect(() => {
        localStorage.setItem('articleCompleted', JSON.stringify(completed));

    }, [completed])


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article])

    useEffect(() => {

        if (treatment==='txt' && (trend && trend2 && trend3)) {
            // console.log('complted',completed)
            // console.log('testCompleted',trend,trend2,trend3);

            setCompleted((prev) => {
            // localStorage.setItem('articleCompleted','true')
            return true});

            
        } else if (treatment === 'control') {
            setCompleted(() => true);
        } else {
            setCompleted(() => false);
        }
    }, [trend,trend2,trend3])

    useEffect(()=>{
        if(elicitationStep===3){
            setCompleted(true)
        } else{
            setCompleted(false)
        }
    },[elicitationStep])

    function makeImportant(whichText) {
        return articleContent.articles[article].text[whichText].map((d, i) => {
            if (['number', 'percentage', 'percent','HIV','Gun Violence','South Africa','Italy','Heroin','Cocaine','Drug Overdose...','declined'].some(
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
                    // console.log('testTrend')
                    setTrend(() => "");
                   
                    
                    setTrend2((prev) => {
                            // localStorage.setItem('articleCompleted','true')
                        return ""});
                    
                    setTrend3((prev) => {
                                // localStorage.setItem('articleCompleted','true')
                        return ""});
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
                    // setInteractionStep(0);

                    setElicitationStep(prev=>0)
                    
                    setArticle((prev) => prev + 1);
                }
                break;

            case 'control':
                if (article === 2) {
                    axios.post("/api/articles", articleResponses.current).then((response) => {
                        let nextPage = pageHandler(props.pages, location.pathname);
                        history.push(nextPage);
                    });
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

    

    useEffect(()=>{
        // console.log(elicitationStep)
        
    },[elicitationStep])
    

    

    // console.log(elicitationStep)


    function ArticleTypeSelector() {
        switch (treatment) {
            case 'control':
                return (
                    <div className={styles.articleStructure}>
                        {/* ... other JSX elements */}
                        {/* ... first extra subtitle, body text, and image */}
                        <div className={styles.title}>
                                {`${articleContent.title}`}
                            </div>
                            <div className={styles.subtitle}>
                                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p>
                                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.subTitle2}`}</p>
   
                            <div className={styles.subtitle}>
                        </div>
                            
                        </div>

                        <div className={styles.subtitle}>
                                    {/* <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p> */}
                                    <hr/>
                                    <p>{
                                        makeImportant('subTitleExtra1')
                                    }</p>
                                    <div className={styles.subtitle}>
                       
                        </div>
                        <div className={styles.articleImageContainer}>
                            <img src={`${articleContent.articles[article].imageExtra1}`} className={styles.articleImage}
                                 alt='Extra image 1 for Article'/>
                        </div>
                        <div className={styles.paragraph}>
                            {makeImportant('bodyExtra1')}
                        </div>
                        </div>
                        {/* ... second extra subtitle, body text, and image */}
                        <div className={styles.subtitle}>
                                    {/* <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p> */}
                                    <hr/>
                                    <p>{
                                        makeImportant('subTitleExtra2')
                                    }</p>
                                    <div className={styles.subtitle}>
                            
                        </div>
                        <div className={styles.articleImageContainer}>
                            <img src={`${articleContent.articles[article].imageExtra2}`} className={styles.articleImage}
                                 alt='Extra image 2 for Article'/>
                        </div>
                        <div className={styles.paragraph}>
                            {makeImportant('bodyExtra2')}
                        </div>

                        {/*  */}
                        <div className={styles.subtitle}>
                                    {/* <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p> */}
                                    <hr/>
                                    <p>{
                                        makeImportant('subTitle')
                                    }</p>
                                    <div className={styles.subtitle}>
                       
                        </div>
                        <div className={styles.articleImageContainer}>
                            <img src={`${articleContent.articles[article].image}`} className={styles.articleImage}
                                 alt='Extra image 1 for Article'/>
                        </div>
                        <div className={styles.paragraph}>
                            {makeImportant('body')}
                        </div>
                        </div>
                        
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
                                <p className={styles.txtUnique}>{`${articleContent.articles[article].text.subTitle2}`}</p>
                            </div>

                        <TextElicitation 
                        instructionText = {articleContent.articles[article].text.instructions}
                        subTitle = {makeImportant('subTitleExtra1')}
                        body = {makeImportant('bodyExtra1')}
                        images = {articleContent.articles[article].imageExtra1}
                        setTrend = {setTrend}
                        trend = {trend}
                        styles = {styles}
                       
                        >
                        </TextElicitation>
                        {trend!==''?<TextElicitation
                        instructionText = {articleContent.articles[article].text.instructions}
                        subTitle = {makeImportant('subTitleExtra2')}
                        body = {makeImportant('bodyExtra2')}
                        images = {articleContent.articles[article].imageExtra2}
                        setTrend = {setTrend2}
                        trend = {trend2}
                        styles = {styles}
                        >
                        </TextElicitation>:''}
                        {trend2!==''?<TextElicitation 
                        instructionText = {articleContent.articles[article].text.instructions}
                        subTitle = {makeImportant('subTitle')}
                        body = {makeImportant('body')}
                        images = {articleContent.articles[article].image}
                        setTrend = {setTrend3}
                        trend = {trend3}
                        styles = {styles}
                        >
                        </TextElicitation>:''}
                        </div>
                    );
            case 'visual':
                return (<div className={styles.articleStructure}>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>

                    <div className={styles.subtitle}>
                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.instructions}`}</p>
                        
                        <p className={styles.txtUnique}>{`${articleContent.articles[article].text.subTitle2}`}</p>
                        <hr/>
                    </div>

                    <div>
                    <LineChartDrawHandler
                    articleName={articleContent.articles[article].name}
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
                    >
                        
                    </LineChartDrawHandler>
                    

                    {elicitationStep >= 1?<LineChartDrawHandler
                    articleName={articleContent.articles[article].name}
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
                    >
                    </LineChartDrawHandler>:''}


                    </div>
                    
                    
                </div>);
            default:
                break;
        }
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
                        disabled={!completed  && treatment !== 'control'}>
                    Next
                </button>
            </div>
        </div>)
};