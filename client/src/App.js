import React, {useState, useEffect, useRef} from "react";
import {useRecoilState} from "recoil";
import {dataState} from "./atoms/data";
import {responseState} from "./atoms/response";
import {answerIndexState} from "./atoms/answerIndex";
import {qualResponseState} from "./atoms/qualResponseIndex";
import {questionState} from "./atoms/questionSelector";
import {instructionResponseState} from "./atoms/instructionResponse";
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
import InstructionPost_Elicitation from "./pages/survey/instructionPost_Elicitation";

import InstructionPost_Recall from "./pages/survey/instructionPost_Recall";
import InstructionPre from "./pages/survey/instructionPre";
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
import Attitude_recallDrug from "./pages/survey/attitude_recallDrug";
import Attitude_recallPopulation from "./pages/survey/attitude_recallPopulation";
import Attitude_recallOpioids from "./pages/survey/attitude_recallOpioids";

import VisualElicitation_drugOverdose from "./pages/survey/visualElicitation_drugOverdose";
import VisualElicitation_population from "./pages/survey/visualElicitation_population";
import VisualElicitation_Opioids from "./pages/survey/visualElicitation_Opioids";
import Recall_Opioids from "./pages/survey/recall_Opioids";
import Recall_population from "./pages/survey/recall_population";
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
import {choose} from "./functions/functions";

import "./App.css";
import InstructionsGeneral from "./pages/instructions/instructions_general";
import Articles from "./pages/articles/Article";
import Articles2 from "./pages/articles/Article2";

function useQuery() {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const App = () => {
    let query = useQuery();
    const questions = ["strength", "share"];
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

    //Randomize study flow
    const pre_pages = [
        "consent",
        "pre",
        "instructionsGeneral",
        "quiz",
        "attitude_Elicitation",
        "topic_Involvement",
        "instructionPre",
    ]
    // const txt_pages = [
    //     "textelicitation_drugOverdose",
    //     "textelicitation_AmericanPopulation",
    //     "textelicitation_Opioids",
    // ]
    // const visual_pages = [
    //     "visualElicitation_drugOverdose",
    //     "visualElicitation_population",
    //     "visualElicitation_Opioids",
    // ]
    // const control = [
    //     "noelicitation_drugOverdose",
    //     "noelicitation_AmericanPopulation",
    //     "noelicitation_Opioids",
    // ]
    const post_pages = [
        "cogref",
        "cogref1",
        "instructionPost_Elicitation",
        "instructionPost_Recall",
        "articles2",
        // "recall_drugOverdose",
        // "recall_population",
        // "recall_Opioids",
        "attitude_ElicitationPost",
        "debrief",
    ]

    // Store design flow
    const study_pages = useRef([pre_pages])
    const treatment = useRef()

    const treatmentSelector = () => {
        const tr = choose(['txt', 'visual', 'control'])
        // const tr = choose(['txt', 'control'])
        // const tr = 'visual';   // ONLY FOR TESTING. SHOULD KEEP COMMENTED
        treatment.current = tr
        // console.log(treatment.current)
        // switch (tr) {
        //     case 'txt':
        //         return [...pre_pages, ...txt_pages, ...post_pages];
        //     case 'visual':
        //         return [...pre_pages, ...visual_pages, ...post_pages];
        //     case 'control':
        //         return [...pre_pages, ...control, ...post_pages];
        //     default:
        //         console.log(`Treatment is : ${treatment}`)
        //         console.log('Error with TreatmentSelector! No such treatment found!')
        //         break;
        // }
        return [...pre_pages, 'articles', ...post_pages]
    }
        // Set
        useEffect(() => {
            study_pages.current = treatmentSelector();
        }, [])

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
            // console.log(question);
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
            <div className="app" style={{height: "100%", lineHeight: "150%"}}>
                <Router>
                    {/*<NavBar height={"7%"} className="navBar"></NavBar>*/}
                    <div
                        // style={{width: "100%", height: "86%", overflow: "auto"}}
                        // id="scrollWrapper"
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
                                        return <Redirect to="/consent"/>;
                                    }}
                                />
                                {/* https://vtl-study.herokuapp.com/consent?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}} */}
                                <Route path="/consent">
                                    <ConsentPage
                                        PROLIFIC_PID={query.get("PROLIFIC_PID")}
                                        STUDY_ID={query.get("STUDY_ID")}
                                        SESSION_ID={query.get("SESSION_ID")}
                                        pages={study_pages}
                                    ></ConsentPage>
                                </Route>
                                <Route path="/pre">
                                    <PreSurveyPage pages={study_pages}/>
                                </Route>
                                <Route path="/instructions1">
                                    <Instructions1
                                        treatment = {treatment.current}
                                        pages={study_pages}></Instructions1>
                                </Route>
                                <Route
                                    path="/instructions2"
                                    render={() => {
                                        if (question === "strength") {
                                            return <InstructionsStrength pages={study_pages}/>;
                                        } else {
                                            // return <Redirect to="/instructions3"></Redirect>;
                                            return <InstructionsShare pages={study_pages}/>;
                                        }
                                    }}
                                ></Route>
                                <Route path={'/instructionsGeneral'} >
                                    <InstructionsGeneral treatment={treatment.current} pages={study_pages}/>
                                    </Route>
                                <Route path="/Instructions3">
                                    <Instructions3 pages={study_pages}/>
                                </Route>
                                <Route path="/quiz">
                                    <Quiz pages={study_pages}/>
                                </Route>
                                <Route path="/textelicitation_drugOverdose">
                                    <Textelicitation_drugOverdose pages={study_pages}/>
                                </Route>
                                <Route path="/attitude_Elicitation">
                                    <Attitude_Elicitation pages={study_pages}/>
                                </Route>
                                <Route path="/topic_Involvement">
                                    <Topic_Involvement pages={study_pages}/>
                                </Route>
                                <Route path="/textelicitation_AmericanPopulation">
                                    <Textelicitation_AmericanPopulation pages={study_pages}/>
                                </Route>
                                <Route path="/textelicitation_Opioids">
                                    <Textelicitation_Opioids pages={study_pages}/>
                                </Route>
                                <Route path="/noelicitation_drugOverdose">
                                    <Noelicitation_drugOverdose pages={study_pages}/>
                                </Route>
                                <Route path="/noelicitation_AmericanPopulation">
                                    <Noelicitation_AmericanPopulation pages={study_pages}/>
                                </Route>
                                <Route path="/noelicitation_Opioids">
                                    <Noelicitation_Opioids pages={study_pages}/>
                                </Route>
                                <Route path="/recall_drugOverdose">
                                    <Recall_drugOverdose pages={study_pages}/>
                                </Route>
                               
                                <Route path="/visualElicitation_drugOverdose">
                                    <VisualElicitation_drugOverdose pages={study_pages}/>
                                </Route>
                                <Route path="/visualElicitation_population">
                                    <VisualElicitation_population pages={study_pages}/>
                                </Route>
                                <Route path="/visualElicitation_Opioids">
                                    <VisualElicitation_Opioids pages={study_pages}/>
                                </Route>
                                <Route path="/instructionPost_Elicitation">
                                    <InstructionPost_Elicitation pages={study_pages}/>
                                </Route>
                                <Route path="/instructionPost_Recall">
                                    <InstructionPost_Recall pages={study_pages}/>
                                </Route>

                                <Route path="/instructionPre">
                                    <InstructionPre pages={study_pages}/>
                                </Route>

                                <Route path="/recall_Opioids">
                                    <Recall_Opioids pages={study_pages}/>
                                </Route>
                                <Route path="/recall_population">
                                    <Recall_population pages={study_pages}/>
                                </Route>
                                <Route path="/attitude_recallDrug">
                                    <Attitude_recallDrug pages={study_pages}/>
                                </Route>
                                <Route path="/attitude_recallPopulation">
                                    <Attitude_recallPopulation pages={study_pages}/>
                                </Route>
                                <Route path="/attitude_recallOpioids">
                                    <Attitude_recallOpioids pages={study_pages}/>
                                </Route>
                                <Route path="/attitude_ElicitationPost">
                                    <Attitude_ElicitationPost pages={study_pages}/>
                                </Route>
                                <Route path="/task1">
                                    <Task
                                        phase={0}
                                        opacity={loadingOpacity}
                                        setLoadingOpacity={setLoadingOpacity}
                                        pages={study_pages}
                                    />
                                </Route>
                                <Route path="/cogref">
                                    <CogRefSurveyPage pages={study_pages}/>
                                </Route>
                                <Route path="/cogref1">
                                    <CogRefSurveyPage1 pages={study_pages}/>
                                </Route>
                                <Route path="/task2">
                                    <Task
                                        phase={1}
                                        opacity={loadingOpacity}
                                        setLoadingOpacity={setLoadingOpacity}
                                        pages={study_pages}
                                    />
                                </Route>
                                <Route path="/Instructions4">
                                    <Instructions4 pages={study_pages}/>
                                </Route>
                                <Route path="/task3">
                                    <QualTask
                                        opacity={loadingOpacity}
                                        setLoadingOpacity={setLoadingOpacity}
                                        pages={study_pages}
                                    />
                                </Route>
                                <Route path="/post">
                                    <PostSurveyPage pages={study_pages}/>
                                </Route>
                                <Route path="/debrief">
                                    <DebriefPage pages={study_pages}/>
                                </Route>
                                <Route path="/articles">
                                    <Articles treatment={treatment} pages={study_pages}/>
                                </Route>
                                <Route path="/articles2">
                                    <Articles2 treatment={treatment} pages={study_pages}/>
                                </Route>
                            </Switch>
                        </Container>
                    </div>
                    {/*<BottomNav height="7%"></BottomNav>*/}
                </Router>
                <LoadingCircle opacity={loadingOpacity} pages={study_pages}/>
            </div>
        );
    };

    export default App;
