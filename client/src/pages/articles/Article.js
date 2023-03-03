import React, {useState, useRef} from "react";
import styles from './articles.module.css'
import Button from "@mui/material/Button";


const articleContent = {
    title: 'How Bad Is the Drug Overdose Epidemic?',
    drugOverdose: {
        id: "One",
        text: {
            body: `Since 2002,percentage of American population with drug use disorders has increased by more than 137 percent.
            The United States is currently in the grips of a powerful drug epidemic, with drug use disorders steadily climbing every year.
            A drug use disorder is a mental disorder that affects a person’s brain and behavior, leading to a person’s
            inability to control their use of drugs including legal or illegal drugs. Drug use disorders occur
            when an individual compulsively misuses drugs and continues abusing the substance despite
            knowing the negative impact it has on their life.`,
            subTitle: `Article 2 of Americans population with drug use disorders...`,
            instructions: 'Please answer the questions below',
            definitions: "",
        },
        image: "",
    },
    usPopulation: {
        id: "Two",
        text: {
            subTitle: "",
            instructions: "",
            definitions: "",
        },
        image: "",
    },
    opioids: {
        id: "Three",
        text: {
            subTitle: "",
            instructions: "",
            definitions: "",
        },
        image: "",
    }


}

export default function Articles() {


    return (
        <div className={styles.mainContainer}>
            <div className={styles.articleContainer}>
                <div className={styles.articleStructure}>
                    <div className={styles.progressBar}>
                        <span className={styles.articleId}> Article {`${articleContent.drugOverdose.id}`}</span>
                    </div>
                    <div className={styles.title}>
                        {`${articleContent.title}`}
                    </div>
                    <div className={styles.subtitle}>
                        <p>Since 2002 percentage of Americans population with drug use disorders...</p>
                    </div>
                    <div className={styles.paragraph}>
                        {articleContent.drugOverdose.text.body}
                    </div>
                </div>
            </div>
            <div className={styles.navigationContainer}>
                <Button variant={"contained"} color="primary">
                    Next
                </Button>
            </div>
        </div>)
};