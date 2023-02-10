import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { RecoilRoot } from "recoil";

import { BrowserRouter as Router } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[200],
    },
  },
});

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      {" "}
      <RecoilRoot>
        <Router>
          <App />
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
