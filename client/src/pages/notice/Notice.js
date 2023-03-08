import React from "react";
import styles from '../articles/articles.module.css';
import {Container} from "@mui/material/";
import {useHistory} from "react-router-dom";


export default function Notice() {
    const history = useHistory();
    function handleClick(){
        history.push("/");
    }
    return (<Container className={styles.mainContainer}>
        <div className={styles.articleContainer}>
            <p className={styles.title}>Sorry!</p>
            <p className={styles.subtitle}> Study aborted.</p>
            <p className={`${styles.paragraph} ${styles.txtNormal}`}>
                We regret to inform you that an error has occurred and the study cannot continue at this time. We
                apologize for any inconvenience this may have caused. In order to ensure the integrity of our data and
                provide the best possible experience for all participants, we must redirect you to the homepage of the
                study to start over. Please rest assured that any information you have already provided will be securely
                stored and used only for research purposes. Thank you for your understanding and cooperation.
            </p>
        </div>
        <div className={styles.navigationContainer}>
            <button type={'button'} className={styles.actions} onClick={handleClick}>
                Restart Study
            </button>
        </div>
    </Container>)
}
;