import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Divider, Typography, Container } from "@mui/material/";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import pageHandler from "../pageHandler";

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
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    }
  }, [stage]);

  return (
    <Container maxWidth="xl" className={classes.instructContainer}>
      <div className={classes.grid}>
        <div
          className={classes.tweet}
          style={stage >= 1 ? easinStyle : hiddenStyle}
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
          <span>
            {" "}
            Hi! In this study, we will show you a series of tweets that quote
            news headlines. Click continue to see the tweet + quoted news
            headline.
          </span>
        </div>
        <div
          className={classes.pointToTweetRight}
          style={stage >= 1 ? easinStyle : hiddenStyle}
        >
          <span>
            {" "}
            In each tweet, you will see a person making a{" "}
            <span className={classes.emph}>conclusion</span>. Here is an example
            from Johnathan Nolander, at right
          </span>
          <span>👉👉👉👉</span>
        </div>

        <div
          className={classes.pointToQuoteLeft}
          style={stage == 2 ? easinStyle : hiddenStyle}
        >
          <p>👈👈👈👈</p>
          <p>
            {" "}
            Here is a <span className={classes.emph}>headline</span> from a news
            story that Johnathan quotes
          </p>
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
