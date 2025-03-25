import BlogCard from "../../components/Blog";
import { Box, Grid2 as Grid } from "@mui/material";
import { useBlogs } from "../../redux/slices/blog.slice";
import Loader from "../../components/Loader";
import { useFav } from "../../redux/slices/favourite.slice";

function List() {
  const { data, loading } = useBlogs();
  const { blogs: favBlogs } = useFav();
  const blogs = data.articles ?? [];

  const updateBlogs = blogs.map((blog) => ({
    ...blog,
    isFav: favBlogs.some((fav) => fav.title === blog.title),
  }));
  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={2}>
      {updateBlogs.map((blog, index) => (
        <Grid size={3} key={index}>
          <BlogCard data={blog} fav={false} />
        </Grid>
      ))}
    </Grid>
  );
}

export default List;
