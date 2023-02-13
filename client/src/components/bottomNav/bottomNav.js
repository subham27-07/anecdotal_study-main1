import React from "react";
import { useHistory, useLocation } from "react-router-dom";
// import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    "&$selected": {
      color: "grey",
    },
  },
  selected: {},
}));

// const useStyles = makeStyles({
//   bottomNav: {
//     width: "100%",
//     height: "7%",
//     backgroundColor: "orange",
//     // position: "fixed",
//     // bottom: 0,
//   },
// });

const BottomNav = (props) => {
  const classes = useStyles();
  let location = useLocation();
  const getValue = (location) => {
    if (
      ["/instructions1", "/instructions2", "/instructions3", "/quiz","/quiz1","/quiz2","/quiz3","/viz"].includes(
        location
      )
    ) {
      return "/instructions";
    }
    if (["/task1", "/task2"].includes(location)) {
      return "/task1_2";
    }
    if (["/instructions4", "/task3"].includes(location)) {
      return "/task3";
    }
    return location;
  };
  //   console.log(history);
  // const setHistory = (newValue) => {
  //   history.push(newValue);
  // };

  return (
    <BottomNavigation
      value={getValue(location.pathname)}
      // onChange={(event, newValue) => {
      //   console.log(newValue);
      //   setPageIndex(newValue);
      //   setHistory(newValue);
      // }}
      showLabels
      className={classes.root}
      style={{
        height: props.height,
        width: "100%",
        height: "7%",
        backgroundColor: "#eeeeee",
        pointerEvents: "None",
      }}
    >
      <BottomNavigationAction
        label="Consent"
        value="/consent"
        classes={classes}
      />
      <BottomNavigationAction
        label="Pre-questionnaire"
        value="/pre"
        classes={classes}
      />
      <BottomNavigationAction
        label="Instructions"
        value="/instructions"
        classes={classes}
      />
      <BottomNavigationAction
        label="Task 1 and 2"
        value="/task1_2"
        classes={classes}
      />
      <BottomNavigationAction label="Task 3" value="/task3" classes={classes} />
      {/* <BottomNavigationAction label="Task 2" value="/task2" classes={classes} /> */}
      <BottomNavigationAction
        label="Post-questionnaire"
        value="/post"
        classes={classes}
      />
      <BottomNavigationAction
        label="Debrief"
        value="/debrief"
        classes={classes}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
