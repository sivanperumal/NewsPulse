import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addProductLocal } from "../redux/slices/product.slice";

const ProductForm = ({ onCloseModal }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const productList = { id: Date.now(), ...product };
    dispatch(addProductLocal(productList));
    onCloseModal();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Product Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={product.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>
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
      </form>
    </Container>
  );
};
export default ProductForm;
