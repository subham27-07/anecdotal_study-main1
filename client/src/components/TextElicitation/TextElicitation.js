import React from "react";
import styles from '../../pages/articles/articles.module.css'
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";


const TextElicitation = (props)=>{
    const completed = props.trend !== ''
    const handleChange = (event)=>{
        props.setTrend(event.target.value);
    //   
    }
    // const styles = props.styles
    // 
    // const [selectedOption, setSelectedOption] = useState("");

    // const handleExtraOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };
    // 

    const makeImportant = props.makeImportant

    return(
        <div className={styles.articleStructure}>
        
        <div className={styles.subtitle}>
            
            <div style={{lineHeight: '3rem'}}>{props.subTitle}
                <FormControl
                    variant="outlined"
                    sx={{
                        position: 'relative',
                        mx: 3,
                        my: 1,
                        minWidth: 300,
                        top: -15,
                        py: 2,
                        fontSize: 12
                    }}
                >
                    <InputLabel id="trend-selector">Select Your Guess Here</InputLabel>
                    <Select
                        labelId="trend-selector"
                        id="trend-selector-dropdown"
                        value={props.trend}
                        onChange={handleChange}
                        autoWidth
                        required={true}
                        disabled={completed}
                        // label="Select your guess here..."
                        style={{
                            display: 'inline-flex',
                            position: "relative",
                            border: '1px solid white',
                            height: '18pt',
                            fontSize: '12pt',
                            backgroundColor: 'lightgray'
                        }}
                    >
                        <MenuItem value={1}>Significantly Decreased</MenuItem>
                        <MenuItem value={2}>Slightly Decreased</MenuItem>
                        <MenuItem value={3}>Not Much Changed</MenuItem>
                        <MenuItem value={4}>Slightly Increased</MenuItem>
                        <MenuItem value={5}>Significantly Increased</MenuItem>


                    </Select>
                    <FormHelperText>Select your guess from the list</FormHelperText>
                </FormControl>
            </div>
            <p className={styles.txtUnique}>{`${props.subTitle2}`}</p>
        </div>
        {(() => {
            if (completed) {
                return (<div>
                    <div className={styles.articleImageContainer}>
                        <img src={`${props.images}`}
                             className={styles.articleImage}
                             alt='Since 2002 percentage of Americans population with drug use disorders'/>
                    </div>
                    <div className={styles.paragraph}>
                        {props.body}
                    </div>
                </div>)
            } else {
                return ("");
            }
        })()}
    </div>

    );
} 

export default TextElicitation