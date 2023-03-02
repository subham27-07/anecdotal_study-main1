import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Divider, Typography, Container } from "@mui/material/";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import pageHandler from "../pageHandler";
import styles from '../survey/articles.module.css';

// const textual_instructions = {
//   'txt':" This is the text for txt condition.",
//   'visual':"This is the text for control condition.",
//   'control':"This is the text for control condition."
// }

const textual_instructions = {
  'txt': [
    "This is the text for stage 1 of the txt condition.",
    <img style={{ width: "50%"}} src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a1.png" alt="stage 1 txt condition image" />,
    "This is the text for stage 2 of the txt condition.",
    <img style={{ width: "50%" }} src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a2.png" alt="stage 2 txt condition image" />,
    "This is the text for stage 3 of the txt condition.",
    <img style={{ width: "50%"}} src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a3.png" alt="stage 3 txt condition image" />
  ],
  'visual': [
    "This is the text for stage 1 of the visual condition.",
    <img style={{ width: "50%",marginLeft: "10%" }} src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a1.png" alt="stage 1 visual condition image" />,
    "This is the text for stage 2 of the visual condition.",
    <img style={{ width: "50%",marginLeft: "10%" }} src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a2.png" alt="stage 2 visual condition image" />,
    "This is the text for stage 3 of the visual condition.",
    <img style={{ width: "50%",marginLeft: "0%" }} src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a3.png" alt="stage 3 visual condition image" />
  ],
  'control': [
    "This is the text for stage 1 of the control condition.",
    <img src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a1.png" alt="stage 1 control condition image" />,
    "This is the text for stage 2 of the control condition.",
    <img src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a2.png" alt="stage 2 control condition image" />,
    "This is the text for stage 3 of the control condition.",
    <img src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a3.png" alt="stage 3 control condition image" />
  ]
}




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
  const [stage, setStage] = useState(-1);
  const maxStage = 3;
  const history = useHistory();
  const classes = useStyles({ positions: positions });
  const handleClick = () => {
    incrementStage();
  };
  const textCreator = ()=>{
    console.log(props.treatment)
    switch(props.treatment){
      case 'txt':
        return (textual_instructions.txt);
      case 'visual':
        return textual_instructions.visual;
      case 'control':
        return textual_instructions.control;
    }
  };

  // const textCreator = () => {
  //   switch (props.treatment) {
  //     case "txt":
  //       return (
  //         <>
  //           {textual_instructions.txt[2 * stage]}
  //           {textual_instructions.txt[2 * stage + 1]}
  //         </>
  //       );
  //     case "visual":
  //       return (
  //         <>
  //           {textual_instructions.visual[2 * stage]}
  //           {textual_instructions.visual[2 * stage + 1]}
  //         </>
  //       );
  //     case "control":
  //       return (
  //         <>
  //           {textual_instructions.control[2 * stage]}
  //           {textual_instructions.control[2 * stage + 1]}
  //         </>
  //       );
  //   }
  // };
  



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
      let nextPage = pageHandler(props.pages, location.pathname);
      history.push(nextPage);
    }
  }, [stage]);

  return (
    <Container maxWidth="xl" className={classes.instructContainer}>
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
                "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/new.gif"
              }
            ></TweetQuote>
          </Tweet>
        </div>
        <div
          className={classes.pointToTweetRight}
          style={stage == 0 ? easinStyle : hiddenStyle}
        >
          {/* <h2 className={`${styles.textBody} ${styles.title}`}>
            {props.treatment? textCreator(): 'None'} !
          </h2> */}

          <div
            className={classes.pointToTweetRight}
            style={stage >= 0 ? easinStyle : hiddenStyle}
          >
            <h2 className={`${styles.textBody} ${styles.title}`}>{props.treatment ? textCreator() : "None"} !</h2>
          </div>


          {/* <span>
            {" "}
            Hi!! In this study we ask you to read a few news articles that contain data visualizations. Click continue to proceed.
          </span> */}
        </div>

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