import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { qualResponseState } from "../../atoms/qualResponseIndex";
import { responseState } from "../../atoms/response";
import { dataState } from "../../atoms/data";
import axios from "axios";

import InstructionsDialogQual from "../../components/instructions/instructionsDialogQual";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";

import {
  labelSelector,
  qualQuestionSelector,
  questionState,
} from "../../atoms/questionSelector";

import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import { Button, Divider, Typography } from "@mui/material/";
import SliderFixed from "../../components/slider/sliderFixed";
import QualResponse from "../../components/qualResponse/qualResponse";
import $ from "jquery";

const QualTask = (props) => {
  let minCharacterCount = 5;
  const allData = useRecoilValue(dataState);
  // console.log(allData);
  const data = allData !== null ? allData[0].concat(allData[1]) : null;
  const history = useHistory();
  const location = useLocation();

  const [tweetText, setTweetText] = useState(() => {
    return { claim: "", evidence: "", name: "", handle: "", image: "" };
  });

  const questionCondition = useRecoilValue(questionState);
  const getQuestion = useRecoilValue(qualQuestionSelector);
  const labels = useRecoilValue(labelSelector);
  // console.log(labels);
  // const [labels, setLabels] = useState(() => [
  //   "Does not support",
  //   "Slightly supports",
  //   "Moderately supports",
  //   "Strongly supports",
  // ]);

  const [question, setQuestion] = useState("");

  const [response, setResponse] = useRecoilState(responseState);
  const [qualResponse, setQualResponse] = useState(() => "");
  const [answerIndex, setAnswerIndex] = useRecoilState(qualResponseState);
  const [opacity, setOpacity] = useState(1);
  const [openInstructions, setOpenInstructions] = useState(false);

  const divContainer = useRef(null);
  const questionWidth = "500px";

  console.log(response);

  const submitResponse = async (r) => {
    // console.log(r);

    let responseCopy = { ...response };
    responseCopy[answerIndex] = { ...responseCopy[answerIndex] };
    responseCopy[answerIndex]["qualResponse"] = qualResponse;
    responseCopy[answerIndex]["qualResponseTime"] = Date.now();
    setResponse(responseCopy);
  };

  const handleOpenInstructions = () => {
    setOpenInstructions(true);
  };

  const handleCloseInstructions = (value) => {
    setOpenInstructions(false);
  };

  const handleAddMoreClick = async () => {
    await submitResponse(qualResponse);
    setQualResponse("");
    loading();
    scrollTopTop();
    setAnswerIndex(() => {
      return answerIndex + 1;
    });
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  const scrollToBottom = () => {
    if (divContainer.current) {
      $(divContainer.current).animate(
        { scrollTop: divContainer.current.scrollHeight },
        500
      );
    }
  };

  const scrollTopTop = () => {
    if (divContainer.current) {
      $(divContainer.current).animate({ scrollTop: 0 }, 10);
    }
  };

  function loading() {
    props.setLoadingOpacity(1);
    setOpacity(0);
    setTimeout(() => {
      props.setLoadingOpacity(0);
      setOpacity(1);
    }, 600);
  }

  useEffect(() => {
    loading();
  }, []);

  useEffect(() => {
    let q = getQuestion(tweetText);
    setQuestion(q);
  }, [tweetText, questionCondition]);

  useEffect(() => {
    // console.log(answerIndex);
    // console.log(phaseData);
    if (data !== null) {
      if (answerIndex < data.length) {
        console.log(answerIndex);

        let lenResponse = Object.keys(response).length;
        let name = lenResponse > 0 ? response[answerIndex]["name"] : "";
        let accName = lenResponse > 0 ? response[answerIndex]["accName"] : "";
        let screen_name =
          lenResponse > 0 ? response[answerIndex]["screen_name"] : "";
        let person_image_path = response[answerIndex]["person_image_path"];
        let accLogo = response[answerIndex]["accLogo"];
        let nameSplit = name.split(" ");
        let handle = nameSplit[0][0].toLowerCase() + nameSplit[1].toLowerCase();
        setTweetText({
          evidence: data[answerIndex]["evidence"],
          claim: data[answerIndex].claim,
          image: data[answerIndex].image,
          accName: accName,
          accLogo: accLogo,
          screen_name: screen_name,
          name: name,
          handle: handle,
          person_image_path: person_image_path,
        });
      } else {
        axios.post("/api/response", response).then((r) => {
          let nextPage = pageHandler(location.pathname);
          history.push(nextPage);
        });
      }
    }
  }, [answerIndex, response]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        paddingTop: "10px",
        paddingBottm: "30px",
        display: "flex",
        flexWrap: "wrap",
        gap: "50px",
        alignItems: "center",
        justifyContent: "center",

        opacity: opacity,
      }}
      ref={divContainer}
    >
      <div
        style={{
          // width: questionWidth,
          minWidth: "360px",
          // flexGrow: 1,
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Tweet
          text={`${tweetText.claim}`}
          accName={tweetText.name}
          screen_name={tweetText.handle}
          person_image_path={tweetText.person_image_path}
        >
          <TweetQuote
            text={tweetText.evidence}
            accName={tweetText.accName}
            screen_name={tweetText.screen_name}
            showImage={true}
            src={tweetText.image}
            accLogo={tweetText.accLogo}
          ></TweetQuote>
        </Tweet>
        <SliderFixed
          labels={labels}
          domain={[0, 1]}
          question={question}
          // handleResponse={handleSliderResponse}
          value={response[answerIndex] ? response[answerIndex]["value"] : 0.5}
        ></SliderFixed>
      </div>

      <div
        style={{
          // mindWidth: questionWidth,
          minWidth: "360px",
          // flexGrow: 1,
        }}
      >
        <Typography variant="h6" align="left" style={{ marginBottom: "10px" }}>
          Tweet {answerIndex + 1}/{data ? data.length : 18}
        </Typography>{" "}
        <QualResponse
          setQualResponse={setQualResponse}
          qualResponse={qualResponse}
        ></QualResponse>
        <div
          style={{
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <Button
            style={{
              marginRight: "10px",
            }}
            disabled={qualResponse.length <= minCharacterCount}
            color="primary"
            variant="contained"
            onClick={handleAddMoreClick}
          >
            Next!
          </Button>
        </div>
      </div>

      <InstructionsDialogQual
        open={openInstructions}
        onClose={handleCloseInstructions}
      ></InstructionsDialogQual>
    </div>
  );
};

export default QualTask;
