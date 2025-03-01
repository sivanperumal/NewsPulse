import { combineReducers, configureStore } from "@reduxjs/toolkit"
import BlogsReducer from "./slices/blog.slice"

const rootReducer = combineReducers({
    blogs: BlogsReducer
})

export const store = configureStore({
    reducer: rootReducer,
})