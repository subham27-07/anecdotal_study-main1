import React from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useRecoilState } from "recoil";
import { questionState } from "../../atoms/questionSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    height: "100%",
    // backgroundColor: "lightgrey",
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [questionCondition, setQuestionCondition] =
    useRecoilState(questionState);
  return (
    <div className={classes.root} style={{ height: props.height }}>
      <AppBar
        position="sticky"
        className={classes.navBar}
        color="secondary"
        elevation={0}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div
            style={{
              maxWidth: "30%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              paddingRight: "10px",
            }}
          >
            <Typography variant="h6" className={classes.title}>
              Social Media News Judgment Study
            </Typography>
          </div>
          {/* <Stack direction="row" spacing={1} alignItems="center" style={{}}>
            <Typography>
              FOR TESTING ONLY: Change Question Condition:{" "}
            </Typography>
            <Typography>Share</Typography>
            <Switch
              checked={questionCondition == "strength"}
              onChange={(event) => {
                if (event.target.checked) {
                  setQuestionCondition("strength");
                } else {
                  setQuestionCondition("share");
                }
              }}
            />
            <Typography>Strength</Typography>
          </Stack> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
