import { combineReducers, configureStore } from "@reduxjs/toolkit";
import BlogsReducer from "./slices/blog.slice";
import ProductReducer from "./slices/product.slice";
import UserReducer from "./slices/user.slice";
import FavouriteReducer from "./slices/favourite.slice";

const rootReducer = combineReducers({
  blogs: BlogsReducer,
  products: ProductReducer,
  users: UserReducer,
  favourite: FavouriteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
