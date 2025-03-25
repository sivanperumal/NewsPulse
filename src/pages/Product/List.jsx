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
import { useFav } from "../../redux/slices/favourite.slice";

function List() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState({
    modalTitle: "",
    formName: "",
  });
  const { data, loading } = useProducts();
  const { products: favProducts } = useFav();
  const FilteredProducts = useMemo(() => {
    return data.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  const updateProducts = FilteredProducts.map((product) => ({
    ...product,
    isFav: favProducts.some((fav) => fav.id === product.id),
  }));
  console.log(updateProducts);
  useEffect(() => {
    dispatch(GetProducts());
  }, []);

  const handleOnTerm = (e) => {
    setSearchTerm(e.target.name);
  };

  const handleClickOpen = (title, formName) => {
    setOpen(true);
    setAction({ modalTitle: title, formName: formName });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Title
        entity="Products"
        buttonLabel="Add New Product"
        onOpenModal={() => handleClickOpen("Add User", "addForm")}
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
          updateProducts.map((product) => {
            return (
              <Grid size={4} key={product.id}>
                <ProductCard
                  data={product}
                  fav={false}
                  onOpenModal={handleClickOpen}
                />
              </Grid>
            );
          })
        )}
      </Grid>
      {open && (
        <ModalDialog
          open={open}
          onCloseModal={handleClose}
          title={action.modalTitle}
        >
          <ProductForm
            onCloseModal={handleClose}
            formAction={action.formName}
          />
        </ModalDialog>
      )}
    </Box>
  );
}

export default List;
