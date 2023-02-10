import React, { useState, useEffect } from "react";
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
    // justifySelf: "center",
    // alignSelf: "center",
  },
  yourJob: { gridColumn: "1/4", gridRow: "2/5", fontSize: messageFontSize },
  toughPart: { gridColumn: "1/3", gridRow: "1/4", fontSize: messageFontSize },
  pointToTweet: {
    gridColumn: "3/4",
    gridRow: "2/5",
    fontSize: messageFontSize,
  },
  youshould: { gridColumn: "1/3", gridRow: "4/7", fontSize: messageFontSize },
  pointToQuote: {
    gridColumn: "3/4",
    gridRow: "4/7",
    fontSize: messageFontSize,
  },
  inThisCase: {
    gridColumn: "1/4",
    gridRow: "7/12",
    fontSize: messageFontSize,
  },
  assume: {
    gridColumn: "11 / 13",
    gridRow: "3 / 7",
    fontSize: messageFontSize,
  },
  pointToQuoteLeft: {
    gridColumn: "10 / 11",
    gridRow: "3 / 7",
    fontSize: messageFontSize,
  },
  assumeExample: {
    gridColumn: "11 / 13",
    gridRow: "7 / 12",
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

const Instructions2 = (props) => {
  const [stage, setStage] = useState(-1);
  const maxStage = 5;
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const handleClick = () => {
    // history.push("instructions1");
    incrementStage();
  };

  const incrementStage = () => {
    setStage((prev) => prev + 1);
  };

  useEffect(() => {
    if (stage === -1) {
      incrementStage();
    } else if (stage > maxStage) {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
    }
  }, [stage]);

  const [response, setResponse] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (value) => {
    setOpenAlert(false);
  };

  const handleResponse = (response, index) => {
    if (response) response.index = index;
    console.log(response);
    setResponse((responses) => {
      responses[index] = response;
      console.log(responses);
      return responses;
    });
  };

  return (
    <Container maxWidth="xl" className={classes.instructContainer}>
      <div className={classes.grid}>
        <div
          className={classes.yourJob}
          style={stage == 0 ? easinStyle : hiddenStyle}
        >
          <p>
            {" "}
            Your job will be to evaluate how well the{" "}
            <span className={classes.emph}>conclusion</span> (top) is supported
            by the <span className={classes.emph}>headline</span> (bottom)
          </p>
        </div>
        <div
          className={classes.toughPart}
          style={stage >= 1 ? easinStyle : hiddenStyle}
        >
          <p>
            Here's the tough part! When you evaluate the{" "}
            <span className={classes.emph}>conclusion</span>, try to ignore your
            own opinions.
          </p>
        </div>
        <div
          className={classes.pointToTweet}
          style={stage >= 1 ? easinStyle : hiddenStyle}
        >
          <p>👉👉👉👉</p>
        </div>
        <div
          className={classes.youshould}
          style={stage >= 2 ? easinStyle : hiddenStyle}
        >
          <p>
            {" "}
            You should only evaluate the{" "}
            <span className={classes.emph}> logic </span> of making that
            conclusion based on the{" "}
            <span className={classes.emph}>headline</span>.
          </p>
        </div>
        <div
          className={classes.pointToQuote}
          style={stage >= 2 ? easinStyle : hiddenStyle}
        >
          <p>👉👉👉👉</p>
        </div>

        <div
          className={classes.inThisCase}
          style={stage >= 3 ? easinStyle : hiddenStyle}
        >
          <p>
            So in this case, it doesn't matter whether you personally believe
            Spielberg is one of the worst directors in history or not.
          </p>
        </div>
        <div
          className={classes.assume}
          style={stage >= 4 ? easinStyle : hiddenStyle}
        >
          Please assume that the news headline is factually correct, even if
          that seems unlikely to you.
        </div>
        <div
          className={classes.pointToQuoteLeft}
          style={stage >= 4 ? easinStyle : hiddenStyle}
        >
          <p>👈👈👈👈</p>
        </div>
        <div
          className={classes.assumeExample}
          style={stage >= 5 ? easinStyle : hiddenStyle}
        >
          So in this case, assume that hte latest three Spielberg movies were in
          fact among the worst rated Rotten Tomatoes movies!
        </div>
        <div
          className={classes.tweet}
          style={stage >= 0 ? easinStyle : hiddenStyle}
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

export default Instructions2;
