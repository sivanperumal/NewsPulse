import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const GetUsers = createAsyncThunk("Users/GetUsers", async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/users");
    return res.data;
  } catch (e) {
    console.error(e);
  }
});
const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {
    addUsersLocal: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(GetUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { addUsersLocal } = UserSlice.actions;
export default UserSlice.reducer;

export const useListUsers = () => {
  const users = useSelector((state) => state.users);
  return users;
};
