import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";

import { getBlogs } from "../../redux/slices/blog.slice";
import { useDispatch } from "react-redux";
import SearchBlog from "./Search";
import ListBlog from "./List";
import Title from "../../components/Title";
import ModalDialog from "../../components/ModalDialog";
import BlogForm from "../../components/BlogForm";

function ListPage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const search = useCallback((query) => {
    dispatch(getBlogs(query));
  }, []);

  useEffect(() => {
    search("today");
  }, [search]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Title entity="Blog" buttonLabel="Add Blog" onOpenModal={handleOpen} />
      <SearchBlog search={search} />
      <ListBlog />
      <ModalDialog open={open} onCloseModal={handleClose} title="Add Blog">
        <BlogForm onCloseModal={handleClose} />
      </ModalDialog>
    </Box>
  );
}

export default ListPage;
