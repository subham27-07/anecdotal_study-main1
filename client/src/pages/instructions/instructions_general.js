import React, {useState, useEffect, useRef} from "react";
import {Button, Divider, Typography, Container} from "@mui/material/";
import pageHandler from "../pageHandler";
import styles from './instructions.module.css';
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from "@mui/styles";


const textual_instructions = {
    'txt': [
        {
            text: "This is the text for stage 1 of the txt condition.",
            image:
                <img className={styles.imageContainer}
                     src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a1.png"
                     alt="stage 1 txt condition image"/>
        },
        {
            text: "This is the text for stage 2 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a2.png"
                        alt="stage 2 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a3.png"
                        alt="stage 3 txt condition image"/>
        }
    ],
    'visual': [
        {
            text: "This is the text for stage 1 of the visual condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a1.png"
                        alt="stage 1 visual condition image"/>
        },
        {
            text: "This is the text for stage 2 of the visual condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a2.png"
                        alt="stage 2 visual condition image"/>
        },
        {
            text: "This is the text for stage 3 of the visual condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a3.png"
                        alt="stage 3 visual condition image"/>
        }
    ],
    'control': [
        {
            text: "This is the text for stage 1 of the control condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a1.png"
                        alt="stage 1 control condition image"/>
        },
        {
            text: "This is the text for stage 2 of the control condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a2.png"
                        alt="stage 2 control condition image"/>
        },
        {
            text: "This is the text for stage 3 of the control condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/a3.png"
                        alt="stage 3 control condition image"/>
        }
    ]
}


export default function InstructionsGeneral(props) {
    const history = useHistory();
    const location = useLocation();
    const [step, setStep] = useState(0);

    const [buttonLabel, setButtonLabel] = useState('Next')
    const textCreator = () => {
        switch (props.treatment) {
            case "txt":
                return (
                    <div>
                        {textual_instructions.txt[step].image}
                        <div className={styles.textContainer}>
                            {textual_instructions.txt[step].txt}
                        </div>
                    </div>


                );
            case "visual":
                return (
                    <div>
                        {textual_instructions.visual[step].image}
                        <div className={styles.textContainer}>
                            {textual_instructions.visual[step].txt}
                        </div>
                    </div>
                );
            case "control":
                return (
                    <div>
                        {textual_instructions.control[step].image}
                        <div className={styles.textContainer}>
                            {textual_instructions.control[step].txt}
                        </div>
                    </div>
                );
        }
    };

    const clickHandler = () => {
        if (step < (textual_instructions[`${props.treatment}`].length-1)) {
            setStep((prev) => prev + 1)
        } else {
            setButtonLabel(()=>'Complete');
            let nextPage = pageHandler(props.pages, location.pathname);
            history.push(nextPage);
        }
    }
    console.log(step)
    return (
        <Container>
            {textCreator()}
            <Button
                variant={"contained"}
                color='primary'
                onClick={clickHandler}>
                {buttonLabel}
            </Button>

        </Container>
    )
}


