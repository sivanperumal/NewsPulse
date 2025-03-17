import React from 'react'
import BlogCard from '../../components/Blog'
import { Grid2 as Grid } from '@mui/material'
import { useFetch } from '../../hooks/useFetch'
import Loader from '../../components/Loader'

function List() {
  const { data, loading, error } = useFetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=de655ada20fc41e0928eae9223445c99')
  const blogs = data.articles ?? [];

  if(loading) {
    return <Loader />
  }

  return (
    <Grid container spacing={2}>
      {
        blogs.map((blog, index) => (
          <Grid size={3} key={index}>
              <BlogCard data={blog} />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default List