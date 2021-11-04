import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  flow: 'list',
};

export const fetchCart = createAsyncThunk(
  '/api/items/category/find',
  async () => {
    const res = await axios.get('/api/items/category/find', {
      withCredentials: true,
    });
    return res.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setFlow: (state, action) => {
      state.flow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {});
    builder.addCase(fetchCart.rejected, (state, action) => {
      //   state.isAuthenticated = false;
    });
  },
});

export const { setFlow } = cartSlice.actions;

export default cartSlice.reducer;
