import React from "react";

const Instructions = (props) => {
  return (
    <div
      style={{
        // textAlign: "center",
        width: "60%",
        margin: "0 auto",
      }}
    >
      <div>{props.children}</div>
    </div>
  );
};

export default Instructions;
