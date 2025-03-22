import React, { useState } from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

function SearchBlog(props) {
  const { search } = props;
  const [query, setQuery] = useState();

  const handleClick = () => {
    search(query);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Grid container sx={{ mb: 5 }}>
      <Grid size={12}>
        <Box sx={{ display: "flex" }}>
          <Input
            value={query}
            onChange={handleChange}
            size="md"
            placeholder="Search..."
            fullWidth
            sx={{ mr: 2 }}
          />
          <Button onClick={handleClick}>Search</Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default React.memo(SearchBlog);
