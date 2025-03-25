import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

export const GetProducts = createAsyncThunk(
  "Products/GetProducts",
  async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      return res.data;
    } catch (e) {
      console.error(e);
    }
  }
);
const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    data: [],
    selectedProduct: {},
    loading: false,
    error: "",
  },
  reducers: {
    addProductLocal: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    setSelectedProductLocal: (state, action) => {
      state.selectedProduct = action.payload;
    },
    updateProductLocal: (state, action) => {
      state.data = state.data.map((product) => {
        return product.id === action.payload.id ? action.payload : product;
      });
    },
    removeProductLocal: (state, action) => {
      state.data = state.data.filter((product) => {
        return product.id !== action.payload.id;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(GetProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const {
  addProductLocal,
  setSelectedProductLocal,
  updateProductLocal,
  removeProductLocal,
} = ProductSlice.actions;
export default ProductSlice.reducer;

export const useProducts = () => {
  const products = useSelector((state) => state.products);
  return products;
};
