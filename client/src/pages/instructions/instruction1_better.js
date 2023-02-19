import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Divider, Typography, Container } from "@mui/material/";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import * as Survey from "survey-react";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { useRecoilValue } from "recoil";
import { questionState } from "../../atoms/questionSelector";
import pageHandler from "../pageHandler";
import "survey-react/survey.css";

const messageFontSize = "min(1.3vw, 20px)";

const useStyles = makeStyles((theme) => ({
  emph: {
    fontWeight: "bold",
  },
  highlight: {
    fontWeight: "bold",
    color: "red",
  },
  instructContainer: {
    height: "100%",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "10px",
    paddingTop: "50px",
  },
  tweet: {
    // alignSelf: "center",
    width: "500px",
  },
  pointToTweetRight: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    right: ({ positions }) =>
      positions ? `${positions.tweet.right + 20}px` : "none",
    top: ({ positions }) => (positions ? `${positions.tweet.top}px` : "none"),
  },
  pointToQuoteLeft: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    left: ({ positions }) =>
      positions ? `${positions.quote.right + 20}px` : "none",
    top: ({ positions }) => (positions ? `${positions.quote.top}px` : "none"),
  },
}));

const easinStyle = {
  transition: "opacity 2s ease-in",
  WebkitTransition: "opacity 0.3s",
  opacity: 1,
  display: "flex",
  flexDirection: "row",
};

const hiddenStyle = {
  opacity: 0,
};

const Instructions1 = (props) => {
  const tweetRef = useRef(null);
  const [positions, setPositions] = useState(null);
  const quoteRef = useRef(null);
  const location = useLocation();
  const quizResponses = useRef([]);
  const questionCondition = useRecoilValue(questionState);
  const [stage, setStage] = useState(-1);
  const maxStage = 3;
  const history = useHistory();
  const classes = useStyles({ positions: positions });
  const handleClick = () => {
    incrementStage();
  };

  const incrementStage = () => {
    setStage((prev) => prev + 1);
  };

  const setTweetPositions = () => {
    let tweetParent = tweetRef.current;
    console.log(tweetParent);
    if (tweetParent == null) return;
    let tweet = tweetParent.querySelector(".tweetComponent");

    let quote = tweetParent.querySelector(".quoteComponent");

    let p = {
      quote: quote.getBoundingClientRect(),
      tweet: tweet.getBoundingClientRect(),
    };
    setPositions(p);
  };


  const extraQuestions =
    questionCondition == "strength"
      ? [
        
        ]
      : [];

  const json = {
    pages: [
      {
        elements: [
        
        ],
      },
      {
        elements: [
          {
            type: "html",
            html: "<h4><h4/>",
          },
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
  defaultThemeColors["$main-hover-color"] = "lightgrey";
  defaultThemeColors["$text-color"] = "#4a4a4a";
  defaultThemeColors["$header-color"] = "#7ff07f";

  defaultThemeColors["$header-background-color"] = "#4a4a4a";
  defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

  const onCompleting = (survey, options) => {
    // console.log(options);
    let allTrue = true;
    survey.getAllQuestions().forEach((q) => {
    
    });
    // quizResponses.current.push(survey.data);
    
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    // console.log(options);
    // setCompleted(true);
    // setMessage("");

    // console.log("Survey results: " + JSON.stringify(quizResponses.current));
    // axios.post("/api/quiz1", quizResponses.current).then((response) => {
    //   let nextPage = pageHandler(location.pathname);
    // //   history.push(nextPage);
    // });
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
      (isCorrect ? "black" : "black") +
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
  


  useEffect(() => {
    window.addEventListener("resize", setTweetPositions);
  }, []);

  useEffect(() => {
    if (tweetRef.current != null) {
      setTweetPositions();
      // window.addEventListener("resize", setTweetPositions);
    }
  }, [tweetRef, quoteRef]);

  useEffect(() => {
    console.log(positions);
  }, [positions]);

  useEffect(() => {
    console.log("stage", stage);
    if (stage === -1) {
      incrementStage();
    } else if (stage === maxStage) {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    }
  }, [stage]);

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
      
      <div className={classes.grid}>
        <div
          className={classes.tweet}
          style={stage >= 0 ? easinStyle : hiddenStyle}
          ref={tweetRef}
        >
          <Tweet
            text={``}
            accName={""}
            screen_name={""}
          >
            <TweetQuote
              text={
                ""
              }
              accName={""}
              screen_name={""}
              showImage={true}
              src={
                ""
              }
            ></TweetQuote>
          </Tweet>
        </div>

        
        
        <div
          className={classes.pointToTweetRight}
          style={stage == 0 ? easinStyle : hiddenStyle}
        >
          <span>
            {" "}
            Hi!! In this study we ask you to read a few news articles that contain data visualizations. Click continue to proceed.
          </span>
        </div>


        <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">
        How family income predicts children’s <span style={{ fontWeight: "bold" }}> college chances? </span>
        </Typography>
        <Divider></Divider>
        


        <Survey.Survey
        
        model={model}
        onComplete={onComplete}
        onCompleting={onCompleting}
        onCurrentPageChanging={onCurrentPageChanging}
      />

      </div>
        <div
          className={classes.pointToTweetRight}
          style={stage >= 1 ? easinStyle : hiddenStyle}
        >
          <span>
            {" "}
            You may be asked to complete a timeline visualization. The animation on the right shows how you can use your mouse to draw a curve and <span className={classes.emph}>adjust individual data points.</span>

          
          </span>
          <span>👉👉👉👉</span>
        </div>

        {/* <div
          className={classes.pointToQuoteLeft}
          style={stage == 2 ? easinStyle : hiddenStyle}
        >
          <p>👈👈👈👈</p>
          <p>
            {" "}
            Here is a <span className={classes.emph}>headline</span> from a news
            story that Johnathan quotes
          </p>
        </div> */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "90px",
            paddingBottom: "10px",
          }}
        >
          <Button
            // style={{ backgroundColor: "gray", color: "black" }}
            variant="contained"
            onClick={handleClick}
          >
            Continue
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Instructions1;
