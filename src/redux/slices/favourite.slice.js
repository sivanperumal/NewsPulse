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
  },
});

export const { addBlogFav } = FavouriteSlice.actions;

export default FavouriteSlice.reducer;

export const useFav = () => {
  const blogs = useSelector((state) => state.favourite);
  return blogs;
};
