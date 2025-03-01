import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useSelector } from 'react-redux';

export const getBlogs = createAsyncThunk('GetBlogs', async () =>  {
    try {
        const res = await axios.get('https://fakestoreapi.com/users')
        return res.data
    } catch (e) {
        console.log(e)
        throw e
    }
})

const BlogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getBlogs.pending, (state) => {
            state.loading = true;
            state.data = []; // optional
        })
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(getBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

// export const { } = BlogsSlice.actions;

export default BlogsSlice.reducer;

export const useBlogs = () =>  {
    const store = useSelector(state => state.blogs)
    return {...store};
}