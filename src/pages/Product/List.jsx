import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/ProductCard";
import { useDispatch } from "react-redux";
import { GetProducts, useProducts } from "../../redux/slices/product.slice";

function List() {
  const dispatch = useDispatch();
  const { data, loading } = useProducts();
  useEffect(() => {
    dispatch(GetProducts());
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          data.map((product) => {
            return (
              <Grid size={4} key={product.id}>
                <ProductCard data={product} />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
}

export default List;
