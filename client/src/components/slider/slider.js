import React, { useEffect, useState, useRef } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material/";
import { useRecoilValue } from "recoil";
import { sliderStepsState } from "../../atoms/sliderSteps";
// import * as d3 from "d3";
import $ from "jquery";

const StyledSlider = styled(Slider)(({ theme }) => ({
  height: 5,
  "& .MuiSlider-mark": {
    backgroundColor: "black",
    height: 5,
    width: 1,
    // '&[data-index="1"]': {
    //   width: 0,
    // },
    // '&[data-index="2"]': {
    //   width: 0,
    // },
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
    "&.MuiSlider-markLabelActive": {
      opacity: 1,
      color: "rgba(0, 0, 0, 0.6)",
      backgroundColor: "black",
    },
  },
}));

const CustomSlider = ({
  labels,
  domain,
  question,
  handleResponse,
  response,
  banded = false,
}) => {
  const [value, setValue] = useState(null);
  const stepsValue = useRecoilValue(sliderStepsState);
  const range = domain[1] - domain[0];
  const marks = labels.map((l, i) => {
    return {
      label: l,
      value: domain[0] + (range / (labels.length - 1)) * i,
    };
  });

  const sliderRef = useRef(null);

  useEffect(() => {
    if (!banded) return;
    if (sliderRef.current) {
      const node = sliderRef.current;
      for (let i = 0; i < marks.length; i++) {
        let color = i % 2 == 0 ? "darkgrey" : "lightgrey";
        let left = i * (1 / marks.length) * 100;
        // let right = left + (1 / marks.length) * 100;

        let span = $("<span>");
        span.css({
          position: "absolute",
          // "border-radius": "inherit",
          border: `1px solid ${color}`,
          backgroundColor: color,
          height: "inherit",
          top: "50%",
          left: `${left}%`,
          // right: `${right}%`,
          width: `${(1 / marks.length) * 100}%`,
          transform: "translateY(-50%)",
        });
        span.appendTo(node);
      }
    }
  }, [sliderRef]);

  useEffect(() => {
    setValue(response);
  }, [response]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "25px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: "10px",
        }}
        className="customSlider"
      >
        <Typography variant="h6">{question}</Typography>
        <StyledSlider
          ref={sliderRef}
          value={value == null ? 0.5 : value}
          step={stepsValue}
          marks={marks}
          min={domain[0]}
          max={domain[1]}
          onChangeCommitted={handleResponse}
          onChange={(e, r) => {
            setValue(r);
          }}
          style={{ marginTop: "10px" }}
          // valueLabelDisplay="on"
          track={false}
        />
      </div>
    </div>
  );
};

export default CustomSlider;
