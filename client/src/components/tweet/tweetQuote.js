import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

var parser = new DOMParser();
function parseString(encodedString) {
  var dom = parser.parseFromString(
    "<!doctype html><body>" + encodedString,
    "text/html"
  );
  var decodedString = dom.body.textContent;
  return decodedString;
}
const useStyles = makeStyles({
  tweetCard: {
    width: "",
    padding: "10px",
    border: "0.5px",
    borderColor: "#AAB8C2",
    borderStyle: "solid",
    borderRadius: "8px",
    marginTop: "10px",
  },
});

const Tweet = (props) => {
  const classes = useStyles();
  const accName = props.accName || "";
  const screen_name = props.screen_name || "";
  const bg_image = props.accLogo == undefined ? "" : `url('${props.accLogo}')`;
  console.log(props.accLogo);
  return (
    <div
      className={classes.tweetCard + " quoteComponent"}
      style={{ width: "100%",height: "120%", display: "flex", flexDirection: "row" }}
    >
      <div
        style={{
          flexBasis: 0,
          flexGrow: 1,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <div
            style={{
              border: "0.1px",
              borderColor: "#AAB8C2",
              borderStyle: "solid",
              borderRadius: "50%",
              width: "0px",
              height: "0px",
              display: "flex",
              marginRight: "4px",
              marginBottom: "5px",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: bg_image,
              backgroundColor: props.accLogo == undefined ? "grey" : "white",
              backgroundSize: "100% auto",
            }}
          >
            {/* <PersonIcon></PersonIcon> */}
            {props.accLogo == undefined ? (
              <p style={{ fontSize: "0px" }}>
                {accName
                  .split(" ")
                  .map((l) => l[0])
                  .join("")}
              </p>
            ) : null}
          </div>

          <span style={{ fontWeight: "bold", marginRight: "2px" }}>
            {accName + " "}{" "}
          </span>
          <span style={{ color: "grey" }}></span>
        </div>
        <p
          style={{
            marginBottom: "5px",
            fontSize: "15px",
            margin: 0,
          }}
        >
          {parseString(props.text)}
        </p>
        {props.showImage ? (
          // <img
          //   src={props.src}
          //   style={{ borderRadius: 15, width: "100%", marginTop: "20px" }}
          //   alt="tweet image related to the headline"
          // />
          <div
            style={{
              marginTop: "10px",
              borderRadius: 8,
              width: "100%",
              height: "200px",
              backgroundImage: `url('${props.src}')`,
              backgroundPosition: "center",
              backgroundSize: "100% auto",
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
};

export default Tweet;
