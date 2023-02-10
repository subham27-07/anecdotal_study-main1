import React, { useState } from "react";
import { Button, Container } from "@mui/material/";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { instructionResponseState } from "../../../atoms/instructionResponse";
import Tweet from "../../../components/tweet/tweet";
import TweetQuote from "../../../components/tweet/tweetQuote";
import { makeStyles } from "@mui/styles";
import pageHandler from "../../pageHandler";
import CustomSlider from "../../../components/slider/sliderFixed";
import {
  labelSelector,
  questionSelector,
  questionState,
} from "../../../atoms/questionSelector";
import QualResponse from "../../../components/qualResponse/qualResponse";

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
    gridRow: "1 /  12",
    // justifySelf: "center",
    // alignSelf: "center",
  },
  slider: {
    gridColumn: "4 /  10",
    gridRow: "7 /  11",
    // justifySelf: "center",
    // alignSelf: "center",
  },
  qual: {
    gridColumn: "4 /  10",
    gridRow: "11 /  13",
  },
  pointToSlider: {
    gridColumn: "3/4",
    gridRow: "9 /  12",
    fontSize: messageFontSize,
  },
  toughPart: {
    gridColumn: "1/3",
    gridRow: "9 /  12",
    fontSize: messageFontSize,
  },
  judgment: {
    gridColumn: "1/3",
    gridRow: "6 /  9",
    fontSize: messageFontSize,
  },
}));

const InstructionsTask3 = (props) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [qualResponse, setQualResponse] = useState(() => "");
  let minCharacterCount = 5;

  const getQuestion = useRecoilValue(questionSelector);
  const labels = useRecoilValue(labelSelector);
  const instructionResponse = useRecoilValue(instructionResponseState);
  console.log(instructionResponse);
  const tweetText = {
    claim: "",
    evidence: "",
    name: "Johnathan Nolander",
    handle: "",
    image: "",
  };

  // const handleSliderResponse = (event, r) => {
  //   console.log(r);
  //   setInstructionResponse(r);
  // };

  const question = getQuestion(tweetText);

  const handleConsent = () => {
    let nextPage = pageHandler(location.pathname);
    history.push(nextPage);
  };

  return (
    <Container maxWidth="xl" className={classes.instructContainer}>
      <div className={classes.grid}>
        {" "}
        <div className={classes.judgment}>
          <p>
            In the next task, we will show you the responses you have provided
            for every tweet.
          </p>
        </div>
        <div className={classes.toughPart}>
          <p>
            You can see your response for the Spielberg tweet here. Type down
            your response in the text box below.
          </p>
        </div>
        <div className={classes.pointToSlider}>
          <p>👉👉👉</p>
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
          <CustomSlider
            // style={{ width: "80%" }}
            labels={labels}
            domain={[0, 1]}
            question={question}
            response={instructionResponse}
            value={instructionResponse !== null ? instructionResponse : 0.5}
          ></CustomSlider>
          <div>
            <QualResponse
              setQualResponse={setQualResponse}
              qualResponse={qualResponse}
            ></QualResponse>
          </div>

          <div
            style={{
              // textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Button
              // style={{ backgroundColor: "gray", color: "black" }}
              variant="contained"
              onClick={handleConsent}
              disabled={qualResponse.length <= minCharacterCount}
            >
              Continue
            </Button>
          </div>
        </div>
        {/* <div className={classes.slider}> */}
        {/* <CustomSlider
            // style={{ width: "80%" }}
            labels={labels}
            domain={[0, 1]}
            question={question}
            response={instructionResponse}
            value={instructionResponse !== null ? instructionResponse : 0.5}
          ></CustomSlider> */}
        {/* </div> */}
        {/* <div style={{ width: "50%" }} className={classes.qual}>
          <QualResponse
            setQualResponse={setQualResponse}
            qualResponse={qualResponse}
          ></QualResponse>
        </div> */}
      </div>
    </Container>
  );
};

export default InstructionsTask3;
