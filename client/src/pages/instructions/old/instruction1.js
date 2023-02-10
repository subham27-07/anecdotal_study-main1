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
    displayy: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(12, 1fr)",
    width: "100%",
    height: "90%",
    gap: "10px",
  },
  tweet: {
    gridColumn: "4 /  10",
    gridRow: "2 /  13",
    justifySelf: "center",
    // alignSelf: "center",
  },
  hello: { gridColumn: "1/4", gridRow: "2/5", fontSize: messageFontSize },
  thisTweet: { gridColumn: "1/3", gridRow: "2/5", fontSize: messageFontSize },
  thisQuote: { gridColumn: "11/13", gridRow: "3/5", fontSize: messageFontSize },
  pointToTweet: {
    gridColumn: "3/4",
    gridRow: "2/3",
    fontSize: messageFontSize,
  },
  pointToQuote: {
    gridColumn: "10/11",
    gridRow: "3/5",
    fontSize: messageFontSize,
  },
}));

const easinStyle = {
  transition: "opacity 2s ease-in",
  WebkitTransition: "opacity 0.3s",
  opacity: 1,
};

const hiddenStyle = {
  opacity: 0,
};

const Instructions1 = (props) => {
  const location = useLocation();
  const [stage, setStage] = useState(-1);
  const maxStage = 4;
  const history = useHistory();
  const classes = useStyles();
  const handleClick = () => {
    incrementStage();
  };

  const incrementStage = () => {
    setStage((prev) => prev + 1);
  };

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
          className={classes.hello}
          style={stage >= 0 && stage < 2 ? easinStyle : hiddenStyle}
        >
          <p>
            {" "}
            Hi! In this study, we will show you a series of tweets that quote
            news headlines. Click continue to see the tweet + quoted news
            headline.
          </p>
        </div>
        <div
          className={classes.thisTweet}
          style={stage >= 2 ? easinStyle : hiddenStyle}
        >
          <p>
            {" "}
            In each tweet, you will see a person making a{" "}
            <span className={classes.emph}>conclusion</span>. Here is an example
            from Johnathan Nolander, at right
          </p>
        </div>
        <div
          className={classes.pointToTweet}
          style={stage >= 2 ? easinStyle : hiddenStyle}
        >
          <p>👉👉👉👉</p>
        </div>
        <div
          className={classes.thisQuote}
          style={stage == 3 ? easinStyle : hiddenStyle}
        >
          <p>
            {" "}
            Here is a <span className={classes.emph}>headline</span> from a news
            story that Johnathan quotes
          </p>
        </div>
        <div
          className={classes.pointToQuote}
          style={stage == 3 ? easinStyle : hiddenStyle}
        >
          <p>👈👈👈👈</p>
        </div>
        <div
          className={classes.tweet}
          style={stage >= 1 ? easinStyle : hiddenStyle}
        >
          <Tweet
            text={`Spielberg is one of the worst directors of the recent decade.`}
            accName={"Johnathan Nolander"}
            screen_name={"JNolander"}
            style={{ width: "50%" }}
          >
            <TweetQuote
              text={
                "Steven Spielberg's latest three movies were among the worst rated in Rotten Tomatoes."
              }
              accName={"Sunny Hollywood News"}
              screen_name={"SunnyHollywood"}
              showImage={true}
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Steven_Spielberg_%2836057844341%29.jpg/800px-Steven_Spielberg_%2836057844341%29.jpg?20170801002525"
              }
            ></TweetQuote>
          </Tweet>
        </div>
        <div></div>
      </div>
      <Divider></Divider>
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
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
    </Container>
  );
};

export default Instructions1;
