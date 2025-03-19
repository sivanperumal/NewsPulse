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
import { addBlogFav } from "../redux/slices/favourite.slice";

export default function BlogCard(props) {
  const { urlToImage, title, description, publishedAt, url } = props.data;
  const dispatch = useDispatch();
  const handleAddWishlist = (data) => {
    dispatch(addBlogFav(data));
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
        <Button size="small">
          <Link target="_blank" to={url}>
            View
          </Link>
        </Button>
        {!props.fav && (
          <Button size="small" onClick={() => handleAddWishlist(props.data)}>
            Add to Wishlist
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
