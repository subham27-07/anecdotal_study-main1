import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material/";

const CustomSlider = ({ labels, domain, question, value }) => {
  // const [value, setValue] = useState(null);
  const range = domain[1] - domain[0];
  const marks = labels.map((l, i) => {
    return {
      label: l,
      value: domain[0] + (range / (labels.length - 1)) * i,
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "25px",
        marginTop: "10px",
        maxWidth: "500px",
        overflow: "visible",
      }}
      className="customSlider"
    >
      <Typography variant="body">{question}</Typography>
      <div
        style={{
          // display: "flex",
          // justifyContent: "flex-start",
          // flexDirection: "column",
          marginTop: "30px",
          width: "100%",
          gap: "20px",
          // padding: "0 10%",
        }}
      >
        <Slider
          value={value}
          step={0.01}
          marks={marks}
          min={domain[0]}
          max={domain[1]}
          disabled={true}
          valueLabelDisplay="off"
        />
      </div>
    </div>
  );
};

export default CustomSlider;
