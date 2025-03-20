import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addUsersLocal } from "../redux/slices/user.slice";

const UserForm = ({ onCloseModal }) => {
  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });
  const [user, setUser] = useState({
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({
      name: name,
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUsersLocal({ id: Date.now(), ...user }));
    setName({
      firstname: "",
      lastname: "",
    });
    setUser({
      phone: "",
      email: "",
    });
    onCloseModal();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        User Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={name.firstname}
              onChange={(e) => setName({ ...name, firstname: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={user.lastname}
              onChange={(e) => setName({ ...name, lastname: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="button"
          sx={{ mr: 2, mt: 2 }}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
export default UserForm;
