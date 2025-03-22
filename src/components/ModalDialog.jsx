import React from "react";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function ModalDialog(props) {
  const { open, onCloseModal, title } = props;
  return (
    <Dialog open={open} onClose={onCloseModal}>
      <DialogTitle
        sx={{
          borderBottom: "2px solid #ccc",
          padding: "16px 0 16px 45px",
          marginBottom: "20px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      {/* <DialogActions>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default ModalDialog;
