import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import pageHandler from "../pageHandler";

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
    margin: "0 auto",
    overflow: "auto",
  },
  image: {
    width: "50%",
    display: "block",
    margin: "auto",
  },
}));

const Consent = (props) => {
  // ?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}
  const PROLIFIC_PID = props.PROLIFIC_PID;
  const STUDY_ID = props.STUDY_ID;
  const SESSION_ID = props.SESSION_ID;
  console.log(STUDY_ID);
  const d = new Date();
  const history = useHistory();
  const location = useLocation();
  const query = queryString.parse(location.search);

  const handleConsent = () => {
      // push to db
      const survey_start_time = Date.now()
    axios
      .get(
        `/api/consent?PROLIFIC_PID=${PROLIFIC_PID}&STUDY_ID=${STUDY_ID}&SESSION_ID=${SESSION_ID}&survey_start=${survey_start_time}`
      )
      .then((result) => {
        // console.log(result);
        let nextPage = pageHandler(props.pages, location.pathname);
        history.push(nextPage);
      });
  };
  const classes = useStyles();
  const [overflow, setOverflow] = useState(true);

  useEffect(() => {
    window.addEventListener("beforeprint", () => {
      // setOverflow(false);
      document.querySelector("#scrollWrapper").style.overflow = "visible";
    });
    window.addEventListener("afterprint", () => {
      document.querySelector("#scrollWrapper").style.overflow = "scroll";
    });
  }, []);

  return (
    <Container
      maxWidth="xl"
      // style={{ overflow: overflow }}
      className={classes.instructContainer}
      id="consent-container"
    >
      <div></div>
      <h1>Consent to Participate in Online Research</h1>
      <h2>Title of Research Study:</h2>
      <p>News Articles with Data Visualizations</p>
      <h2>Principal Investigator</h2>
      <p>Dr. Wenwen Dou : Dept. of Computer Science, UNC</p>
      <p>Dr. Douglas Markant : Dept. of Psychological Science</p>
      <h2>Supported By</h2>
      <p>UNC Charlotte | Dept. of Computer Science | Department of Psychology</p>

      <h2>Key Information about this research study:</h2>
      <p>
      You are invited to participate in a research study. Participation in this research study is voluntary. The information provided on this form is to help you decide whether or not to participate. If you have any questions, please ask. 
      The purpose of this study is to examine how people explore news articles with data visualizations on a range of topics related to public health and policy.
      We are asking individuals who are age 18 and older and fluent in English to complete an online task in one 30-minute session. You will be asked to complete computer-based tasks in which you answer questions about how you evaluate information, answer questions on your attitudes toward different topics, and explore a series of news articles with data visualizations. These online tasks must be completed using a laptop or desktop computer with a physical keyboard.
      If you complete the study you will receive you will receive XX extra credit points toward your grade in DSBA -5122. Although you can choose to end your participation at any time, you must finish the entire task in order to receive extra credit. Low-quality submissions (due to low-effort responses or rapid completion time) will not be eligible for extra credit. If you choose not to participate, you will have the opportunity to complete an alternative extra credit assignment for an equivalent amount of extra credit. 
      This study requires your focused attention for the entire duration of the task. Please do not continue unless you are in a suitable, distraction-free environment that will allow you to focus on the task.
      There is a rare risk of distress or effects on reputation in the event of a breach of confidentiality, since some of the study materials involve political opinions and attitudes. 
      The broader benefits of this research include improved scientific understanding of how people engage with news articles with data visualization.
      Please read this form before you decide whether to participate in this research study.
      </p>

      <h2>Why are we doing this study? </h2>
      <p>The purpose of this study is to better understand how people read and learn from news articles with data visualizations. 
        Please note: This study involves an experimental manipulation which means that your experience may differ from other participants. In order to protect the integrity of the data, the full study design will not be revealed to you unless you contact the researchers to request further information.
      </p>

      <h2>Why are you being asked to be in this research study? </h2>
      <p>You are being asked to be in this study because you are age 18 and older, and are able to read and write in English. 
      </p>

      <h2>What will happen if I take part in this study? </h2>
      <p>If you choose to participate in this study, you will be asked to complete a single, approximately 30-minute session involving a set of computer-based tasks. These online tasks must be completed using a laptop or 
desktop computer with a physical keyboard. You will be asked to complete questionnaires about your personal attitudes and the ways in which you evaluate information. You will then explore a series of news articles with data visualizations that are related to matters of public interest. The total time commitment if you choose to participate will be approximately 30 minutes.
      </p>

      <h2>What benefits might I experience? </h2>
      <p>
      You will not benefit directly from being in this study. The broader benefits of this research include improved scientific understanding of how people read and learn from news articles with data visualizations related to matters of public health and policy.
      </p>

      <h2>What risks might I experience? </h2>
      <p>
      There is a rare risk of distress or effects on reputation in the event of a breach of confidentiality, since some of the study materials involve political opinions and attitudes.
      </p>

      <h2>How will my information be protected?</h2>
      <p>
      Research data collected as part of this study will remain confidential to the fullest extent possible. Identifiable information will be stored separately from all other data collected during this study. Records of your responses during the study will be linked to identifiable data using a master list; this list will be permanently deleted upon completion of the study. Until that point any identifiable information will be stored in protected databases or cloud storage accounts accessible only to the researchers or University administrators.
      </p>

      <h2>How will my information be used after the study is over? </h2>
      <p>
      After this study is complete, de-identified research data may be shared with other researchers for use in other studies or as may be needed as part of publishing our results. The data we share will NOT include information that could identify you. 
      </p>

      <h2>Will I receive an incentive for taking part in this study? </h2>
      <p>
          You will receive a <b>5 extra credit</b> points toward your grade in DSBA 5122 upon completion of the study. Although you can choose to end your participation at any time, you must finish the entire task in order to receive the extra credits. Low-quality submissions (due to low-effort responses or rapid completion time) will not be eligible for extra credit. More details on rejection criteria can be found at Prolific guidelines for rejection. If you choose not to participate, you will have the opportunity to complete an alternative extra credit assignment for an equivalent amount of extra credit.
      </p>

      <h2>What are my rights if I take part in this study? </h2>
      <p>
      It is up to you to decide to be in this research study. Participating in this study is voluntary. Even if you decide to be part of the study now, you may change your mind and stop at any time. You do not have to answer any questions you do not want to answer. 
      </p>

      <h2>Who can answer my questions about this study and my rights as a participant? </h2>
      <p>
      For questions about this research, you may contact Dr. Wenwen Dou (wenwen.dou@uncc.edu). 
If you have questions about your rights as a research participant, or wish to obtain information, ask questions, or discuss any concerns about this study with someone other than the researcher(s), please contact the Office of Research Protections and Integrity at 704-687-1871 or uncc-irb@uncc.edu. 

      </p>

      <h2>Consent to Participate </h2>
      <p>
      By choosing Yes as a response to this consent form, you are agreeing to be in this study. Make sure you understand what the study is about before you submit your decision. You can download a copy of this document for your records using the link at the bottom of this page. If you have any questions about the study after you consent to this study, you can contact the study team using the information provided above. 
      </p>





      <p>
        I understand what the study is about and my rights as a participant. I
        agree to take part in this study.
      </p>

      <p>
        <b>Date:</b>
        {d.toString()}
      </p>

      <Button
        style={{ backgroundColor: "lightgrey", color: "black" }}
        onClick={window.print}
      >
        <span></span> Print a copy of this page
      </Button>
      <hr />
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          // style={{ backgroundColor: "darkgrey", color: "black" }}
          variant="contained"
          onClick={handleConsent}
        >
          I Consent
        </Button>
      </div>
    </Container>
  );
};

export default Consent;
