import React from "react";
import { makeStyles } from "@mui/styles";
import PersonIcon from "@mui/icons-material/Person";

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
  // tweetCard: {
  //   // width: "100%",

  //   padding: "10px",
  //   borderStyle: "solid",
  //   borderColor: "lightgrey",
  //   borderRadius: 8,
  //   border: "0.1px",
  // },
  card: {
    maxWidth: "500px",
    width: "max(100%,400px)",
    backgroundColor: "#white",
    color: "black",
    borderRadius: "10px",
    borderColor: "grey",
    border: "1px",
    borderColor: "lightgrey",
  },
});

const Tweet = (props) => {
  const classes = useStyles();
  const accName = props.accName || "";
  const screen_name = props.screen_name || "";

  const bg_image =
    props.person_image_path == undefined
      ? ""
      : `url('${props.person_image_path}')`;

  return (
    <div className={classes.card + " tweetComponent"}>
      <div
        className={classes.tweetCard}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          style={{
            flexBasis: "0px",
            justifyContent: "left",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              borderRadius: "0%",
              width: "0px",
              height: "0px",
              backgroundImage: bg_image,
              backgroundColor: "grey",
              backgroundSize: "100% auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {props.person_image_path == undefined ? (          // Person Icon
              <PersonIcon></PersonIcon>
            ) : null} */}
          </div>
        </div>
        <div
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginLeft: "20px",
            width: "100%",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold" }}>{accName + " "} </span>
            <span style={{ color: "grey" }}></span>
          </div>
          {/* <Typography variant="body1" style={{ marginBottom: "10px" }}>
          {parseString(props.text)}
        </Typography> */}
          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              margin: 0,
              marginBottom: "10px",
            }}
          >
            {parseString(props.text)}
          </div>
          {props.showImage ? (
            <img
              src={props.src}
              style={{ borderRadius: 15, width: "80%", marginTop: "20px" }}
              alt="tweet content"
            />
          ) : null}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
