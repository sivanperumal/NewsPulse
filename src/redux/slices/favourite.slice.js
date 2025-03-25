import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const FavouriteSlice = createSlice({
  name: "Favourites",
  initialState: {
    blogs: [],
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    addBlogFav: (state, action) => {
      state.blogs.push(action.payload);
    },
    removeBlogFav: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.title !== action.payload.title
      );
    },
    addProdFav: (state, action) => {
      state.products.push(action.payload);
    },
    removeProdFav: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addBlogFav, addProdFav, removeProdFav, removeBlogFav } =
  FavouriteSlice.actions;

export default FavouriteSlice.reducer;

export const useFav = () => {
  const blogs = useSelector((state) => state.favourite);
  return blogs;
};
