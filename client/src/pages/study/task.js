import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { answerIndexState } from "../../atoms/answerIndex";
import { responseState } from "../../atoms/response";
import { dataState } from "../../atoms/data";
import InstructionsDialog from "../../components/instructions/instructionsDialog";
import {
  labelSelector,
  questionSelector,
  questionState,
} from "../../atoms/questionSelector";
import Tweet from "../../components/tweet/tweet";
import TweetQuote from "../../components/tweet/tweetQuote";
import { useHistory, useLocation } from "react-router-dom";
import pageHandler from "../pageHandler";
import { Button, Divider, Typography } from "@mui/material/";
import CustomSlider from "../../components/slider/slider";
import $ from "jquery";

// let index = 0;
const Task1Page = (props) => {
  //   console.log(props.setChoice);
  // const data = props.data;\
  const history = useHistory();
  const location = useLocation();

  const allData = useRecoilValue(dataState);
  const data = allData ? allData[props.phase] : null;

  const questionCondition = useRecoilValue(questionState);
  const getQuestion = useRecoilValue(questionSelector);
  const labels = useRecoilValue(labelSelector);

  const [tweetText, setTweetText] = useState(() => {
    return { claim: "", evidence: "", name: "", handle: "", image: "" };
  });

  const question = getQuestion(tweetText);

  const [response, setResponse] = useRecoilState(responseState);
  const [sliderResponse, setSliderResponse] = useState(null);
  const [answerIndex, setAnswerIndex] = useRecoilState(answerIndexState);
  const [opacity, setOpacity] = useState(1);
  const [openInstructions, setOpenInstructions] = useState(false);
  // const [openAlertMoreTweet, setOpenAlertMoreTweet] = useState(false);
  // const [openAlertAnswerCount, setOpenAlertAnswerCount] = useState(false);

  const divContainer = useRef(null);
  const questionWidth = "500px";

  const handleSliderResponse = (event, r) => {
    // console.log(r);
    setSliderResponse(r);
  };

  const submitResponse = async (r) => {
    console.log(r);
    let responseCopy = { ...response };
    let phase_index = answerIndex - props.phase * data.length;
    let d = data[phase_index];
    let dindex = d["index"];
    responseCopy[answerIndex] = responseCopy[answerIndex] || {};
    responseCopy[answerIndex]["d_index"] = dindex;
    responseCopy[answerIndex]["value"] = r;
    responseCopy[answerIndex]["name"] = tweetText["name"];
    responseCopy[answerIndex]["accName"] = tweetText["accName"];
    responseCopy[answerIndex]["accLogo"] = tweetText["accLogo"];
    responseCopy[answerIndex]["screen_name"] = tweetText["screen_name"];
    responseCopy[answerIndex]["person_image_path"] =
      tweetText["person_image_path"];
    responseCopy[answerIndex]["phase"] = props.phase;
    responseCopy[answerIndex]["questionCondition"] = questionCondition;
    responseCopy[answerIndex]["responseTime"] = Date.now();
    setResponse(responseCopy);
  };

  const handleOpenInstructions = () => {
    setOpenInstructions(true);
  };

  const handleCloseInstructions = () => {
    setOpenInstructions(false);
  };

  const handleAddMoreClick = async () => {
    await submitResponse(sliderResponse);
    setSliderResponse(null);
    loading();
    scrollTopTop();
    setAnswerIndex(() => {
      return answerIndex + 1;
    });
  };

  // useEffect(() => {
  //   console.log(response);
  // }, [response]);

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
    }, 1200);
  }

  useEffect(() => {
    loading();
  }, []);

  useEffect(() => {
    console.log(answerIndex);

    if (data !== null) {
      let pindex = answerIndex - props.phase * data.length;
      if (pindex < data.length) {
        let d = data[pindex];
        // console.log(d);
        // let name = fakerator.names.name();
        let name = d.person_name;
        let person_image_path = d.person_image_path;
        let nameSplit = name.split(" ");
        let handle = nameSplit[0][0].toLowerCase() + nameSplit[1].toLowerCase();
        setTweetText({
          evidence: d["evidence"],
          claim: d.claim,
          image: d.image,
          accName: d.source_name,
          accLogo: `/logos/${d.source_logo}`,
          screen_name: d.source_name.split(" ").join(""),
          name: name,
          handle: handle,
          person_image_path: person_image_path,
        });
      } else {
        // if (props.phase === 0) {
        //   history.push("cogref");
        // } else {
        //   history.push("task3");
        // }
        let nextPage = pageHandler(location.pathname);
        history.push(nextPage);
      }
    }
  }, [data, answerIndex]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "50px",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10px",
        paddingBottm: "30px",
        opacity: opacity,
      }}
      ref={divContainer}
    >
      {/* <Instructions>

      </Instructions> */}

      {/* <Divider></Divider> */}
      <div
        style={{
          width: questionWidth,
          display: "flex",
          alignItems: "start",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        {" "}
        {/* <Divider></Divider> */}
        <Tweet
          text={`${tweetText.claim}`}
          accName={tweetText.name}
          screen_name={tweetText.handle}
          person_image_path={tweetText.person_image_path}
        >
          <TweetQuote
            accLogo={tweetText.accLogo}
            text={tweetText.evidence}
            accName={tweetText.accName}
            screen_name={tweetText.screen_name}
            showImage={true}
            src={tweetText.image}
          ></TweetQuote>
        </Tweet>
        <CustomSlider
          labels={labels}
          domain={[0, 1]}
          question={question}
          handleResponse={handleSliderResponse}
          response={sliderResponse}
        ></CustomSlider>
      </div>
      <Divider></Divider>
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Typography variant="h6">
          Tweet {answerIndex + 1}/{data ? data.length * 2 : 18}
        </Typography>
        <Button
          style={{
            marginRight: "10px",
          }}
          disabled={sliderResponse == null}
          color="primary"
          variant="contained"
          onClick={handleAddMoreClick}
        >
          Next!
        </Button>
      </div>

      <InstructionsDialog
        open={openInstructions}
        onClose={handleCloseInstructions}
      ></InstructionsDialog>
      {/* <AlertDialog
        open={openAlertAnswerCount}
        onClose={handleCloseAlertAnswerCount}
        message={`Please view at least s tweets to make a a decision about this account!`}
      ></AlertDialog> */}
    </div>
  );
};

export default Task1Page;
