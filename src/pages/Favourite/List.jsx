import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useFav } from "../../redux/slices/favourite.slice";
import BlogCard from "../../components/Blog";
import ProductCard from "../../components/ProductCard";

function List() {
  const { blogs: FavBlogs, products: FavProducts, loading } = useFav();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={1.5}>
        <Typography level="h2" sx={{ marginBottom: "20px!important" }}>
          Blog Favourite List
        </Typography>
      </Stack>
      <Grid container spacing={2} sx={{ marginBottom: "90px" }}>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          FavBlogs.map((blog, index) => {
            return (
              <Grid size={3} key={index + 1}>
                <BlogCard data={blog} fav={true} />
              </Grid>
            );
          })
        )}
      </Grid>
      <Stack spacing={1.5}>
        <Typography level="h2" sx={{ marginBottom: "20px!important" }}>
          Product Favourite List
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          FavProducts.map((product, index) => {
            return (
              <Grid size={3} key={index + 1}>
                <ProductCard data={product} fav={true} />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
}

export default List;
