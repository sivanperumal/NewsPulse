import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addUsersLocal,
  updateUserLocal,
  useListUsers,
} from "../redux/slices/user.slice";

const UserForm = ({ onCloseModal, formAction }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useListUsers();
  const [user, setUser] = useState(
    formAction === "addForm"
      ? {
          name: { firstname: "", lastname: "" },
          phone: "",
          email: "",
        }
      : {
          ...selectedUser,
        }
  );

  const handleChange = (e) => {
    if (e.target.name === "firstname" || e.target.name === "lastname") {
      setUser({
        ...user,
        name: { ...user.name, [e.target.name]: e.target.value },
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formAction === "addForm") {
      dispatch(addUsersLocal({ id: Date.now(), ...user }));
    } else {
      dispatch(updateUserLocal(user));
    }

    setUser("");
    onCloseModal();
  };

  // useEffect(() => {
  //   return () => {
  //     setUser({
  //       name: { firstname: "", lastname: "" },
  //       phone: "",
  //       email: "",
  //     });
  //   };
  // }, []);
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="First Name"
              value={user.name.firstname}
              name="firstname"
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastname"
              value={user.name.lastname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={12}>
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
          <Grid size={12}>
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
        <Grid container sx={{ padding: "15px 0" }}>
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
        </Grid>
      </form>
    </Container>
  );
};
export default UserForm;
