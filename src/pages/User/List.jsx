import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  GetUsers,
  removeUserLocal,
  selectedUserLocal,
  useListUsers,
} from "../../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import Title from "../../components/Title";
import { Box, Grid2 as Grid } from "@mui/material";
import Input from "@mui/joy/Input";
import ModalDialog from "../../components/ModalDialog";
import UserForm from "../../components/UserForm";

function List() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({
    modalTitle: "",
    formName: "",
  });
  const { data, loading } = useListUsers();

  const filteredUsers = useMemo(() => {
    return data.filter((user) => {
      const name = user.name.firstname + " " + user.name.lastname;
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  useEffect(() => {
    dispatch(GetUsers());
  }, []);

  const handleOnTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickOpen = (title, formName, user) => {
    setOpen(true);
    setAction({ modalTitle: title, formName: formName });
    if (user) {
      dispatch(selectedUserLocal(user));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveUser = (user) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this ${user.email}?`
    );
    if (isConfirmed) {
      dispatch(removeUserLocal(user));
    }
  };
  return (
    <>
      <Title
        entity="Users"
        buttonLabel="Add New User"
        onOpenModal={() => handleClickOpen("Add User", "addForm")}
      />
      <Grid container sx={{ mb: 5 }}>
        <Grid size={4}>
          <Box sx={{ display: "flex" }}>
            <Input
              size="md"
              onChange={handleOnTerm}
              placeholder="Search..."
              fullWidth
              sx={{ mr: 2 }}
            />
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <p style={{ textAlign: "center" }}>Loading ...</p>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${user.name.firstname} ${user.name.lastname}`}
                  </TableCell>
                  {/* <TableCell align="right">{`${user.address.city} ${user.address.street}`}</TableCell> */}
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleClickOpen("Edit User", "editForm", user)
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        handleRemoveUser(user);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <ModalDialog
          open={open}
          onCloseModal={handleClose}
          title={action.modalTitle}
        >
          <UserForm onCloseModal={handleClose} formAction={action.formName} />
        </ModalDialog>
      )}
    </>
  );
}

export default List;
