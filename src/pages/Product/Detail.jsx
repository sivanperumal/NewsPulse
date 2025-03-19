import React from "react";
import { useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch";

function Detail() {
  const params = useParams();
  const { data } = useFetch(`https://fakestoreapi.com/products/${params.id}`);

  return (
    <>
      <h1>{data.title}</h1>
      <img src={data.image} alt={data.title} />
    </>
  );
}

export default Detail;
