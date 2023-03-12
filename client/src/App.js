import React, {useState, useEffect, useRef} from "react";
import Container from "@mui/material/Container";
//pages
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import CogRefSurveyPage from "./pages/survey/cogRef";
import CogRefSurveyPage1 from "./pages/survey/cogRef1";
import InstructionPost_Elicitation from "./pages/survey/instructionPost_Elicitation";

import InstructionPost_Recall from "./pages/survey/instructionPost_Recall";
import InstructionPre from "./pages/survey/instructionPre";
import ConsentPage from "./pages/consent/consent";
import DebriefPage from "./pages/debrief/debrief";
import Quiz from "./pages/survey/quiz";

import VisualElicitation_drugOverdose from "./pages/survey/visualElicitation_drugOverdose";
import Attitude_Elicitation from "./pages/survey/attitude_Elicitation";
import Attitude_ElicitationPost from "./pages/survey/attitude_ElicitationPost";
import Topic_Involvement from "./pages/survey/topic_Involvement";

//pages
import LoadingCircle from "./components/loading/loading";
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
import Articles from "./pages/articles/Articles";
import Notice from "./pages/notice/Notice";
import ArticlesRecall from "./pages/articles/ArticlesRecall";
import Warnings from "./pages/notice/Warnings";

function useQuery() {
    const {search} = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const App = () => {
    let query = useQuery();
    const [loadingOpacity, setLoadingOpacity] = useState(0);

    //Randomize study flow
    const pre_pages = [
        "consent",
        'warnings',
        "pre",
        "instructionsGeneral",
        "quiz",
        "attitude_Elicitation",
        "topic_Involvement",
        "instructionPre",
    ]

    const post_pages = [
        "cogref",
        "cogref1",
        "instructionPost_Recall",
        "articlesRecall",
        "attitude_ElicitationPost",
        "debrief",
    ]

    // Store design flow
    const study_pages = useRef([pre_pages])
    // const treatment = useRef()

    const [treatment, setTreatment] = useState();

    const treatmentSelector = () => {
        const savedTreatment = localStorage.getItem('treatment');
        const tr = savedTreatment !== null? savedTreatment: choose(['txt', 'visual', 'control']);
        localStorage.setItem('treatment', tr);
        // const tr = ['visual','txt','control'][0];   // ONLY FOR TESTING. SHOULD KEEP COMMENTED
        // treatment.current = tr
        setTreatment(prev => tr );
        console.log([{saved: savedTreatment },{newT: tr}]);
        // console.log(treatment.current)
        if(tr === 'visual'){
            return [...pre_pages, 'training', 'articles', ...post_pages]
        }else{
            post_pages.splice(2,0,'training')
        }
        return [...pre_pages, 'articles', ...post_pages]
    }

    window.scrollTo(0,0);

    
    
    useEffect(() => {
        window.onbeforeunload = (function(event)
        {
            return window.confirm("You may lose your progress and may not get paid.");
        })()
        // window.addEventListener("beforeunload", alertUser);
        // return (() => {
        //     window.removeEventListener("beforeunload", alertUser);
        // });
    }, []);

        useEffect(() => {
            study_pages.current = treatmentSelector();
            // sessionStorage.setItem('treatment',treatment.current);
        }, [])

        // useEffect(() => {
        //     const localStorage = window.localStorage;
        //     /// FOR DEV
        //     if (DEV) {
        //         localStorage.clear();
        //     }
        //     if (!DEV) {
        //         const sessionResponse = localStorage.getItem("response");
        //         const sessionAnswerIndex = localStorage.getItem("answerIndex");
        //         const sessionQualResponseIndex =
        //             localStorage.getItem("qualResponseIndex");
        //         const sessionQuestion = localStorage.getItem("question");
        //         const sessionInstructionResponse = localStorage.getItem(
        //             "instructionResponse"
        //         );
        //         // console.log(sessionInstructionResponse);
        //         // console.log(sessionResponse);
        //         if (sessionResponse !== null) {
        //             setResponse(JSON.parse(sessionResponse));
        //             // console.log(sessionResponse);
        //         }
        //         if (sessionInstructionResponse !== null) {
        //             // console.log(sessionInstructionResponse);
        //             setInstructionResponse(+sessionInstructionResponse);
        //         }
        //         if (sessionAnswerIndex !== null) {
        //             setAnswerIndex(+sessionAnswerIndex);
        //             // console.log("session answer index", sessionAnswerIndex);
        //         }
        //         if (sessionQualResponseIndex !== null) {
        //             setQualResponseIndex(+sessionQualResponseIndex);
        //             // console.log("qual response index", sessionQualResponseIndex);
        //         }
        //         if (sessionQuestion !== null) {
        //             setQuestion(sessionQuestion);
        //             // console.log("session question", sessionQuestion);
        //         }
        //     }
        // }, []);

        // useEffect(() => {
        //     if (response && Object.keys(response).length > 0) {
        //         window.localStorage.setItem("response", JSON.stringify(response));
        //     }
        // }, [response]);
        //
        // useEffect(() => {
        //     if (response && Object.keys(response).length > 0) {
        //         window.localStorage.setItem("answerIndex", answerIndex);
        //     }
        // }, [answerIndex]);
        //
        // useEffect(() => {
        //     // console.log(question);
        //     if (response && Object.keys(response).length > 0) {
        //         window.localStorage.setItem("qualResponseIndex", qualResponseIndex);
        //     }
        // }, [qualResponseIndex]);
        //
        // useEffect(() => {
        //     // console.log(instructionResponse);
        //     if (instructionResponse !== null) {
        //         window.localStorage.setItem("instructionResponse", instructionResponse);
        //     }
        // }, [instructionResponse]);
        //
        // useEffect(() => {
        //     // console.log(question);
        //     if (question) {
        //         window.localStorage.setItem("question", question);
        //     }
        // }, [question]);
        //
        // useEffect(() => {
        //     // console.log(data);
        //     if (data) {
        //         window.localStorage.setItem("data", JSON.stringify(data));
        //     }
        // }, [data]);
        //
        // useEffect(() => {
        //     async function fetchData() {
        //         const result = await axios.get("/api/data");
        //         setTimeout(() => {
        //             console.log(result.data);
        //             // let shuffledData = [shuffle(result.data[0]), shuffle(result.data[1])];
        //             let shuffledData;
        //             if (DEV) {
        //                 shuffledData = [
        //                     result.data[0].slice(0, 8),
        //                     result.data[1].slice(0, 8),
        //                 ];
        //             } else {
        //                 shuffledData = [result.data[0], result.data[1]];
        //                 // shuffledData = [
        //                 //   result.data[0].slice(0, 4),
        //                 //   result.data[1].slice(0, 4),
        //                 // ];
        //             }
        //
        //             let q = choose(questions);
        //             setQuestion(q);
        //             setData(shuffledData);
        //         }, 1000);
        //     }
        //
        //     const sessionData = window.localStorage.getItem("data");
        //     // console.log("session data", sessionData);
        //     if (sessionData !== null) {
        //         setData(JSON.parse(sessionData));
        //     } else {
        //         fetchData();
        //     }
        // }, []);

        return (
            <div className="app" style={{height: "100%", lineHeight: "150%"}}>
                <Router>
                    <div>
                        <Container
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
                                 {/*https://vtl-study.herokuapp.com/consent?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}} */}
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
                                <Route path={'/instructionsGeneral'} >
                                    <InstructionsGeneral pages={study_pages}/>
                                    </Route>
                                <Route path="/quiz">
                                    <Quiz pages={study_pages}/>
                                </Route>
                                <Route path="/attitude_Elicitation">
                                    <Attitude_Elicitation pages={study_pages}/>
                                </Route>
                                <Route path="/topic_Involvement">
                                    <Topic_Involvement pages={study_pages}/>
                                </Route>
                                <Route path="/training">
                                    <InstructionPost_Elicitation pages={study_pages}/>
                                </Route>
                                <Route path="/visualElicitation_drugOverdose">
                                    <VisualElicitation_drugOverdose pages={study_pages}/>
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
                                <Route path="/attitude_ElicitationPost">
                                    <Attitude_ElicitationPost pages={study_pages}/>
                                </Route>
                                <Route path="/cogref">
                                    <CogRefSurveyPage pages={study_pages}/>
                                </Route>
                                <Route path="/cogref1">
                                    <CogRefSurveyPage1 pages={study_pages}/>
                                </Route>
                                <Route path="/warnings">
                                    <Warnings pages={study_pages}/>
                                </Route>
                                <Route path="/post">
                                    <PostSurveyPage pages={study_pages}/>
                                </Route>
                                <Route path="/debrief">
                                    <DebriefPage pages={study_pages}/>
                                </Route>
                                <Route path="/articles">
                                    <Articles pages={study_pages}/>
                                </Route>
                                <Route path="/articlesRecall">
                                    <ArticlesRecall treatment={treatment} pages={study_pages}/>
                                </Route>
                                <Route path="/notice">
                                    <Notice treatment={treatment} pages={study_pages}/>
                                </Route>
                            </Switch>
                        </Container>
                    </div>
                </Router>
                <LoadingCircle opacity={loadingOpacity} pages={study_pages}/>
            </div>
        );
    };

    export default App;
