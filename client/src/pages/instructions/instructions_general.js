import React, {useEffect, useState} from "react";
import {Button, Container} from "@mui/material/";
import pageHandler from "../pageHandler";
import styles from './instructions.module.css';
import {useHistory, useLocation} from "react-router-dom";


const textual_instructions = {
    'txt': [
        {
            text: "This is the text for stage 1 of the txt condition.",
            image:
                <img className={styles.imageContainer}
                     src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i0.png"
                     alt="stage 1 txt condition image"/>
        },
        {
            text: "This is the text for stage 2 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i1.png"
                        alt="stage 2 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i2.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i3.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i4.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i5.png"
                        alt="stage 3 txt condition image"/>
        }
    ],
    'visual': [
        {
            text: "This is the text for stage 1 of the txt condition.",
            image:
                <img className={styles.imageContainer}
                     src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i0.png"
                     alt="stage 1 txt condition image"/>
        },
        {
            text: "This is the text for stage 2 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i1.png"
                        alt="stage 2 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i2.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i3.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i4.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i5.png"
                        alt="stage 3 txt condition image"/>
        }
    ],
    'control': [
        {
            text: "This is the text for stage 1 of the txt condition.",
            image:
                <img className={styles.imageContainer}
                     src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i0.png"
                     alt="stage 1 txt condition image"/>
        },
        {
            text: "This is the text for stage 2 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i1.png"
                        alt="stage 2 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i2.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i3.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i4.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.imageContainer}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i5.png"
                        alt="stage 3 txt condition image"/>
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
                        <div className={styles.imageContainer}>
                            {textual_instructions.txt[step].image}
                        </div>
                        <div className={styles.textContainer}>
                            {textual_instructions.txt[step].txt}
                        </div>
                    </div>


                );
            case "visual":
                return (
                    <div>
                        <div className={styles.imageContainer}>
                            {textual_instructions.txt[step].image}
                        </div>
                        <div className={styles.textContainer}>
                            {textual_instructions.visual[step].txt}
                        </div>
                    </div>
                );
            case "control":
                return (
                    <div>
                        <div className={styles.imageContainer}>
                            {textual_instructions.txt[step].image}
                        </div>
                        <div className={styles.textContainer}>
                            {textual_instructions.control[step].txt}
                        </div>
                    </div>
                );
        }
    };
useEffect(()=>{
    if(step === textual_instructions[props.treatment].length - 1){
        setButtonLabel(()=>'Complete');
    }
},[step])
    const clickHandler = () => {
        if (step < (textual_instructions[`${props.treatment}`].length-1)) {
            setStep((prev) => prev + 1)
        } else {
            let nextPage = pageHandler(props.pages, location.pathname);
            history.push(nextPage);
        }
    }
    // console.log(step)
    return (
        <div >
            <Container className={styles.mainContainer}>
                {textCreator()}
            </Container>
            <div className={styles.navigationContainer}>
                <button
                    type={"button"}
                    onClick={clickHandler}
                    className={styles.actions}
                >
                    {buttonLabel}

                </button>
            </div>
        </div>

    )
}

