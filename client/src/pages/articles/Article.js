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
    articles: [{
        name: "drugOverdose",
        id: "One",
        text: {
            subTitle: "Since 2002, the number of Americans who have died every year from Drug Overdose...",
            body: 'Since 2002, the number of Americans who have died every year from Drug Overdose has increased by more than 222.82 percent.' +
                'In 2015, more Americans died from drug overdoses than from car accidents and gun homicides combined.It\'s' +
                ' the worst drug overdose epidemic in American history, spurred by rising drug abuse, ' +
                'increased availability of prescription opioids and an influx of Drug Overdose potent synthetics like Fentanyl and Carfentanil.' +
                ' Drug overdoses are now the leading cause of death for Americans under 50.',
            instructions: "",
            definitions: "",
        },
        image: 'https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/b.JPG',
    },
        {
            name: "population",
            id: "Two",
            text: {
                subTitle: `The percentage of American population with drug use disorders has`,
                body: `Since 2002, the percentage of American population with drug use disorders has increased by more than 137 percent.
            The United States is currently in the grips of a powerful drug epidemic, with drug use disorders steadily climbing every year.
            A drug use disorder is a mental disorder that affects a person’s brain and behavior, leading to a person’s
            inability to control their use of drugs including legal or illegal drugs. Drug use disorders occur
            when an individual compulsively misuses drugs and continues abusing the substance despite
            knowing the negative impact it has on their life.`,
                instructions: 'Please answer the questions below',
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/c.JPG",
        },
        {
            name: "opioids",
            id: "Three",
            text: {
                subTitle: "Since 2002, the of Americans who have died every year from overdoses of synthetic opioids...",
                body: "Since 2002, the number of Americans who have died every year from overdoses of synthetic opioids" +
                    " has increased by more than 5451 percent. Substance use disorders refers to direct deaths from" +
                    " overdoses of illicit drugs synthetic opioids (mostly fentanyl). “We know than substance use is more" +
                    " dangerous than it has ever been, as fentanyl has continued to permeate the illicit drug supply," +
                    " increasing the risk for overdoses among both people with substance use disorders as well as those" +
                    " who use drugs occasionally,” said Dr. Nora Volkow, director of the National Institute on Drug" +
                    " Abuse. Deaths involving synthetic opioids such as fentanyl increased by a marked 18% in 2021," +
                    " according to the CDC data. Deaths involving cocaine and Psychostimulants such as Methamphetamine" +
                    " were also significantly more frequent, while those involving heroin decreased.",
                instructions: "",
                definitions: "",
            },
            image: "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/d.JPG",
        }]


}

export default function Articles(props) {

    const [article, setArticle] = useState(0);
    const [completed, setCompleted] = useState(false);
    const location = useLocation();
    const [trend, setTrend] = React.useState("");
    const articleResponses = useRef({
        treatment: props.treatment.current,
        responses:{}
    })
    const history = useHistory();
    // console.log('location',location)
    // console.log('pages',props.pages)
    useEffect(() => {
        if (trend !== "") {
            // console.log(trend);
            setCompleted(() => true);
        }else if(props.treatment.current === 'control'){
            setCompleted(()=>true);
        }else{
            setCompleted(()=>false);
        }
    }, [trend])

    // This function controls the behavior of Next button
    function articleChanger() {
        switch (props.treatment.current){
            case 'txt':
                articleResponses.current.responses[`${articleContent.articles[article].name}`] = {
                    time: Date.now(),
                    choice: trend,
                }
                if (article=== 2){
                    axios.post("/api/articles", articleResponses.current).then((response) => {
                        let nextPage = pageHandler(props.pages, location.pathname);
                        history.push(nextPage);
                    });
                    // pageHandler(props.pages, location.pathname);
                }else{
                    setArticle((prev) => prev + 1);
                    setTrend(()=>"");
                    // console.log('res:',articleResponses.current);
                }
                break;
            case 'visual':
                setCompleted((prev)=> false);
                setArticle((prev) => prev + 1);
                break;
        }

    }
    // This function controls the change in the input value for dropdown
    const handleChange = (event) => {
        setTrend(event.target.value);
    };

    // This function controls the behavior of Next button
    // function articleHandler() {
    //     if (completed) {
    //         pageHandler(props.pages, location.pathname);
    //     } else {
    //         articleChanger();
    //     }
    // }

    //This function controls show text inside the LineChart component
    function handleShowText(){
        setCompleted(()=> true);
    }
    // This function goes over the three articles based on the treatment type
    function ArticleTypeSelector() {
        switch (props.treatment.current) {
            case 'control':
                return (
                    <div className={styles.articleStructure}>
                        <div className={styles.title}>
                            {`${articleContent.title}`}
                        </div>
                        <div className={styles.subtitle}>
                            <p>{`${articleContent.articles[article].text.subTitle}`}</p>
                        </div>
                        <div className={styles.articleImageContainer}>
                            <img src={`${articleContent.articles[article].image}`} className={styles.articleImage}
                                 alt='Since 2002 percentage of Americans population with drug use disorders'/>
                        </div>
                        <div className={styles.paragraph}>
                            {`${articleContent.articles[article].text.body}`}
                        </div>
                    </div>
                );
            case 'txt':
                return (
                    <div className={styles.articleStructure}>
                        <div className={styles.title}>
                            {`${articleContent.title}`}
                        </div>
                        {(()=> {if(!completed){
                            return(<div className={styles.subtitle}>

                                <p>{`${articleContent.articles[article].text.subTitle}`}</p>
                                <FormControl sx={{
                                    position: 'relative',
                                    mx: 2,
                                    my: 0,
                                    minWidth: 200,
                                    top: -15,
                                    py: 2
                                }}>
                                    <InputLabel id="trend-selector">Select Here</InputLabel>
                                    <Select
                                        labelId="trend-selector-label"
                                        id="trend-selector-dropdown"
                                        value={trend}
                                        onChange={handleChange}
                                        autoWidth
                                        required={true}
                                        label="Select here..."
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
                                </FormControl>

                            </div>)}else{
                            return("");
                        }
                        })()}
                        {(()=> {
                            if(completed){
                            return (<div><div className={styles.articleImageContainer}>
                                <img src={`${articleContent.articles[article].image}`} className={styles.articleImage}
                                     alt='Since 2002 percentage of Americans population with drug use disorders'/>
                            </div>
                            <div className={styles.paragraph}>
                                {`${articleContent.articles[article].text.body}`}
                            </div></div>)}else{
                                return("");
                            }
                        })()}
                    </div>
                );
            case 'visual':

                return(
                    <div>
                    <LineChartDrawHandler
                        articleName = {articleContent.articles[article].name}
                        showText = {handleShowText}
                    />
                        {(()=>{
                            if(completed){
                                return (
                                    <div className={styles.articleStructure}>
                                        <div className={styles.title}>
                                            {`${articleContent.title}`}
                                        </div>
                                        <div className={styles.subtitle}>
                                            <p>{`${articleContent.articles[article].text.subTitle}`}</p>
                                        </div>
                                        <div className={styles.articleImageContainer}>
                                            <img src={`${articleContent.articles[article].image}`} className={styles.articleImage}
                                                 alt='Since 2002 percentage of Americans population with drug use disorders'/>
                                        </div>
                                        <div className={styles.paragraph}>
                                            {`${articleContent.articles[article].text.body}`}
                                        </div>
                                    </div>
                                );
                            } else{
                                return("")
                            }
                        })()}
                    </div>
                );


            default:
                break;
        }
    }

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
                <button className={styles.actions} type={"button"} onClick={articleChanger} disabled={!completed}>
                    Next
                </button>
            </div>
        </div>)
};