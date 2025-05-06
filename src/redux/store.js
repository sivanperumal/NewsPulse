import { combineReducers, configureStore } from "@reduxjs/toolkit";
import BlogsReducer from "./slices/blog.slice.js";
import ProductReducer from "./slices/product.slice.js";
import UserReducer from "./slices/user.slice.js";
import FavouriteReducer from "./slices/favourite.slice.js";

const rootReducer = combineReducers({
  blogs: BlogsReducer,
  products: ProductReducer,
  users: UserReducer,
  favourite: FavouriteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
