import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  items: false,
  search: '',
};

export const fetchItems = createAsyncThunk(
  '/api/items/category/find',
  async () => {
    const res = await axios.get('/api/items/category/find', {
      withCredentials: true,
    });
    return res.data;
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    searchItem: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      //   state.isAuthenticated = false;
    });
  },
});

export const { searchItem } = itemsSlice.actions;

export default itemsSlice.reducer;
