import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
const userApiUrl = process.env.USER_API_URL;

export const GetUsers = createAsyncThunk("Users/GetUsers", async () => {
  try {
    const res = await axios.get(`${userApiUrl}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
});
const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    data: [],
    selectedUser: {},
    loading: false,
    error: "",
  },
  reducers: {
    addUsersLocal: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    selectedUserLocal: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUserLocal: (state, action) => {
      state.data = state.data.map((user) => {
        return user.id === action.payload.id ? action.payload : user;
      });
    },
    removeUserLocal: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload.id);
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
export const {
  addUsersLocal,
  selectedUserLocal,
  updateUserLocal,
  removeUserLocal,
} = UserSlice.actions;
export default UserSlice.reducer;

export const useListUsers = () => {
  const users = useSelector((state) => state.users);
  return users;
};
