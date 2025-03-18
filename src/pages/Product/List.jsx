import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/ProductCard";
import { useDispatch } from "react-redux";
import { GetProducts, useProducts } from "../../redux/slices/product.slice";
import Title from "../../components/Title";
import Input from "@mui/joy/Input";

function List() {
  const dispatch = useDispatch();
  const { data, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const handleOnTerm = (termVal) => {
    setSearchTerm(termVal);
  };
  useEffect(() => {
    dispatch(GetProducts());
  }, []);

  const FilteredProducts = data.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title entity="Product" />
      <Grid container sx={{ mb: 5 }}>
        <Grid size={4}>
          <Box sx={{ display: "flex" }}>
            <Input
              size="md"
              onChange={(e) => handleOnTerm(e.target.value)}
              placeholder="Search..."
              fullWidth
              sx={{ mr: 2 }}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          FilteredProducts.map((product) => {
            return (
              <Grid size={4} key={product.id}>
                <ProductCard data={product} fav={false} />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
}

export default List;
