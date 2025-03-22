import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addProdFav } from "../redux/slices/favourite.slice";
import { Link } from "react-router";

function ProductCard(props) {
  const product = props.data;
  const dispatch = useDispatch();
  const handleAddWishlist = (product) => {
    dispatch(addProdFav(product));
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
      <CardActions>
        <Button size="small">
          <Link to={`/product/${product.id}`}>View</Link>
        </Button>
        {!props.fav && (
          <Button size="small" onClick={() => handleAddWishlist(product)}>
            Add Wishlist
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
