import React, { useRef, lazy, Suspense, useState} from 'react';


import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import axios from "axios";
import * as Survey from "survey-react";
import { Divider, Typography, Container, Button } from "@mui/material";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { useRecoilValue } from "recoil";
import { questionState } from "../../atoms/questionSelector";
import "survey-react/survey.css";
import styles from "./articles.module.css";
const LineChart = lazy(() => import('./visualizations/recallLinechart_Opioids'));


const Recall_Opioids = (props) => {
  const lineData = [
    {
      id: 1,
      value: 730,
      year: 1999,
    },
    {
      id: 1,
      value: 782,
      year: 2000,
    },
    {
      id: 1,
      value: 957,
      year: 2001,
    },
    {
      id: 1,
      value: 1295,
      year: 2002,
    },
    {
      id: 1,
      value: 1400,
      year: 2003,
    },
    {
      id: 1,
      value: 1664,
      year: 2004,
    },
    {
      id: 1,
      value: 1742,
      year: 2005,
    },
    {
      id: 1,
      value: 2707,
      year: 2006,
    },
    {
      id: 1,
      value: 2213,
      year: 2007,
    },
    {
      id: 1,
      value: 2306,
      year: 2008,
    },
    {
      id: 1,
      value: 2946,
      year: 2009,
    },
    {
      id: 1,
      value: 3007,
      year: 2010,
    },
    {
      id: 1,
      value: 2666,
      year: 2011,
    },
    {
      id: 1,
      value: 2628,
      year: 2012,
    },
    {
      id: 1,
      value: 3105,
      year: 2013,
    },
    {
      id: 1,
      value: 5544,
      year: 2014,
    },
    {
      id: 1,
      value: 9580,
      year: 2015,
    },
    {
      id: 1,
      value: 19413,
      year: 2016,
    },
    {
      id: 1,
      value: 28466,
      year: 2017,
    },
    {
      id: 1,
      value: 31335,
      year: 2018,
    },
    {
      id: 1,
      value: 36359,
      year: 2019,
    },
    {
        id: 1,
        value: 56516,
        year: 2020,
    },
    {
        id: 1,
        value: 70601,
        year: 2021,
    },
  ];


  // const quizResponses = useRef([]);
  // const history = useHistory();
  // const location = useLocation();

  // const [clipAnimation, setClipAnimation] = useState(false);

  // const handleShowAnimation = () => {
  //   setClipAnimation(true);
  // };

  const quizResponses = useRef([]);
  const history = useHistory();
  const location = useLocation();
  const questionCondition = useRecoilValue(questionState);
  // console.log(questionCondition);
  const extraQuestions =
    questionCondition == "strength"
      ? [
        
        ]
      : [];

  const json = {
    pages: [
    
      {
        elements: [
          // {
          //   type: "html",
          //   html: "<p style='font-size: 22px;'>Since 2002, share of Americans  population with <span style='font-weight: bold;'>drug use disorders...</span>  </p>",
           
          // },
          
          {
            name: "claim",
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
            name: "suport",
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
            name: "viewOpinion",
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
  defaultThemeColors["$main-hover-color"] = "lightgrey";
  defaultThemeColors["$text-color"] = "#4a4a4a";
  defaultThemeColors["$header-color"] = "#7ff07f";

  defaultThemeColors["$header-background-color"] = "#4a4a4a";
  defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

  const correctStr = "Correct";
  const inCorrectStr = "Incorrect";

  Survey.StylesManager.applyTheme();

  const onCompleting = (survey, options) => {
    // console.log(options);
    let allTrue = true;
    survey.getAllQuestions().forEach((q) => {
    
    });
    quizResponses.current.push(survey.data);
    if (allTrue) {
      options.allowComplete = true;
    } else {
      options.allowComplete = false;
    }
  };

  const [visCompleted, setVisCompleted] = useState(false);

  function visStateHandler(){
      setVisCompleted((prevState)=>!prevState);
    console.log('VisStateHandler triggered',visCompleted);
    }

  // 
  function PageContentHandler(){
    console.log('PageContentHandler triggered!', visCompleted)
    if(visCompleted){
      return(
          <div className={styles.surveyContainer}><Survey.Survey
          model={model}
          onComplete={() => {
            let nextPage = pageHandler(props.pages, location.pathname);
            history.push(nextPage);
          }}
          onCompleting={onCompleting}
          onCurrentPageChanging={onCurrentPageChanging}

      />
      </div>)
    }
    else{
      return("")
    }

  }
  // 
  const onComplete = (survey, options) => {
    
    // console.log("Survey results: " + JSON.stringify(quizResponses.current));
    axios.post("/api/recall_drugOverdose", quizResponses.current).then((response) => {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    });
  };

  const onCurrentPageChanging = (survey, option) => {
    if (!option.isNextPage) return;
    let allTrue = true;
    // survey.getAllQuestions().forEach((q) => {
    //   if (survey.currentPage == q.page) {
        
    //   }
    // });
    // console.log(allTrue);
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
    var html = getTextHtml(text, correctStr, true);
    
  });
  

  return (
    
    <Container
      maxWidth={false}
      style={{
        width: "100%",
        overflow: "auto",
        minHeight: "600px",
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
        <Typography variant={"body1"}>
                   <span
                       className={`${styles.txtImportantUnique} ${styles.articleThree}`}>Article 3</span><p> Since 2002, the <span
                className={styles.txtImportant}>number</span> of Americans who have died every year from overdoses of <span
                className={styles.txtImportant}>synthetic opioids _______.</span></p>
        </Typography>
        
      </div>
      {/* <Survey.Survey
        model={model}
      /> */}

      <div className="viz" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "100%",margin:"0 auto"}}>
          <Suspense fallback={<div>loading...</div>}>
          <LineChart type="value" data={lineData} idLine={1} startYear={2002} visState={visCompleted} stateHandler={visStateHandler}/>
          </Suspense>
          {PageContentHandler()}
        </div>
            {/* <Survey.Survey
              model={model}
              onClick={() => {
                let nextPage = pageHandler(props.pages, location.pathname);
                history.push(nextPage);
              }}
            // onCompleting={onCompleting}
            // onCurrentPageChanging={onCurrentPageChanging}
            
          /> */}
        </div>
        {/* <Button
              variant="contained"
              color="primary"
              onClick={() => {
                let nextPage = pageHandler(props.pages, location.pathname);
                history.push(nextPage);
              }}
              style={{marginTop: '5%',marginLeft: '230px', marginRight: '20px'}}
            >
              Continue
        </Button> */}

    </Container>
  );
}

export default Recall_Opioids;
