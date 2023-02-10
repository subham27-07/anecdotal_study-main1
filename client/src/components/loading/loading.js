import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingCircle = (props) => {
  let opacity = props.opacity || 0;
  return (
    <CircularProgress
      size={300}
      thickness={5}
      style={{
        position: "absolute",
        top: "30%",
        left: "40%",
        color: "#111",
        display: props.show,
        opacity: opacity,
        pointerEvents: "none",
      }}
    ></CircularProgress>
  );
};

export default LoadingCircle;
