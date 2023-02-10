import React from "react";
import Button from "@mui/material//Button";
import Dialog from "@mui/material//Dialog";
import DialogActions from "@mui/material//DialogActions";
import DialogContent from "@mui/material//DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material/";
// import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  return (
    <Dialog
      fullWidth={true}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      height="600px"
    >
      <DialogTitle>Instructions</DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText> */}
        {props.message}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
