import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  Edit,
  Delete,
  Visibility,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addProdFav, removeProdFav } from "../redux/slices/favourite.slice";
import { Link } from "react-router";
import {
  removeProductLocal,
  setSelectedProductLocal,
} from "../redux/slices/product.slice";

function ProductCard(props) {
  const product = props.data;
  const dispatch = useDispatch();

  const handleAddWishlist = (product) => {
    dispatch(addProdFav({ ...product, isFav: true }));
  };
  const handleRemoveWishlist = (product) => {
    dispatch(removeProdFav(product));
  };
  const handleEditProduct = (title, formName, product) => {
    dispatch(setSelectedProductLocal(product));
    const onOpenModal = props.onOpenModal;
    onOpenModal(title, formName);
  };
  const handleRemoveProduct = (product) => {
    dispatch(removeProductLocal(product));
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.image}
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title.showDots(20)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description.showDots(60)}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        {!props.fav && (
          <>
            <IconButton
              color="primary"
              onClick={() =>
                handleEditProduct("Edit product", "editForm", product)
              }
            >
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleRemoveProduct(product);
              }}
            >
              <Delete />
            </IconButton>
          </>
        )}

        <IconButton color="secondary">
          <Link to={`/product/${product.id}`}>
            <Visibility />
          </Link>
        </IconButton>
        {!product.isFav ? (
          <IconButton
            color="default"
            onClick={() => handleAddWishlist(product)}
          >
            <FavoriteBorder />
          </IconButton>
        ) : (
          <IconButton
            color="error"
            onClick={() => handleRemoveWishlist(product)}
          >
            <Favorite />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
