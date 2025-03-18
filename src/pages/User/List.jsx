import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetUsers, useListUsers } from "../../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import Title from "../../components/Title";
import { Box, Grid2 as Grid } from "@mui/material";
import Input from "@mui/joy/Input";
import SearchFilterData from "../../components/SearchFilterData";

function List() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const handleOnTerm = (termVal) => {
    setSearchTerm(termVal);
  };
  const { data, loading } = useListUsers();
  const filteredUsers = data.filter((user) => {
    const name = user.name.firstname + " " + user.name.lastname;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <>
      <Title entity="User" />
      <Grid container sx={{ mb: 5 }}>
        <Grid size={4}>
          <Box sx={{ display: "flex" }}>
            <Input
              size="md"
              onChange={(e) => handleOnTerm(e.target.value)}
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
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
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
                  <TableCell align="right">{`${user.address.city} ${user.address.street}`}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default List;
