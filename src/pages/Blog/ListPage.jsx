import React, { useCallback, useEffect } from 'react'
import { Box } from '@mui/material'

import { getBlogs } from '../../redux/slices/blog.slice';
import { useDispatch } from 'react-redux';
import SearchBlog from './Search';
import ListBlog from './List';

function ListPage() {
  const dispatch = useDispatch();

  const search = useCallback((query) => {
    dispatch(getBlogs(query))
  }, [])

  useEffect(() => {
    search('today');
  }, [search])

  return (
    <Box>
      <SearchBlog search={search} />
      <ListBlog />
    </Box>
  )
}

export default ListPage