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
      // console.log(res);
    });
  }, []);
  useEffect(()=>{
    localStorage.clear();
  },[])
  return (
    <Container className={styles.mainContainer}>
      <div className={styles.articleStructure}>
        <div className={styles.title}>
          Debriefing
        </div>
        <div>
          <p><b>Title of the Project:</b> News Articles with Data Visualizations</p>
          <p><b>Principal investigator:</b> Dr. Wenwen Dou, Department of Computer Science</p>

        </div>
        <div className={styles.paragraph}>
          <p>
            Thank you for your participation! This study examines how people explore news
            articles with temporal visualizations with or without asking them to think about the
            trends first. The task was designed to assess your recall about the main trend/issue
            from each article. We are interested in how much people recall about the trend
            related to the news headline as a result of asking them to produce a trend first
            based on their own opinion. The results of this study will improve our understanding
            of how people read and learn from news articles with data visualizations and how
            to design articles that best support better recall and engagement.
          </p>
          <h3>
            Below is your token of completion. Please enter (copy and paste) this
            into Prolific. You may close the page after you have entered the code
          </h3>
          <hr />
          <h3>C1A1OI90</h3>
          {/*<h3>{`${token}`}</h3>*/}
          <hr />

        </div>
      </div>
      <div className={styles.navigationContainer}></div>
      <div className={styles.navigationContainer}>
        <button className={styles.actions} type={"button"} onClick={(()=>{
          window.open("about:blank", "_self");
          window.close();
          window.close();

        })} >
          I copied the token. Close
        </button>
      </div>
    </Container>
  );
}


