import React from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import Input from "@mui/joy/Input";

function SearchFilterData() {
  return (
    <Grid container sx={{ mb: 5 }}>
      <Grid size={4}>
        <Box sx={{ display: "flex" }}>
          <Input size="md" placeholder="Search..." fullWidth sx={{ mr: 2 }} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchFilterData;
