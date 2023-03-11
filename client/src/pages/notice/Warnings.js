import React from "react";
import styles from '../articles/articles.module.css';
import {Container} from "@mui/material/";
import {useHistory, useLocation} from "react-router-dom";
import pageHandler from "../pageHandler";


export default function Warnings(props) {
    const history = useHistory();
    const location = useLocation();

    function handleClick() {
        let nextPage = pageHandler(props.pages, location.pathname);
        history.push(nextPage);
    }

    return (<Container className={styles.mainContainer}>
      <div style={{display:"grid", gridTemplateColumns: "1fr 16fr", gap:'3%'}}>
          <div className={styles.articleImageContainer}>
              <img
                  src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABv0lEQVR4nO2Zvy8EQRTHPw6XEyFKnagkEo24xo9GKKg0FAqJQoVCohA6KqLQSE7jopEoqPwbipMQjYRQiIJKcOecvGQkm8m629zFzcxmPslrZl4277vzsjPfHYhOGrgF3oBlHKUDeARKKvJAGw6SDYiQeAdacYxJTYTEJhbSCawDC0BThZaSyAFJLOQmUOSRNneoiSgA/VhKSYs1NT4RMrdVxfPqFVxoA0VgDnjQxi8jtpQxIV3AU4UkaamBKle4bkKEQeCjTFKUlrJCCKqdwhKugRSOsR3SUnI0cY4EcBwQsorDNKhV6DVdiMfjGGlvrCwiq+0v3lj9JylgFphSG6KzxuosUKS0kLPG6lsr1hsr08f4buA5LsZqBPiMi7Gaj5Ox2ouLsWoETuNkrIaAPtOFeDweT03IqfcKeAUWcZR24F7bKMWrOMeBtuPnXRQyHuJZdrGQJDCtbqhkVw8iV9B3mgi5qmvBQk4CRWa0uYwm4kvdpVhJUSt2RY2PVdlSxvxILuStz9TQUsaE9AAvFZJk1YYjrrAxIb9fpkKZpB2iY1SIsPRHgrVfqXLs19BSVtEMnAeEbOAwCWDUtZ8OP6rYVuhtHLcUAAAAAElFTkSuQmCC"}
                  alt={'icon-warning'} className={styles.articleImage}/>
          </div>
          <div className={styles.articleContainer}>
              <p className={styles.title}>Important Notice</p>
              <div className={styles.subtitle}> Please read the paragraph below carefully.</div>
              <div className={`${styles.paragraph} ${styles.txtNormal}`}>
                  To ensure accurate and valid results, it is important that all study participants follow the
                  instructions carefully. Please take note of the following instructions:
                  <ul>
                      <li> Do not refresh any page.
                      </li>
                      <li>Use a laptop/desktop computer.</li>
                      <li>Use an updated version of Chrome browser.</li>
                      <li>Read the information and instructions on each page carefully.</li>
                      <li>Make sure you understand each step of the study before proceeding.</li>
                      <li>You will receive a token at the end of the study when you reach the debriefing page. Copy
                          and save that code before closing the page.
                          If you do not provide a token on Prolific at the end, your payment will not be guaranteed.
                      </li>
                  </ul>
                  <p className={styles.subtitle}><b>Thank you for your cooperation.</b></p>

              </div>
          </div>
      </div>
        <div className={styles.navigationContainer}>
            <button type={'button'} className={styles.actions} onClick={handleClick}>
                Next
            </button>
        </div>
    </Container>)
}
;