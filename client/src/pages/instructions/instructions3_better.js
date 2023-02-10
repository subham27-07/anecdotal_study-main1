import React, { useState, useRef, useEffect } from "react";
import { Button, Container } from "@mui/material/";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { instructionResponseState } from "../../atoms/instructionResponse";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { makeStyles } from "@mui/styles";
import pageHandler from "../pageHandler";
import CustomSlider from "../../components/slider/slider";
import {
  labelSelector,
  questionSelector,
  questionState,
} from "../../atoms/questionSelector";

const messageFontSize = "min(1.3vw, 24px)";

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
    overflow: "auto",
  },
  image: {
    width: "50%",
    display: "block",
    margin: "auto",
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
  slider: {
    gridColumn: "4 /  10",
    gridRow: "9 /  12",
    // justifySelf: "center",
    // alignSelf: "center",
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
  pointToSliderRight: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    right: ({ positions }) =>
      positions ? `${positions.slider.right + 75}px` : "none",
    top: ({ positions }) => (positions ? `${positions.slider.top}px` : "none"),
  },
}));

const InstructionsTask3 = (props) => {
  const sliderRef = useRef(null);
  const tweetRef = useRef(null);
  const [positions, setPositions] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const classes = useStyles({ positions: positions });
  const getQuestion = useRecoilValue(questionSelector);
  const labels = useRecoilValue(labelSelector);
  const [instructionResponse, setInstructionResponse] = useRecoilState(
    instructionResponseState
  );

  console.log(instructionResponse);

  const tweetText = {
    claim: "",
    evidence: "",
    name: "Johnathan Nolander",
    handle: "",
    image: "",
  };

  const setTweetPositions = () => {
    let sliderParent = sliderRef.current;
    let tweetParent = tweetRef.current;
    if (tweetParent == null || sliderParent == null) return;

    let tweet = tweetParent.querySelector(".tweetComponent");
    let slider = sliderParent.querySelector(".customSlider");

    let p = {
      slider: slider.getBoundingClientRect(),
      tweet: tweet.getBoundingClientRect(),
    };
    // console.log(p);
    setPositions(p);
  };

  useEffect(() => {
    if (sliderRef.current != null && tweetRef.current != null) {
      setTweetPositions();
      window.addEventListener("resize", setTweetPositions);
      document
        .querySelector("#scrollWrapper")
        .addEventListener("scroll", setTweetPositions);
    }
  }, [sliderRef, tweetRef]);

  const handleSliderResponse = (event, r) => {
    console.log(r);
    setInstructionResponse(r);
  };

  const question = getQuestion(tweetText);

  const handleConsent = () => {
    let nextPage = pageHandler(location.pathname);
    history.push(nextPage);
  };

  return (
    <Container
      maxWidth="xl"
      className={classes.instructContainer + " instructContainer"}
    >
      <div>
        <div className={classes.grid}>
          {" "}
          <div className={classes.tweet} ref={tweetRef}>
            <Tweet
              text={``}
              accName={""}
              screen_name={"JNolander"}
              // style={{ width: "50%" }}
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
            <div ref={sliderRef}>
              <CustomSlider
                // style={{ width: "50%" }}
                labels={labels}
                domain={[0, 1]}
                question={question}
                handleResponse={handleSliderResponse}
                response={instructionResponse}
                banded={false}
              ></CustomSlider>
            </div>
            {/* <div className={classes.pointToSliderRight}> */}
            <div className={classes.pointToTweetRight}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span>
                  For each tweet and news headline, we will ask you to provide
                  your judgment using a slider.
                </span>
                <span>👉👉</span>
              </div>
            </div>
            <div className={classes.pointToSliderRight}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span>
                  You will use a slider to give us a response to this question.
                </span>
                <span>👉👉</span>
              </div>
              <br />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <span>
                  Drag the slider to the point that best represents your
                  judgment about the question. your response can be{" "}
                  <span className={classes.emph}>anywhere on the line.</span>
                </span>
                <span>👉👉</span>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* <div className={classes.slider}></div> */}
        </div>
        <div
          className={classes.button}
          style={{
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Button
            // style={{ backgroundColor: "gray", color: "black" }}
            variant="contained"
            onClick={handleConsent}
            disabled={instructionResponse !== null ? false : true}
          >
            Continue
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default InstructionsTask3;
