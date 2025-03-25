import React from "react";
import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";
import { Grid } from "@mui/joy";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function Detail() {
  const params = useParams();
  const { data } = useFetch(`https://fakestoreapi.com/products/${params.id}`);

  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ maxWidth: 1200, margin: "auto", padding: 4 }}
      >
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={data.image}
              alt={data.title}
              sx={{ height: 400 }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold">
              {data.title}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              {data.price}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              {data.description}
            </Typography>
            {/* <Button variant="contained" color="primary" size="large">Add to Cart</Button> */}
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
}

export default Detail;
