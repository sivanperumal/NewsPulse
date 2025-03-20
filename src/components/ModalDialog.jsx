import React from "react";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductForm from "./ProductForm";
import UserForm from "./UserForm";

function ModalDialog({ open, onCloseModal, entity }) {
  return (
    <Dialog open={open} onClose={onCloseModal}>
      <DialogTitle>
        {entity === "Products" && "Add Product"}{" "}
        {entity === "Users" && "Add User"}
      </DialogTitle>
      <DialogContent>
        {entity === "Products" && <ProductForm onCloseModal={onCloseModal} />}
        {entity === "Users" && <UserForm onCloseModal={onCloseModal} />}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default ModalDialog;
