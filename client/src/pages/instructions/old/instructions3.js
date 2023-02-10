import React, { useState, useRef } from "react";
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
    paddingTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(12, 1fr)",
    width: "100%",
    height: "100%",
    gap: "10px",
  },
  tweet: {
    gridColumn: "4 /  10",
    gridRow: "1 /  9",
    // justifySelf: "center",
    // alignSelf: "center",
  },
  slider: {
    width: "500px",
    // justifySelf: "center",
    // alignSelf: "center",
  },
  pointToTweetRight: {
    margin: 0,
    width: "300px",
    fontSize: messageFontSize,
    position: "absolute",
    right: ({ positions }) =>
      positions ? `${positions.slider.right + 20}px` : "none",
    top: ({ positions }) => (positions ? `${positions.slider.top}px` : "none"),
  },
}));

const InstructionsTask3 = (props) => {
  const tweetRef = useRef(null);
  const [positions, setPositions] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const getQuestion = useRecoilValue(questionSelector);
  const labels = useRecoilValue(labelSelector);
  const [instructionResponse, setInstructionResponse] = useRecoilState(
    instructionResponseState
  );

  const tweetText = {
    claim: "",
    evidence: "",
    name: "Johnathan Nolander",
    handle: "",
    image: "",
  };

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
    <Container maxWidth="xl" className={classes.instructContainer}>
      <div className={classes.grid}>
        {" "}
        <div className={classes.pointToTweetRight}>
          <div>
            <p>
              For each tweet, we will ask you to provide your judgment using a
              slider.
            </p>
          </div>
          <div>
            <p>
              Drag the slider to the point that best represents your judgment
              about the question.
            </p>
          </div>
          <div>
            <p>👉👉</p>
          </div>
        </div>
        <div className={classes.tweet}>
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
          <div>
            <CustomSlider
              // style={{ width: "50%" }}
              ref={tweetRef}
              labels={labels}
              domain={[0, 1]}
              question={question}
              handleResponse={handleSliderResponse}
              response={instructionResponse}
              banded={false}
            ></CustomSlider>
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
        {/* <div className={classes.slider}></div> */}
      </div>

      {/* <div
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
      </div> */}
    </Container>
  );
};

export default InstructionsTask3;
