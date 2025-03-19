import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";

function Title(props) {
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: "25px" }}>
        <Grid size={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
          >
            {/* Left Side - Page Title */}
            <Typography variant="h5" fontWeight="bold">
              {`${props.entity}s`}
            </Typography>

            {/* Right Side - Add New Product Button */}
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              {`Add New ${props.entity}`}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Title;
