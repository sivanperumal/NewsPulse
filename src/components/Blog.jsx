import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addBlogFav, removeBlogFav } from "../redux/slices/favourite.slice";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder, Visibility } from "@mui/icons-material";

export default function BlogCard(props) {
  const { urlToImage, title, description, publishedAt, url } = props.data;
  const dispatch = useDispatch();
  const handleAddWishlist = (data) => {
    dispatch(addBlogFav({ ...data, isFav: true }));
  };
  const handleRemoveWishlist = (data) => {
    dispatch(removeBlogFav(data));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt={title} height="300" image={urlToImage} />
      <CardContent>
        <Typography gutterBottom variant="body2" component="span">
          {moment(publishedAt).format("MMM Do YY")}
        </Typography>
        <Typography gutterBottom variant="h6" component="h6">
          {title.showDots(60)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", minHeight: 75 }}
          component="p"
        >
          {description?.showDots(110)}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="secondary">
          <Link target="_blank" to={url}>
            <Visibility />
          </Link>
        </IconButton>
        {!props.data.isFav ? (
          <IconButton
            color="default"
            onClick={() => handleAddWishlist(props.data)}
          >
            <FavoriteBorder />
          </IconButton>
        ) : (
          <IconButton
            color="error"
            onClick={() => handleRemoveWishlist(props.data)}
          >
            <Favorite />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
