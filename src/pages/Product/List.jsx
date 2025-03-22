import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/ProductCard";
import { useDispatch } from "react-redux";
import { GetProducts, useProducts } from "../../redux/slices/product.slice";
import Title from "../../components/Title";
import Input from "@mui/joy/Input";
import ModalDialog from "../../components/ModalDialog";
import ProductForm from "../../components/ProductForm";

function List() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const { data, loading } = useProducts();

  const FilteredProducts = useMemo(() => {
    return data.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  useEffect(() => {
    dispatch(GetProducts());
  }, []);

  const handleOnTerm = (e) => {
    setSearchTerm(e.target.name);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title
        entity="Products"
        buttonLabel="Add New Product"
        onOpenModal={handleClickOpen}
      />
      <Grid container sx={{ mb: 5 }}>
        <Grid size={4}>
          <Box sx={{ display: "flex" }}>
            <Input
              size="md"
              onChange={handleOnTerm}
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
      {open && (
        <ModalDialog open={open} onCloseModal={handleClose} title="Add product">
          <ProductForm onCloseModal={handleClose} />
        </ModalDialog>
      )}
    </Box>
  );
}

export default List;
