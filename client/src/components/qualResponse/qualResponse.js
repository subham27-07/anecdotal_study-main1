import * as React from "react";

import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material/";

export default function FullWidthTextField(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "400px",
      }}
    >
      <Typography variant="h6">
        Please explain your reasons for the judgment below 👇
      </Typography>
      <TextField
        fullWidth
        multiline={true}
        value={props.qualResponse}
        minRows={3}
        label="your response"
        id="fullWidth"
        onChange={(event) => {
          props.setQualResponse(event.target.value);
        }}
        style={{ marginBottom: "20px" }}
      />
    </div>
  );
}
