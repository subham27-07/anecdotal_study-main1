import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import styles from '../articles/articles.module.css'
// const useStyles = makeStyles((theme) => ({
//   emph: {
//     fontWeight: "bold",
//   },
//   highlight: {
//     fontWeight: "bold",
//     color: "red",
//   },
//   instructContainer: {
//     height: "100%",
//     margin: "0 auto",
//     overflow: "auto",
//   },
//   image: {
//     width: "50%",
//     display: "block",
//     margin: "auto",
//   },
// }));

export default function Debrief(props) {
  // const classes = useStyles();
  const [token, setToken] = useState(null);

  useEffect(() => {
    axios.get("api/debrief").then((res) => {
      setToken(res.data.token);
      console.log(res);
    });
  }, []);

  return (
    <Container className={styles.mainContainer}>
      <div className={styles.articleStructure}>
        <div className={styles.title}>
          Debriefing
        </div>
        <div className={styles.paragraph}>
          <p>
            Thank you for your participation! In this study, we investigated whether
            anecdotal evidence (experience of a single person) used as evidence is
            seen as strong evidence.
          </p>
          <h3>
            Below is your token of completion. Please enter (copy and paste) this
            into Prolific. You may close the page after you have entered the code
          </h3>
          <hr />
          {/*<h3>463377EF</h3>*/}
          <h3>{`${token}`}</h3>
          <hr />

        </div>
      </div>
      <div className={styles.navigationContainer}></div>
      {/* <p>
        <b>Principal investigator:</b> Alireza Karduni, College of Computing and
        Informatics
      </p>
      <p>
        <b>Faculty Adviser:</b> Dr. Wenwen Dou, College of Computing and
        Informatics
      </p>
      <p>
        <b>Co-PIs:</b> Dr. Doug Markant (Department of Psychological Science),
        Ryan Wesslen (College of Computing and Informatics)
      </p> */}


      {/* <h3>If you a SONA participant, there is nothing else you need to do.</h3>
      <p>
        If your instructor has offered extra credits for this study, please
        email them your unique token. We will confirm your participation by
        cross-checking your token within our secure database if inquired by the
        instructor. If you are participating in this study through SONA, you
        will receive 0.5 credits for your participation. Please click on the
        following link to be redirected back to SONA.
      </p>
      <p>
        For questions about this research, you may contact Alireza Karduni
        (akarduni@uncc.edu) and Dr. Wenwen Dou (Wdou1@uncc.edu). If you have
        questions about your rights as a research participant, or wish to obtain
        information, ask questions, or discuss any concerns about this study
        with someone other than the researcher(s), please contact the Office of
        Research Protections and Integrity at 704-687-1871 or uncc-irb@uncc.edu.
      </p> */}
    </Container>
  );
}


