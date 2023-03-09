import React, {useEffect, useState} from "react";
import { Container} from "@mui/material/";
import pageHandler from "../pageHandler";
import styles from '../articles/articles.module.css';
import {useHistory, useLocation} from "react-router-dom";



const textual_instructions = {
    'txt': [
        {
            text: "This is the text for stage 1 of the txt condition.",
            image:
                <img className={styles.articleImage}
                     src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i0.png"
                     alt="stage 1 txt condition image"/>
        },
        {
            text: "This is the text for stage 2 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i1.png"
                        alt="stage 2 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i2.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i3.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i4.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i5.png"
                        alt="stage 3 txt condition image"/>
        }
    ],
    'visual': [
        {
            text: "This is the text for stage 1 of the txt condition.",
            image:
                <img className={styles.articleImage}
                     src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i0.png"
                     alt="stage 1 txt condition image"/>
        },
        {
            text: "This is the text for stage 2 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i1.png"
                        alt="stage 2 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i2.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i3.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i4.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i5.png"
                        alt="stage 3 txt condition image"/>
        }
    ],
    'control': [
        {
            text: "This is the text for stage 1 of the txt condition.",
            image:
                <img className={styles.articleImage}
                     src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i0.png"
                     alt="stage 1 txt condition image"/>
        },
        {
            text: "This is the text for stage 2 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i1.png"
                        alt="stage 2 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i2.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i3.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImage}
                        src="https://raw.githubusercontent.com/subham27-07/youdrawitnew/main/i4.png"
                        alt="stage 3 txt condition image"/>
        },
        {
            text: "This is the text for stage 3 of the txt condition.",
            image: <img className={styles.articleImageContainer}
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
                        <div className={styles.articleImage}>
                            {textual_instructions.txt[step].image}
                        </div>
                        <div className={styles.articleImage}>
                            {textual_instructions.txt[step].txt}
                        </div>
                    </div>


                );
            case "visual":
                return (
                    <div>
                        <div className={styles.articleImage}>
                            {textual_instructions.txt[step].image}
                        </div>
                        <div className={styles.articleImage}>
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
        if(step === textual_instructions[`${props.treatment}`].length-1){
            handleButtonLabel();

        }
    },[step])
    function createMessage(){
        return(
            <div className={styles.paragraph}>
                In this study you will see a series of news articles related to the <span
                style={{fontWeight: "bold"}}> drug overdose epidemic. </span>
                Each article includes a data visualization and accompanying text. Please review the visualization and read the text carefully to ensure you understand the message of each article.
            </div>
        )
    }
    function handleButtonLabel(){
        console.log('I am checking');
            setButtonLabel('Complete');
    }
    const clickHandler = () => {
        if (step <(textual_instructions[`${props.treatment}`].length)-1) {
            setStep((prev) => prev + 1)
        } else {
            let nextPage = pageHandler(props.pages, location.pathname);
            history.push(nextPage);
        }
    }
    return (

            <Container className={styles.mainContainer}>
                {textCreator()}


            <div className={styles.articleStructure}>
                {step===textual_instructions[`${props.treatment}`].length-1?createMessage():""}
            </div>
            <div className={styles.navigationContainer}>
                <button
                    type={"button"}
                    onClick={clickHandler}
                    className={styles.actions}
                >
                    {buttonLabel}

                </button>
            </div>
            </Container>
    )
}
