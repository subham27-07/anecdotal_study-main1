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
  tweetImage: {
    width: "400%",
    maxWidth: "none",
    height: "400px",
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
      positions ? `${positions.tweet.right + 50}px` : "none",
    top: ({ positions }) => (positions ? `${positions.tweet.top}px` : "none"),

  },
  pointToTweetLeft: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    left: ({ positions }) =>
      positions ? `${positions.tweet.right + 50}px` : "none",
    top: ({ positions }) => (positions ? `${positions.tweet.top}px` : "none"),
  },
  pointToQuoteLeft: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    left: ({ positions }) =>
      positions ? `${positions.quote.right + 50}px` : "none",
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
  const maxStage = 6;
  const history = useHistory();
  const classes = useStyles({ positions: positions });
  const [currentImage, setCurrentImage] = useState(0);

  const handleClick = () => {
    setStage((prev) => prev + 1);
    if (stage >= 3) {
      let nextPage = pageHandler(location.pathname);
      history.push(nextPage);
  }
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
    console.log(p);
    setPositions(p);
  };

  

  



  useEffect(() => {
    window.addEventListener("resize", setTweetPositions);
  }, []);

  useEffect(() => {
    if (tweetRef.current != null) {
      setTweetPositions();
    }
  }, [tweetRef, quoteRef]);

  useEffect(() => {
    console.log(positions);
  }, [positions]);

  useEffect(() => {
    console.log("stage", stage);
    if (stage === 1) {
      setCurrentImage(1);
    } else if (stage === 2) {
      setCurrentImage(2);
    } else if (stage === 3) {
      setCurrentImage(3);
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
          style={stage >= 0 ? easinStyle : hiddenStyle}
          ref={tweetRef}
        >
          <Tweet
            text={``}
            accName={""}
            screen_name={"JNolander"}
          >
            <TweetQuote
              text={
                ""
              }
              className={classes.tweetImage}
              accName={""}
              screen_name={"SunnyHollywood"}
              showImage={true}
              src={
                currentImage === 0
                ? "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Instruction%20pages%20(1).pptx.jpg"
                : currentImage === 1
                ? "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Instruction%20pages%20(1).pptx%20(1).jpg"
                : currentImage === 2
                ? "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Instruction%20pages%20(1).pptx%20(2).jpg"
                : "https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/Instruction%20pages%20(1).pptx%20(3).jpg"
              }
            ></TweetQuote>
          </Tweet>
        </div>
        <div className={classes.pointToTweetRight}>
          <div style={stage == 0 ? easinStyle : hiddenStyle}>
            <span>
              {" "}
              Here is the title of the article <span>👉👉</span>
            </span>
          </div>
          <br />
        </div>

        <div className={classes.pointToTweetRight}>
          <div style={stage >= 1 ? easinStyle : hiddenStyle}>
            <span>
            Here is the title of the article <span>👉👉</span>
            </span>
          </div>
          <br />
          <div style={stage >= 2 ? easinStyle : hiddenStyle}>
            <span>
              {" "}
              {" "}
              <span>
            Here is the title of the article <span>👉👉</span>
            </span>
            </span>
            
          </div>
          <br />
          <div style={stage >= 3 ? easinStyle : hiddenStyle}>
            <span>
            Here is a visualization presenting data to answer the question <span>👉👉</span>
            </span>
          </div> <br></br>
          <div style={stage >= 4 ? easinStyle : hiddenStyle}>
            <span>
            Here is a textual description of the data visualization <span>👉👉</span>
            </span>
          </div>
        </div>

        {/* <div className={classes.pointToTweetLeft}>
          <div style={stage >= 4 ? easinStyle : hiddenStyle}>
            <span style={{ marginRight: "10px" }}>👈👈</span>
            Here is a textual description of the data visualization <span>👉👉</span>
          </div>
          <br />
          <div style={stage >= 5 ? easinStyle : hiddenStyle}>
            <span style={{ marginRight: "10px" }}>👈👈</span>
            <span>
              So in this case, assume that the latest three Spielberg movies
              were in fact among the worst rated Rotten Tomatoes movies!
            </span>
          </div>
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
