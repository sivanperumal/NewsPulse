import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { addBlogLocal } from "../redux/slices/blog.slice";
import { useDispatch } from "react-redux";

function BlogForm({ onCloseModal }) {
  const dispatch = useDispatch();
  const getCurrentISOTime = () => {
    return new Date().toISOString();
  };
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    url: "",
    publishedAt: getCurrentISOTime(),
    urlToImage: "https://gizmodo.com/app/uploads/2025/03/NASA-Crew-10.jpg",
  });
  useEffect(() => {
    return () => {
      setBlog({
        title: "",
        description: "",
        url: "",
      });
    };
  }, []);

  const handleOnChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlogLocal(blog));
    onCloseModal();
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              required
              onChange={handleOnChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              required
              onChange={handleOnChange}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Blog URL"
              name="blogUrl"
              required
              onChange={handleOnChange}
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
}

export default BlogForm;
