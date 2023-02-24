import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { dataState } from "./atoms/data";
import { responseState } from "./atoms/response";
import { answerIndexState } from "./atoms/answerIndex";
import { qualResponseState } from "./atoms/qualResponseIndex";
import { questionState } from "./atoms/questionSelector";
import { instructionResponseState } from "./atoms/instructionResponse";
import NavBar from "./components/nav/nav";
import Container from "@mui/material/Container";
import BottomNav from "./components/bottomNav/bottomNav";
//pages
import Task from "./pages/study/task";
import QualTask from "./pages/study/task_qual";
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import CogRefSurveyPage from "./pages/survey/cogRef";
import CogRefSurveyPage1 from "./pages/survey/cogRef1";
import ConsentPage from "./pages/consent/consent";
import DebriefPage from "./pages/debrief/debrief";
import Instructions1 from "./pages/instructions/instruction1_better";
import InstructionsStrength from "./pages/instructions/instructionsStrength_better";
import InstructionsShare from "./pages/instructions/instructionsShare_better";

import Instructions3 from "./pages/instructions/instructions3_better";
import Instructions4 from "./pages/instructions/instructions4_better";
import Quiz from "./pages/survey/quiz";
import Textelicitation_drugOverdose from "./pages/survey/textelicitation_drugOverdose";
import Textelicitation_AmericanPopulation from "./pages/survey/textelicitation_AmericanPopulation";
import Textelicitation_Opioids from "./pages/survey/textelicitation_Opioids";
import Noelicitation_drugOverdose from "./pages/survey/noelicitation_drugOverdose";
import Noelicitation_AmericanPopulation from "./pages/survey/noelicitation_AmericanPopulation";
import Noelicitation_Opioids from "./pages/survey/noelicitation_Opioids";
import Recall_drugOverdose from "./pages/survey/recall_drugOverdose";
import Viz1 from "./pages/survey/viz1";
import VisualElicitation_drugOverdose from "./pages/survey/visualElicitation_drugOverdose";
import VisualElicitation_population from "./pages/survey/visualElicitation_population";
import VisualElicitation_Opioids from "./pages/survey/visualElicitation_Opioids";
import Recall_Opioids from "./pages/survey/recall_Opioids";
import Attitude_Elicitation from "./pages/survey/attitude_Elicitation";
import Attitude_ElicitationPost from "./pages/survey/attitude_ElicitationPost";
import Topic_Involvement from "./pages/survey/topic_Involvement";

//pages
import LoadingCircle from "./components/loading/loading";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { choose } from "./functions/functions";

import "./App.css";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const App = () => {
  let query = useQuery();
  const questions = ["strength", "share"];
  const conditions =["text","viz","control"];
  const condition=choose(conditions)
  // const questions = ["strength"];
  // const questions = ["share"];
  const DEV = false;
  const [data, setData] = useRecoilState(dataState);
  const [response, setResponse] = useRecoilState(responseState);
  const [answerIndex, setAnswerIndex] = useRecoilState(answerIndexState);
  const [question, setQuestion] = useRecoilState(questionState);
  const [qualResponseIndex, setQualResponseIndex] =
    useRecoilState(qualResponseState);
  const [instructionResponse, setInstructionResponse] = useRecoilState(
    instructionResponseState
  );

  const [loadingOpacity, setLoadingOpacity] = useState(0);

  useEffect(() => {
    const localStorage = window.localStorage;
    /// FOR DEV
    if (DEV) {
      localStorage.clear();
    }
    if (!DEV) {
      const sessionResponse = localStorage.getItem("response");
      const sessionAnswerIndex = localStorage.getItem("answerIndex");
      const sessionQualResponseIndex =
        localStorage.getItem("qualResponseIndex");
      const sessionQuestion = localStorage.getItem("question");
      const sessionInstructionResponse = localStorage.getItem(
        "instructionResponse"
      );
      // console.log(sessionInstructionResponse);
      // console.log(sessionResponse);
      if (sessionResponse !== null) {
        setResponse(JSON.parse(sessionResponse));
        // console.log(sessionResponse);
      }
      if (sessionInstructionResponse !== null) {
        // console.log(sessionInstructionResponse);
        setInstructionResponse(+sessionInstructionResponse);
      }
      if (sessionAnswerIndex !== null) {
        setAnswerIndex(+sessionAnswerIndex);
        // console.log("session answer index", sessionAnswerIndex);
      }
      if (sessionQualResponseIndex !== null) {
        setQualResponseIndex(+sessionQualResponseIndex);
        // console.log("qual response index", sessionQualResponseIndex);
      }
      if (sessionQuestion !== null) {
        setQuestion(sessionQuestion);
        // console.log("session question", sessionQuestion);
      }
    }
  }, []);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("response", JSON.stringify(response));
    }
  }, [response]);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("answerIndex", answerIndex);
    }
  }, [answerIndex]);

  useEffect(() => {
    // console.log(question);
    if (response && Object.keys(response).length > 0) {
      window.localStorage.setItem("qualResponseIndex", qualResponseIndex);
    }
  }, [qualResponseIndex]);

  useEffect(() => {
    // console.log(instructionResponse);
    if (instructionResponse !== null) {
      window.localStorage.setItem("instructionResponse", instructionResponse);
    }
  }, [instructionResponse]);

  useEffect(() => {
    console.log(question);
    if (question) {
      window.localStorage.setItem("question", question);
    }
  }, [question]);

  useEffect(() => {
    // console.log(data);
    if (data) {
      window.localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/data");
      setTimeout(() => {
        // console.log(result.data);
        // let shuffledData = [shuffle(result.data[0]), shuffle(result.data[1])];
        let shuffledData;
        if (DEV) {
          shuffledData = [
            result.data[0].slice(0, 8),
            result.data[1].slice(0, 8),
          ];
        } else {
          shuffledData = [result.data[0], result.data[1]];
          // shuffledData = [
          //   result.data[0].slice(0, 4),
          //   result.data[1].slice(0, 4),
          // ];
        }

        let q = choose(questions);
        setQuestion(q);
        setData(shuffledData);
      }, 1000);
    }

    const sessionData = window.localStorage.getItem("data");
    // console.log("session data", sessionData);
    if (sessionData !== null) {
      setData(JSON.parse(sessionData));
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="app" style={{ height: "100%", lineHeight: "150%" }}>
      <Router>
        <NavBar height={"7%"} className="navBar"></NavBar>
        <div
          style={{ width: "100%", height: "86%", overflow: "auto" }}
          id="scrollWrapper"
        >
          <Container
            // style={{ height: "86%", margin: "0 auto",  }}
            // style={{ height: "93%" }}
            id="root-container"
            maxWidth="lg"
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/consent" />;
                }}
              />
              {/* https://vtl-study.herokuapp.com/consent?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}} */}
              <Route path="/consent">
                <ConsentPage
                  PROLIFIC_PID={query.get("PROLIFIC_PID")}
                  STUDY_ID={query.get("STUDY_ID")}
                  SESSION_ID={query.get("SESSION_ID")}
                ></ConsentPage>
              </Route>
              <Route path="/pre" component={PreSurveyPage}></Route>
              <Route path="/instructions1">
                <Instructions1></Instructions1>
              </Route>
              <Route
                path="/instructions2"
                render={() => {
                  if (question === "strength") {
                    return <InstructionsStrength></InstructionsStrength>;
                  } else {
                    // return <Redirect to="/instructions3"></Redirect>;
                    return <InstructionsShare></InstructionsShare>;
                  }
                }}
              ></Route>
              <Route path="/Instructions3">
                <Instructions3></Instructions3>
              </Route>
              <Route path="/quiz">
                <Quiz></Quiz>
              </Route>
              <Route path="/textelicitation_drugOverdose">
                <Textelicitation_drugOverdose></Textelicitation_drugOverdose>
              </Route>
              <Route path="/attitude_Elicitation">
                <Attitude_Elicitation></Attitude_Elicitation>
              </Route>
              <Route path="/topic_Involvement">
                <Topic_Involvement></Topic_Involvement>
              </Route>
              <Route path="/textelicitation_AmericanPopulation">
                <Textelicitation_AmericanPopulation></Textelicitation_AmericanPopulation>
              </Route>
              <Route path="/textelicitation_Opioids">
                <Textelicitation_Opioids></Textelicitation_Opioids>
              </Route>
              <Route path="/noelicitation_drugOverdose">
                <Noelicitation_drugOverdose></Noelicitation_drugOverdose>
              </Route>
              <Route path="/noelicitation_AmericanPopulation">
                <Noelicitation_AmericanPopulation></Noelicitation_AmericanPopulation>
              </Route>
              <Route path="/noelicitation_Opioids">
                <Noelicitation_Opioids></Noelicitation_Opioids>
              </Route>
              <Route path="/recall_drugOverdose">
                <Recall_drugOverdose></Recall_drugOverdose>
              </Route>
              <Route path="/viz1">
                <Viz1></Viz1>
              </Route>
              <Route path="/visualElicitation_drugOverdose">
                <VisualElicitation_drugOverdose></VisualElicitation_drugOverdose>
              </Route>
              <Route path="/visualElicitation_population">
                <VisualElicitation_population></VisualElicitation_population>
              </Route>
              <Route path="/visualElicitation_Opioids">
                <VisualElicitation_Opioids></VisualElicitation_Opioids>
              </Route>
              <Route path="/recall_Opioids">
                <Recall_Opioids></Recall_Opioids>
              </Route>
              <Route path="/attitude_ElicitationPost">
                <Attitude_ElicitationPost></Attitude_ElicitationPost>
              </Route>
              <Route path="/task1">
                <Task
                  phase={0}
                  opacity={loadingOpacity}
                  setLoadingOpacity={setLoadingOpacity}
                ></Task>
              </Route>
              <Route path="/cogref" component={CogRefSurveyPage}></Route>
              <Route path="/cogref1" component={CogRefSurveyPage1}></Route>
              <Route path="/task2">
                <Task
                  phase={1}
                  opacity={loadingOpacity}
                  setLoadingOpacity={setLoadingOpacity}
                ></Task>
              </Route>
              <Route path="/Instructions4">
                <Instructions4></Instructions4>
              </Route>
              <Route path="/task3">
                <QualTask
                  opacity={loadingOpacity}
                  setLoadingOpacity={setLoadingOpacity}
                ></QualTask>
              </Route>

              <Route path="/post" component={PostSurveyPage}></Route>
              <Route path="/debrief">
                <DebriefPage></DebriefPage>
              </Route>
            </Switch>
          </Container>
        </div>
        <BottomNav height="7%"></BottomNav>
      </Router>
      <LoadingCircle opacity={loadingOpacity}></LoadingCircle>
    </div>
  );
};

export default App;
