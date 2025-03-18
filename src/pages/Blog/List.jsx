import BlogCard from "../../components/Blog";
import { Box, Grid2 as Grid } from "@mui/material";
import { useBlogs } from "../../redux/slices/blog.slice";
import Loader from "../../components/Loader";

function List() {
  const { data, loading, error } = useBlogs();
  const blogs = data?.articles ?? [];

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={2}>
      {blogs.map((blog, index) => (
        <Grid size={3} key={index}>
          <BlogCard data={blog} />
        </Grid>
      ))}
    </Grid>
  );
}

export default List;
